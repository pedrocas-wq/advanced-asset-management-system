import { supabase } from './client';
import { User } from '../../types';

export class AuthService {
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Log audit
      await this.logAuditEvent('login', 'auth', data.user?.id);

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async signUp(email: string, password: string, metadata?: any) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async signOut() {
    try {
      // Log audit before signing out
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await this.logAuditEvent('logout', 'auth', user.id);
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return null;

      // Get user profile from custom users table
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) return null;

      return {
        id: user.id,
        email: user.email!,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        role: profile.role,
        client_id: profile.client_id,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private async logAuditEvent(action: string, resourceType: string, userId?: string) {
    try {
      const userAgent = navigator.userAgent;
      const ipAddress = await this.getUserIP();

      await supabase.from('audit_log').insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      console.error('Error logging audit event:', error);
    }
  }

  private async getUserIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();