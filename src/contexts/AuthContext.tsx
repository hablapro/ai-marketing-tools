import React, { createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi } from '@/features/auth/api/authApi';
import { getUserRole } from '@/shared/utils/userRole';
import type { AuthContextType } from '@/features/auth/types/auth.types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state and set up listener
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Get initial session
        const session = await authApi.getSession();

        if (isMounted) {
          setUser(session?.user ?? null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load session';
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

  // Fetch user role whenever user changes
  useEffect(() => {
    if (!user) {
      setUserRole(null);
      return;
    }

    const fetchRole = async () => {
      const role = await getUserRole(user.id);
      if (isMounted) {
        setUserRole(role);
      }
    };

    let isMounted = true;
    fetchRole();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Auth methods
  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.signIn(email, password);

      if (!result.success) {
        setError(result.error || 'Sign in failed');
        throw new Error(result.error || 'Sign in failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.signOut();

      if (!result.success) {
        throw new Error(result.error || 'Sign out failed');
      }

      setUser(null);
      setUserRole(null);
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
    userRole,
    loading,
    error,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}