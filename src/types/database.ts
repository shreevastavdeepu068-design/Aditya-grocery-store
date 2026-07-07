/**
 * Supabase Database Type Definitions
 *
 * This file contains TypeScript types for your Supabase database schema.
 * These types are auto-generated based on your database tables and ensure
 * type safety when interacting with Supabase.
 *
 * To generate these types automatically:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Run: supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 * 3. Replace YOUR_PROJECT_ID with your actual Supabase project ID
 *
 * For now, we provide a basic schema structure that you'll expand as your
 * database grows. The Database type is used with the Supabase client for
 * full type safety across queries.
 */

export type Database = {
  public: {
    Tables: {
      // Table definitions will be added here
      // Example:
      // products: {
      //   Row: {
      //     id: string;
      //     name: string;
      //     price: number;
      //     created_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     name: string;
      //     price: number;
      //     created_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     name?: string;
      //     price?: number;
      //     created_at?: string;
      //   };
      // };
    };
    Views: {
      // View definitions will be added here
    };
    Functions: {
      // Function definitions will be added here
    };
    Enums: {
      // Enum definitions will be added here
    };
    CompositeTypes: {
      // Composite type definitions will be added here
    };
  };
};
