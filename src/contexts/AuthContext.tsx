import React, { createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi } from '@/features/auth/api/authApi';
import type { AuthContextType } from '@/features/auth/types/auth.types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state and set up listener
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Get initial session
        const session = await authApi.getSession();
        console.log('Auth initialized. Session user:', session?.user?.email || 'No user');

        if (isMounted) {
          setUser(session?.user ?? null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load session';
          console.error('Auth initialization error:', message);
          setError(message);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initialize session
    initAuth();

    // Listen for auth state changes
    const { data } = authApi.onAuthStateChange((user) => {
      console.log('Auth state changed. User:', user?.email || 'No user');
      if (isMounted) {
        setUser(user);
        setError(null);
      }
    });

    return () => {
      isMounted = false;
      // Unsubscribe from listener
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  // Auth methods
  const signIn = async (email: string, password: string) => {
    console.log('SignIn attempt for:', email);
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.signIn(email, password);

      if (!result.success) {
        console.error('SignIn failed:', result.error);
        setError(result.error || 'Sign in failed');
        throw new Error(result.error || 'Sign in failed');
      }

      console.log('SignIn successful for:', email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('SignOut attempt');
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.signOut();

      if (!result.success) {
        console.error('SignOut failed:', result.error);
        throw new Error(result.error || 'Sign out failed');
      }

      console.log('SignOut successful');
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.signUp(email, password);

      if (!result.success) {
        throw new Error(result.error || 'Sign up failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}