import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'aams-v1',
    },
  },
});

// Helper function to log user actions
export const logUserAction = async (
  action: string,
  resourceType: string,
  resourceId?: string,
  metadata?: Record<string, any>
) => {
  try {
    const { data, error } = await supabase.rpc('log_user_action', {
      p_action: action,
      p_resource_type: resourceType,
      p_resource_id: resourceId || null,
      p_metadata: metadata || null,
    });

    if (error) {
      console.error('Failed to log user action:', error);
    }

    return data;
  } catch (error) {
    console.error('Error logging user action:', error);
  }
};

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('users')
    .select(`
      *,
      client:clients(*)
    `)
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return profile;
};