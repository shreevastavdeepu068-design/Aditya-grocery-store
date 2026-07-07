'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import type { AuthContextValue } from '@/types/auth';

/**
 * useAuth Hook
 *
 * Provides access to authentication state and methods throughout the application.
 * Must be used inside AuthProvider.
 *
 * @throws Error if used outside of AuthProvider
 * @returns Auth context value with user state and methods
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, signInWithEmailOTP } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <div>Please log in</div>;
 *   }
 *
 *   return <div>Welcome, {user?.email}</div>;
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
