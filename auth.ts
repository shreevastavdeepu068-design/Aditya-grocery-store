export type AuthRole = "admin" | "customer";

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  role: AuthRole;
}

export interface AuthSession {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  session?: AuthSession;
  error?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  signInWithEmailOTP: (
    email: string
  ) => Promise<AuthResponse>;

  signInWithPhoneOTP: (
    phone: string
  ) => Promise<AuthResponse>;

  verifyOTP: (
    contact: string,
    token: string,
    type: "sms" | "email"
  ) => Promise<AuthResponse>;

  signInWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;

  signOut: () => Promise<AuthResponse<void>>;

  refreshSession: () => Promise<AuthResponse<AuthSession>>;
}
