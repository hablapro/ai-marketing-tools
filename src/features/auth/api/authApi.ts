import { supabase } from '@/lib/supabase';
import { AuthResponse } from '../types/auth.types';

/**
 * Authentication API layer
 * Abstracts all Supabase auth calls for easier testing and refactoring
 */
export const authApi = {
  /**
   * Get current user session
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error getting session:', error);
      throw error;
    }
  },

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      return {
        success: false,
        error: message,
      };
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign out failed';
      return {
        success: false,
        error: message,
      };
    }
  },

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      return {
        success: false,
        error: message,
      };
    }
  },

  /**
   * Refresh the user session
   */
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      throw error;
    }
  },

  /**
   * Listen to auth state changes
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null);
    });
  },
};
