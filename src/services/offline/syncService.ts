import { supabase } from '../supabase/client';
import { offlineDb } from './database';

export class SyncService {
  private isOnline = navigator.onLine;
  private syncInProgress = false;

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncWithServer();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Periodic sync when online
    setInterval(() => {
      if (this.isOnline && !this.syncInProgress) {
        this.syncWithServer();
      }
    }, 30000); // Every 30 seconds
  }

  async syncWithServer() {
    if (!this.isOnline || this.syncInProgress) return;

    this.syncInProgress = true;

    try {
      const queueItems = await offlineDb.getSyncQueue();
      
      for (const item of queueItems) {
        try {
          await this.processSyncItem(item);
          await offlineDb.removeSyncItem(item.id);
        } catch (error) {
          console.error('Error syncing item:', error);
          
          // Increment retry count
          item.retries += 1;
          
          // Remove after max retries
          if (item.retries >= 3) {
            await offlineDb.removeSyncItem(item.id);
          } else {
            await offlineDb.syncQueue.put(item);
          }
        }
      }

      // Download latest data
      await this.downloadLatestData();
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async processSyncItem(item: any) {
    const { action, table, data } = item;

    switch (action) {
      case 'create':
        await supabase.from(table).insert(data);
        break;
      case 'update':
        await supabase.from(table).update(data).eq('id', data.id);
        break;
      case 'delete':
        await supabase.from(table).delete().eq('id', data.id);
        break;
    }
  }

  private async downloadLatestData() {
    try {
      // Download users
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(100);

      if (users) {
        await offlineDb.users.clear();
        await offlineDb.users.bulkAdd(users);
      }

      // Download clients
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .eq('active', true)
        .order('updated_at', { ascending: false });

      if (clients) {
        await offlineDb.clients.clear();
        await offlineDb.clients.bulkAdd(clients);
      }
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  }

  isConnected() {
    return this.isOnline;
  }
}

export const syncService = new SyncService();