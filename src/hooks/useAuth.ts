import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/supabase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial user
    authService.getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const { data, error } = await authService.signIn(email, password);
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
    return { error };
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    const { data, error } = await authService.signInWithGoogle();
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
    return { data, error };
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    signInWithGoogle,
    isAuthenticated: !!user,
  };
}