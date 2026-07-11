import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import type {
  AuthError,
  AuthResponse,
  AuthRole,
  AuthSession,
  UserProfile,
} from '@/types/auth';

/**
 * Authentication Service
 *
 * Handles all authentication operations including:
 * - Customer login via phone OTP and email OTP
 * - Admin login via email and password
 * - Session management and persistence
 * - User role detection from profiles table
 * - Logout functionality
 *
 * Production-ready with:
 * - Input validation
 * - Centralized error handling
 * - Rate limiting support for OTP
 * - Proper TypeScript typing
 */

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number format (+91XXXXXXXXXX)
 */
function isValidIndianPhone(phone: string): boolean {
  const phoneRegex = /^\+91\d{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate OTP format (exactly 6 digits)
 */
function isValidOTP(token: string): boolean {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(token);
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Create standardized auth error object
 */
function createAuthError(
  code: string,
  message: string,
  details?: string
): AuthError {
  return { code, message, details };
}

/**
 * Create error response
 */
function createErrorResponse<T>(error: AuthError): AuthResponse<T> {
  return { success: false, error };
}

/**
 * Create success response
 */
function createSuccessResponse<T>(data: T): AuthResponse<T> {
  return { success: true, data };
}

/**
 * Handle Supabase auth errors with standardized format
 */
function handleSupabaseError(error: unknown): AuthError {
  if (error instanceof Error) {
    const message = error.message;

    // Map common Supabase errors to custom codes
    if (message.includes('Invalid login credentials')) {
      return createAuthError('INVALID_CREDENTIALS', 'Invalid email or password');
    }
    if (message.includes('Email not confirmed')) {
      return createAuthError('EMAIL_NOT_CONFIRMED', 'Please confirm your email first');
    }
    if (message.includes('Phone not confirmed')) {
      return createAuthError('PHONE_NOT_CONFIRMED', 'Please confirm your phone first');
    }
    if (message.includes('Over email send rate limit')) {
      return createAuthError(
        'RATE_LIMITED',
        'Too many OTP requests. Please try again later.',
        'Wait a few minutes before requesting another OTP'
      );
    }

    return createAuthError('AUTH_ERROR', message);
  }

  return createAuthError('UNKNOWN_ERROR', 'An unknown error occurred');
}

// ============================================================================
// RATE LIMITING UTILITIES
// ============================================================================

const OTP_COOLDOWN_MS = 60000; // 1 minute
const MAX_RETRIES = 5;
const RETRY_BLOCK_MS = 3600000; // 1 hour

/**
 * Get OTP request state from localStorage
 */
function getOTPRequestState(key: string): { lastRequestTime: number; retryCount: number; blockedUntil?: number } | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(`otp_request_${key}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Save OTP request state to localStorage
 */
function saveOTPRequestState(
  key: string,
  state: { lastRequestTime: number; retryCount: number; blockedUntil?: number }
): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(`otp_request_${key}`, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save OTP request state:', error);
  }
}

/**
 * Check if OTP request is rate limited
 */
export function isOTPRateLimited(contact: string): {
  isLimited: boolean;
  remainingSeconds: number;
} {
  const state = getOTPRequestState(contact);

  if (!state) {
    return { isLimited: false, remainingSeconds: 0 };
  }

  // Check if blocked due to too many retries
  if (state.blockedUntil && state.blockedUntil > Date.now()) {
    const remainingMs = state.blockedUntil - Date.now();
    return { isLimited: true, remainingSeconds: Math.ceil(remainingMs / 1000) };
  }

  // Check cooldown between requests
  const timeSinceLastRequest = Date.now() - state.lastRequestTime;
  if (timeSinceLastRequest < OTP_COOLDOWN_MS) {
    const remainingMs = OTP_COOLDOWN_MS - timeSinceLastRequest;
    return { isLimited: true, remainingSeconds: Math.ceil(remainingMs / 1000) };
  }

  return { isLimited: false, remainingSeconds: 0 };
}

/**
 * Record OTP request for rate limiting
 */
function recordOTPRequest(contact: string): void {
  const state = getOTPRequestState(contact);
  const newRetryCount = state ? state.retryCount + 1 : 1;
  const blockedUntil =
    newRetryCount >= MAX_RETRIES ? Date.now() + RETRY_BLOCK_MS : undefined;

  saveOTPRequestState(contact, {
    lastRequestTime: Date.now(),
    retryCount: newRetryCount,
    blockedUntil,
  });
}

/**
 * Clear OTP request state after successful verification
 */
function clearOTPRequestState(contact: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(`otp_request_${contact}`);
  } catch (error) {
    console.warn('Failed to clear OTP request state:', error);
  }
}

// ============================================================================
// ROLE MANAGEMENT
// ============================================================================

/**
 * Get user role from profiles table
 */
export async function getUserRole(userId: string): Promise<AuthRole> {
  try {
    const response = await getUserProfile(userId);
    if (response.success) {
      return response.data.role;
    }
    return 'customer';
  } catch (error) {
    console.warn('Failed to fetch user role:', error);
    return 'customer';
  }
}

// ============================================================================
// AUTHENTICATION OPERATIONS
// ============================================================================

/**
 * Sign up or sign in customer with email OTP
 */
export async function signInWithEmailOTP(email: string): Promise<AuthResponse<unknown>> {
  // Validate input
  if (!email || typeof email !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'Email is required')
    );
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!isValidEmail(trimmedEmail)) {
    return createErrorResponse(
      createAuthError('INVALID_EMAIL', 'Please enter a valid email address')
    );
  }

  // Check rate limiting
  const { isLimited, remainingSeconds } = isOTPRateLimited(trimmedEmail);
  if (isLimited) {
    return createErrorResponse(
      createAuthError(
        'RATE_LIMITED',
        `Too many OTP requests. Please wait ${remainingSeconds} seconds.`
      )
    );
  }

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      throw error;
    }

    recordOTPRequest(trimmedEmail);
    return createSuccessResponse(data);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Sign up or sign in customer with phone OTP
 */
export async function signInWithPhoneOTP(phone: string): Promise<AuthResponse<unknown>> {
  // Validate input
  if (!phone || typeof phone !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'Phone number is required')
    );
  }

  const trimmedPhone = phone.trim();

  if (!isValidIndianPhone(trimmedPhone)) {
    return createErrorResponse(
      createAuthError(
        'INVALID_PHONE',
        'Please enter a valid Indian phone number (+91XXXXXXXXXX)'
      )
    );
  }

  // Check rate limiting
  const { isLimited, remainingSeconds } = isOTPRateLimited(trimmedPhone);
  if (isLimited) {
    return createErrorResponse(
      createAuthError(
        'RATE_LIMITED',
        `Too many OTP requests. Please wait ${remainingSeconds} seconds.`
      )
    );
  }

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: trimmedPhone,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      throw error;
    }

    recordOTPRequest(trimmedPhone);
    return createSuccessResponse(data);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Verify OTP token (for both email and phone)
 */
export async function verifyOTP(
  contact: string,
  token: string,
  type: 'sms' | 'email'
): Promise<AuthResponse<unknown>> {
  // Validate inputs
  if (!contact || typeof contact !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'Contact information is required')
    );
  }

  if (!token || typeof token !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'OTP is required')
    );
  }

  if (!isValidOTP(token)) {
    return createErrorResponse(
      createAuthError('INVALID_OTP', 'OTP must be exactly 6 digits')
    );
  }

  const trimmedContact = contact.trim();

  // Validate contact format based on type
  if (type === 'sms' && !isValidIndianPhone(trimmedContact)) {
    return createErrorResponse(
      createAuthError('INVALID_PHONE', 'Invalid phone number format')
    );
  }

  if (type === 'email' && !isValidEmail(trimmedContact)) {
    return createErrorResponse(
      createAuthError('INVALID_EMAIL', 'Invalid email format')
    );
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp(
      type === 'email'
        ? { email: trimmedContact, token, type }
        : { phone: trimmedContact, token, type }
    );

    if (error) {
      throw error;
    }

    // Clear rate limiting on successful verification
    clearOTPRequestState(trimmedContact);

    return createSuccessResponse(data);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Admin login with email and password
 */
export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<AuthResponse<unknown>> {
  // Validate inputs
  if (!email || typeof email !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'Email is required')
    );
  }

  if (!password || typeof password !== 'string') {
    return createErrorResponse(
      createAuthError('INVALID_INPUT', 'Password is required')
    );
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!isValidEmail(trimmedEmail)) {
    return createErrorResponse(
      createAuthError('INVALID_EMAIL', 'Please enter a valid email address')
    );
  }

  if (password.length < 6) {
    return createErrorResponse(
      createAuthError('INVALID_PASSWORD', 'Password must be at least 6 characters')
    );
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) {
      throw error;
    }

    return createSuccessResponse(data);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<AuthResponse<void>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return createSuccessResponse(undefined);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession(): Promise<AuthSession | null> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return session as AuthSession;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}

/**
 * Refresh session tokens
 */
export async function refreshSession(): Promise<AuthResponse<AuthSession>> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (error || !session) {
      throw new Error(error?.message || 'Failed to refresh session');
    }

    return createSuccessResponse(session as AuthSession);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}

/**
 * Set up auth state change listener
 *
 * Returns unsubscribe function
 */
export function onAuthStateChange(
  callback: (user: User | null, role: AuthRole | null) => void
): () => void {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const role = await getUserRole(session.user.id);
      callback(session.user, role);
    } else {
      callback(null, null);
    }
  });

  return data?.subscription?.unsubscribe || (() => {});
}

/**
 * Get user profile from profiles table
 */
export async function getUserProfile(userId: string): Promise<AuthResponse<UserProfile>> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return createErrorResponse(
        createAuthError('NOT_FOUND', 'User profile not found')
      );
    }

    return createSuccessResponse(data as UserProfile);
  } catch (error) {
    const authError = handleSupabaseError(error);
    return createErrorResponse(authError);
  }
}
