import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { getEnv } from './env';

/**
 * Supabase Client Singleton
 *
 * This module exports a reusable Supabase client instance configured with
 * environment variables. The client is created once and reused throughout
 * the application to maintain connection efficiency.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 *
 * These should be defined in your .env.local file (not committed to version control).
 */

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Get or create the Supabase client instance
 *
 * @throws Error if environment variables are not properly configured
 * @returns Configured Supabase client
 */
export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const env = getEnv();

  supabaseClient = createClient<Database>(
    env.supabaseUrl,
    env.supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  return supabaseClient;
}

/**
 * Convenience export for direct client access
 * Use this in client components and server actions
 */
export const supabase = getSupabaseClient();
