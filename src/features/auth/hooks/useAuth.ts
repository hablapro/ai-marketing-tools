import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { AuthContextType } from '../types/auth.types';

/**
 * Hook to access authentication state and methods
 *
 * Must be used within AuthProvider
 *
 * @example
 * function MyComponent() {
 *   const { user, loading, signIn, signOut } = useAuth();
 *
 *   if (loading) return <Spinner />;
 *
 *   if (!user) {
 *     return <LoginForm onSubmit={signIn} />;
 *   }
 *
 *   return <div>Welcome, {user.email}!</div>;
 * }
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
