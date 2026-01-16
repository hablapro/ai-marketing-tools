import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

// Mock authApi to avoid loading supabase modules
vi.mock('../api/authApi', () => ({
  authApi: {
    getSession: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    signUp: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
}));

import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import type { AuthContextType } from '../types/auth.types';

/**
 * Tests for useAuth hook
 *
 * Key behaviors:
 * - Must be used within AuthProvider
 * - Returns AuthContextType with user, loading, error, signIn, signOut, signUp
 * - Throws error when used outside provider
 */

describe('useAuth Hook', () => {
  it('should throw error when used outside AuthProvider', () => {
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });

  it('should return auth context when used inside provider', () => {
    // Mock AuthContextType
    const mockAuthContext: AuthContextType = {
      user: null,
      loading: false,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current).toEqual(mockAuthContext);
  });

  it('should expose auth context properties', () => {
    const mockAuthContext: AuthContextType = {
      user: null,
      loading: false,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeDefined();
    expect(result.current.loading).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.signIn).toBeDefined();
    expect(result.current.signOut).toBeDefined();
    expect(result.current.signUp).toBeDefined();
  });

  it('should expose signIn, signOut, and signUp methods', () => {
    const mockSignIn = vi.fn();
    const mockSignOut = vi.fn();
    const mockSignUp = vi.fn();

    const mockAuthContext: AuthContextType = {
      user: null,
      loading: false,
      error: null,
      signIn: mockSignIn,
      signOut: mockSignOut,
      signUp: mockSignUp,
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
    expect(typeof result.current.signUp).toBe('function');
  });

  it('should return correct types for auth context', () => {
     
    const mockAuthContext: AuthContextType = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: { id: '123', email: 'test@example.com' } as any,
      loading: true,
      error: 'Test error',
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeDefined();
    expect(typeof result.current.loading).toBe('boolean');
    expect(typeof result.current.error).toBe('string');
    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
    expect(typeof result.current.signUp).toBe('function');
  });

  it('should handle loading state', () => {
    const mockAuthContext: AuthContextType = {
      user: null,
      loading: true,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(true);
  });

  it('should handle error state', () => {
    const errorMessage = 'Authentication failed';
    const mockAuthContext: AuthContextType = {
      user: null,
      loading: false,
      error: errorMessage,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.error).toBe(errorMessage);
  });
});
