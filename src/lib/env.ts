/**
 * Environment Variables Configuration
 *
 * This module centralizes environment variable validation and type safety.
 * All environment variables must be publicly accessible (NEXT_PUBLIC_ prefix)
 * since this app runs partially in the browser.
 *
 * Required environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anonymous/public key
 *
 * Configuration instructions:
 * 1. Copy .env.example to .env.local
 * 2. Fill in your Supabase credentials from your project settings
 * 3. Never commit .env.local to version control
 * 4. For production, set these in your hosting platform's environment variables
 */

interface Environment {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

let cachedEnv: Environment | null = null;

/**
 * Validate and retrieve environment variables
 *
 * @throws Error if required environment variables are missing
 * @returns Validated environment configuration
 */
export function getEnv(): Environment {
  if (cachedEnv) {
    return cachedEnv;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing environment variable: NEXT_PUBLIC_SUPABASE_URL. Please add it to your .env.local file.'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY. Please add it to your .env.local file.'
    );
  }

  cachedEnv = {
    supabaseUrl,
    supabaseAnonKey,
  };

  return cachedEnv;
}
