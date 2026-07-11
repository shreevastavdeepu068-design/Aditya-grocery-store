/**
 * Authentication Types
 *
 * Centralized type definitions for authentication throughout the application.
 */

import type { User } from '@supabase/supabase-js';

/**
 * Supported authentication roles
 */
export type AuthRole = 'admin' | 'customer';

/**
 * Login method types
 */
export type LoginMethod = 'email-otp' | 'phone-otp' | 'email-password';

/**
 * Authenticated user object
 */
export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  role: AuthRole;
}

/**
 * Auth error object with standardized format
 */
export interface AuthError {
  code: string;
  message: string;
  details?: string;
}

/**
 * Success response for auth operations
 */
export interface AuthSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Error response for auth operations
 */
export interface AuthErrorResponse {
  success: false;
  error: AuthError;
}

/**
 * Generic auth response type
 */
export type AuthResponse<T> = AuthSuccessResponse<T> | AuthErrorResponse;

/**
 * Supabase session type
 */
export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token?: string;
}

/**
 * User profile from profiles table
 */
export interface UserProfile {
  id: string;
  role: AuthRole;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

/**
 * OTP verification options
 */
export interface OTPVerifyOptions {
  phone?: string;
  email?: string;
  token: string;
  type: 'sms' | 'email';
}

/**
 * Auth context value
 */
export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithEmailOTP: (email: string) => Promise<AuthResponse<unknown>>;
  signInWithPhoneOTP: (phone: string) => Promise<AuthResponse<unknown>>;
  verifyOTP: (contact: string, token: string, type: 'sms' | 'email') => Promise<AuthResponse<unknown>>;
  signInWithEmailPassword: (email: string, password: string) => Promise<AuthResponse<unknown>>;
  signOut: () => Promise<AuthResponse<void>>;
  refreshSession: () => Promise<AuthResponse<AuthSession>>;
}

/**
 * OTP request state for rate limiting
 */
export interface OTPRequestState {
  lastRequestTime: number;
  retryCount: number;
  blockedUntil?: number;
}
