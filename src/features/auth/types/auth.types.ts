import { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser | null;

export interface AuthContextType {
  user: User;
  userRole: string | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}
