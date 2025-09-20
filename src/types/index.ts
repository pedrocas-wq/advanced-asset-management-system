// Global Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  client_id?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'supervisor' | 'technician' | 'viewer';

export interface Client {
  id: string;
  name: string;
  code: string;
  logo_url?: string;
  contact_email: string;
  contact_phone?: string;
  address?: string;
  timezone: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface OfflineQueueItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
  retries: number;
  priority: 'high' | 'medium' | 'low';
}