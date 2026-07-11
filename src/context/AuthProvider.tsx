'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import type { AuthUser, AuthContextValue, AuthRole, AuthResponse, AuthSession, AuthError } from '@/types/auth';
import {
  signInWithEmailOTP,
  signInWithPhoneOTP,
  verifyOTP,
  signInWithEmailPassword,
  signOut,
  getCurrentUser,
  refreshSession,
  onAuthStateChange,
  getUserProfile,
} from '@/lib/auth';

/**
 * Auth Context
 *
 * Provides authentication state and methods to all child components.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider Component
 *
 * Wraps the application to provide authentication state and methods.
 * Handles:
 * - User session persistence on app load and page refresh
 * - Real-time auth state changes
 * - Auto-refresh of expired sessions
 * - Loading states during auth operations
 * - Global auth error state
 * - Offline/network error handling
 * - Proper cleanup on unmount (React Strict Mode compatible)
 *
 * @example
 * ```tsx
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <AuthProvider>
 *       {children}
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export function AuthProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setAuthError] = useState<AuthError | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  // Use refs to track cleanup and avoid memory leaks
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const initializationStartedRef = useRef(false);

  /**
   * Clear auth error
   */
  const clearAuthError = useCallback((): void => {
    setAuthError(null);
  }, []);

  /**
   * Set auth error
   */
  const setCurrentAuthError = useCallback((error: AuthError | null): void => {
    if (isMountedRef.current) {
      setAuthError(error);
    }
  }, []);

  /**
   * Fetch user role from profiles table
   */
  const fetchUserRole = useCallback(async (userId: string): Promise<AuthRole> => {
    try {
      const response = await getUserProfile(userId);
      if (response.success) {
        return response.data.role;
      }
      // Fall back to 'customer' if profile not found
      return 'customer';
    } catch (error) {
      console.warn('Failed to fetch user role:', error);
      return 'customer';
    }
  }, []);

  /**
   * Update user state with fetched role
   */
  const updateUserState = useCallback(
    async (currentUser: User): Promise<void> => {
      if (!isMountedRef.current) return;

      try {
        const role = await fetchUserRole(currentUser.id);

        if (isMountedRef.current) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            phone: currentUser.phone,
            role,
          });
          setIsAuthenticated(true);
          setCurrentAuthError(null);
        }
      } catch (error) {
        console.error('Failed to update user state:', error);
        if (isMountedRef.current) {
          setCurrentAuthError({
            code: 'AUTH_ERROR',
            message: 'Failed to load user profile',
          });
        }
      }
    },
    [fetchUserRole, setCurrentAuthError]
  );

  /**
   * Initialize auth state on mount and handle page refresh
   */
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      // Prevent multiple initializations in Strict Mode
      if (initializationStartedRef.current) return;
      initializationStartedRef.current = true;

      try {
        const currentUser = await getCurrentUser();

        if (isMountedRef.current) {
          if (currentUser) {
            await updateUserState(currentUser);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        if (isMountedRef.current) {
          const errorMsg =
            error instanceof Error ? error.message : 'Failed to initialize authentication';
          setCurrentAuthError({
            code: 'INIT_ERROR',
            message: errorMsg,
          });
          setIsAuthenticated(false);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, [updateUserState, setCurrentAuthError]);

  /**
   * Subscribe to auth state changes
   */
  useEffect(() => {
    if (!isMountedRef.current) return;

    unsubscribeRef.current = onAuthStateChange(
      async (currentUser: User | null, role: AuthRole | null) => {
        if (!isMountedRef.current) return;

        try {
          if (currentUser) {
            // Always fetch fresh role from database
            const fetchedRole = await fetchUserRole(currentUser.id);
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              phone: currentUser.phone,
              role: fetchedRole || role || 'customer',
            });
            setIsAuthenticated(true);
            setCurrentAuthError(null);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Failed to handle auth state change:', error);
          if (isMountedRef.current) {
            setCurrentAuthError({
              code: 'AUTH_STATE_ERROR',
              message: 'Failed to sync authentication state',
            });
          }
        }
      }
    );

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [fetchUserRole, setCurrentAuthError]);

  /**
   * Auto-refresh session every 10 minutes
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    const performRefresh = async (): Promise<void> => {
      try {
        if (!isOnline) return;

        const response = await refreshSession();
        if (!response.success && isMountedRef.current) {
          console.warn('Session refresh failed:', response.error);
          setUser(null);
          setIsAuthenticated(false);
          setCurrentAuthError(response.error);
        }
      } catch (error) {
        console.error('Session refresh error:', error);
      }
    };

    refreshIntervalRef.current = setInterval(performRefresh, 10 * 60 * 1000); // 10 minutes

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isAuthenticated, isOnline, setCurrentAuthError]);

  /**
   * Handle online/offline status
   */
  useEffect(() => {
    const handleOnline = (): void => {
      if (isMountedRef.current) {
        setIsOnline(true);
        setCurrentAuthError(null);
      }
    };

    const handleOffline = (): void => {
      if (isMountedRef.current) {
        setIsOnline(false);
        setCurrentAuthError({
          code: 'OFFLINE',
          message: 'No internet connection',
          details: 'Some features may not work while offline',
        });
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setCurrentAuthError]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  /**
   * Sign in with email OTP
   */
  const handleSignInWithEmailOTP = useCallback(
    async (email: string): Promise<AuthResponse<unknown>> => {
      if (!isMountedRef.current) return { success: false, error: { code: 'UNMOUNTED', message: 'Component unmounted' } };

      setIsLoading(true);
      clearAuthError();
      try {
        const response = await signInWithEmailOTP(email);
        if (!response.success && isMountedRef.current) {
          setCurrentAuthError(response.error);
        }
        return response;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [clearAuthError, setCurrentAuthError]
  );

  /**
   * Sign in with phone OTP
   */
  const handleSignInWithPhoneOTP = useCallback(
    async (phone: string): Promise<AuthResponse<unknown>> => {
      if (!isMountedRef.current) return { success: false, error: { code: 'UNMOUNTED', message: 'Component unmounted' } };

      setIsLoading(true);
      clearAuthError();
      try {
        const response = await signInWithPhoneOTP(phone);
        if (!response.success && isMountedRef.current) {
          setCurrentAuthError(response.error);
        }
        return response;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [clearAuthError, setCurrentAuthError]
  );

  /**
   * Verify OTP
   */
  const handleVerifyOTP = useCallback(
    async (contact: string, token: string, type: 'sms' | 'email'): Promise<AuthResponse<unknown>> => {
      if (!isMountedRef.current) return { success: false, error: { code: 'UNMOUNTED', message: 'Component unmounted' } };

      setIsLoading(true);
      clearAuthError();
      try {
        const response = await verifyOTP(contact, token, type);
        if (!response.success && isMountedRef.current) {
          setCurrentAuthError(response.error);
        }
        return response;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [clearAuthError, setCurrentAuthError]
  );

  /**
   * Sign in with email and password (admin)
   */
  const handleSignInWithEmailPassword = useCallback(
    async (email: string, password: string): Promise<AuthResponse<unknown>> => {
      if (!isMountedRef.current) return { success: false, error: { code: 'UNMOUNTED', message: 'Component unmounted' } };

      setIsLoading(true);
      clearAuthError();
      try {
        const response = await signInWithEmailPassword(email, password);
        if (!response.success && isMountedRef.current) {
          setCurrentAuthError(response.error);
        }
        return response;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [clearAuthError, setCurrentAuthError]
  );

  /**
   * Sign out
   */
  const handleSignOut = useCallback(async (): Promise<AuthResponse<void>> => {
    if (!isMountedRef.current) return { success: false, error: { code: 'UNMOUNTED', message: 'Component unmounted' } };

    setIsLoading(true);
    clearAuthError();
    try {
      const response = await signOut();
      if (response.success) {
        if (isMountedRef.current) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (isMountedRef.current) {
        setCurrentAuthError(response.error);
      }
      return response;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [clearAuthError, setCurrentAuthError]);

  /**
   * Refresh session
   */
  const handleRefreshSession = useCallback(async (): Promise<AuthResponse<AuthSession>> => {
    return await refreshSession();
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated,
    signInWithEmailOTP: handleSignInWithEmailOTP,
    signInWithPhoneOTP: handleSignInWithPhoneOTP,
    verifyOTP: handleVerifyOTP,
    signInWithEmailPassword: handleSignInWithEmailPassword,
    signOut: handleSignOut,
    refreshSession: handleRefreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
