import Dexie, { Table } from 'dexie';
import { User, Client, AuditLog, OfflineQueueItem } from '../../types';

export class OfflineDatabase extends Dexie {
  users!: Table<User>;
  clients!: Table<Client>;
  auditLog!: Table<AuditLog>;
  syncQueue!: Table<OfflineQueueItem>;
  settings!: Table<{ key: string; value: any }>;

  constructor() {
    super('AAMSOfflineDB');
    
    this.version(1).stores({
      users: 'id, email, role, client_id, created_at, updated_at',
      clients: 'id, name, code, active, created_at, updated_at',
      auditLog: 'id, user_id, action, resource_type, resource_id, ip_address, user_agent, created_at',
      syncQueue: 'id, table, action, timestamp, retries, priority',
      settings: 'key',
    });

    // Add hooks for automatic sync queue management
    this.users.hook('creating', (primKey, obj, trans) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    this.users.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updated_at = new Date();
    });

    this.clients.hook('creating', (primKey, obj, trans) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    this.clients.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updated_at = new Date();
    });
  }

  async addToSyncQueue(
    action: 'create' | 'update' | 'delete', 
    table: string, 
    data: any, 
    priority: 'high' | 'medium' | 'low' = 'medium'
  ) {
    const item: OfflineQueueItem = {
      id: crypto.randomUUID(),
      action,
      table,
      data,
      timestamp: Date.now(),
      retries: 0,
      priority,
    };

    await this.syncQueue.add(item);
    return item;
  }

  async getSyncQueue(): Promise<OfflineQueueItem[]> {
    return await this.syncQueue
      .orderBy('priority')
      .reverse()
      .secondaryKey('timestamp')
      .toArray();
  }

  async removeSyncItem(id: string) {
    await this.syncQueue.delete(id);
  }

  async clearSyncQueue() {
    await this.syncQueue.clear();
  }

  async getSetting(key: string): Promise<any> {
    const setting = await this.settings.get(key);
    return setting?.value;
  }

  async setSetting(key: string, value: any) {
    await this.settings.put({ key, value });
  }

  async getLastSyncTime(): Promise<Date | null> {
    const timestamp = await this.getSetting('lastSyncTime');
    return timestamp ? new Date(timestamp) : null;
  }

  async setLastSyncTime(date: Date = new Date()) {
    await this.setSetting('lastSyncTime', date.getTime());
  }
}

export const offlineDb = new OfflineDatabase();