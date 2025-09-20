import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, logUserAction, getCurrentUserProfile } from '../services/supabase/client';
import type { UserProfile } from '../services/supabase/types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    error: null,
  });

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const refreshProfile = async () => {
    if (!state.user) return;
    
    try {
      const profile = await getCurrentUserProfile();
      setState(prev => ({ ...prev, profile }));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      // Log successful sign in
      await logUserAction('sign_in', 'auth', data.user?.id, {
        email,
        timestamp: new Date().toISOString(),
      });

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during sign in';
      setError(message);
      return { error: { message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      // Log successful sign up
      if (data.user) {
        await logUserAction('sign_up', 'auth', data.user.id, {
          email,
          full_name: fullName,
          timestamp: new Date().toISOString(),
        });
      }

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during sign up';
      setError(message);
      return { error: { message } as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      // Log sign out before actually signing out
      if (state.user) {
        await logUserAction('sign_out', 'auth', state.user.id, {
          timestamp: new Date().toISOString(),
        });
      }

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
      } else {
        setState({
          user: null,
          profile: null,
          session: null,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during sign out';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      // Log password reset request
      await logUserAction('password_reset_request', 'auth', undefined, {
        email,
        timestamp: new Date().toISOString(),
      });

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during password reset';
      setError(message);
      return { error: { message } as AuthError };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!state.user) {
      return { error: { message: 'No user logged in' } };
    }

    setError(null);

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', state.user.id);

      if (error) {
        setError(error.message);
        return { error };
      }

      // Refresh profile after update
      await refreshProfile();

      // Log profile update
      await logUserAction('profile_update', 'user', state.user.id, {
        updates,
        timestamp: new Date().toISOString(),
      });

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during profile update';
      setError(message);
      return { error: { message } };
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setError(error.message);
      } else if (session) {
        setState(prev => ({
          ...prev,
          user: session.user,
          session,
        }));

        // Get user profile
        const profile = await getCurrentUserProfile();
        setState(prev => ({ ...prev, profile }));
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          session,
          loading: false,
        }));

        if (session?.user) {
          // Get user profile when user signs in
          const profile = await getCurrentUserProfile();
          setState(prev => ({ ...prev, profile }));
        } else {
          // Clear profile when user signs out
          setState(prev => ({ ...prev, profile: null }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};