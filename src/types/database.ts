/**
 * Supabase Database Type Definitions
 *
 * These types describe the Aditya Store database schema (see the SQL files in
 * `supabase/migrations`). They provide full type safety when interacting with
 * the Supabase client via `createClient<Database>()`.
 *
 * To regenerate automatically once the Supabase CLI is configured:
 *   supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

type Timestamp = string;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: "admin" | "customer";
          avatar_url: string | null;
          language: "en" | "hi" | null;
          address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          is_active: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "admin" | "customer";
          avatar_url?: string | null;
          language?: "en" | "hi" | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "admin" | "customer";
          avatar_url?: string | null;
          language?: "en" | "hi" | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          image_url: string | null;
          description: string | null;
          sort_order: number | null;
          is_active: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          image_url?: string | null;
          description?: string | null;
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          image_url?: string | null;
          description?: string | null;
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          hindi_name: string | null;
          slug: string;
          brand: string | null;
          description: string | null;
          image_url: string | null;
          mrp: number;
          selling_price: number;
          stock: number | null;
          unit: string | null;
          weight: string | null;
          featured: boolean | null;
          bestseller: boolean | null;
          is_available: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          hindi_name?: string | null;
          slug: string;
          brand?: string | null;
          description?: string | null;
          image_url?: string | null;
          mrp: number;
          selling_price: number;
          stock?: number | null;
          unit?: string | null;
          weight?: string | null;
          featured?: boolean | null;
          bestseller?: boolean | null;
          is_available?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          hindi_name?: string | null;
          slug?: string;
          brand?: string | null;
          description?: string | null;
          image_url?: string | null;
          mrp?: number;
          selling_price?: number;
          stock?: number | null;
          unit?: string | null;
          weight?: string | null;
          featured?: boolean | null;
          bestseller?: boolean | null;
          is_available?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          is_primary: boolean | null;
          sort_order: number | null;
          created_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          is_primary?: boolean | null;
          sort_order?: number | null;
          created_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string;
          alt_text?: string | null;
          is_primary?: boolean | null;
          sort_order?: number | null;
          created_at?: Timestamp | null;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          payment_method: "cod" | "upi" | "razorpay";
          payment_status: "pending" | "paid" | "failed" | "refunded" | null;
          order_status:
            | "pending"
            | "confirmed"
            | "packed"
            | "out_for_delivery"
            | "delivered"
            | "cancelled"
            | null;
          subtotal: number;
          delivery_charge: number | null;
          discount: number | null;
          total_amount: number;
          notes: string | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          payment_method: "cod" | "upi" | "razorpay";
          payment_status?: "pending" | "paid" | "failed" | "refunded" | null;
          order_status?:
            | "pending"
            | "confirmed"
            | "packed"
            | "out_for_delivery"
            | "delivered"
            | "cancelled"
            | null;
          subtotal?: number;
          delivery_charge?: number | null;
          discount?: number | null;
          total_amount: number;
          notes?: string | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_number?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: string;
          payment_method?: "cod" | "upi" | "razorpay";
          payment_status?: "pending" | "paid" | "failed" | "refunded" | null;
          order_status?:
            | "pending"
            | "confirmed"
            | "packed"
            | "out_for_delivery"
            | "delivered"
            | "cancelled"
            | null;
          subtotal?: number;
          delivery_charge?: number | null;
          discount?: number | null;
          total_amount?: number;
          notes?: string | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          total: number;
          created_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          total: number;
          created_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          price?: number;
          quantity?: number;
          total?: number;
          created_at?: Timestamp | null;
        };
        Relationships: [];
      };
      delivery_addresses: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          phone: string;
          address_line1: string;
          address_line2: string | null;
          landmark: string | null;
          city: string;
          state: string;
          pincode: string;
          latitude: number | null;
          longitude: number | null;
          is_default: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          phone: string;
          address_line1: string;
          address_line2?: string | null;
          landmark?: string | null;
          city: string;
          state: string;
          pincode: string;
          latitude?: number | null;
          longitude?: number | null;
          is_default?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          phone?: string;
          address_line1?: string;
          address_line2?: string | null;
          landmark?: string | null;
          city?: string;
          state?: string;
          pincode?: string;
          latitude?: number | null;
          longitude?: number | null;
          is_default?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      store_settings: {
        Row: {
          id: string;
          store_name: string;
          owner_name: string | null;
          phone: string | null;
          whatsapp: string | null;
          email: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          delivery_radius_km: number | null;
          minimum_order: number | null;
          delivery_charge: number | null;
          free_delivery_above: number | null;
          currency: string | null;
          language: string | null;
          is_store_open: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          store_name: string;
          owner_name?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          delivery_radius_km?: number | null;
          minimum_order?: number | null;
          delivery_charge?: number | null;
          free_delivery_above?: number | null;
          currency?: string | null;
          language?: string | null;
          is_store_open?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          store_name?: string;
          owner_name?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          delivery_radius_km?: number | null;
          minimum_order?: number | null;
          delivery_charge?: number | null;
          free_delivery_above?: number | null;
          currency?: string | null;
          language?: string | null;
          is_store_open?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          title: string | null;
          description: string | null;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          minimum_order: number | null;
          maximum_discount: number | null;
          usage_limit: number | null;
          used_count: number | null;
          start_date: Timestamp | null;
          expiry_date: Timestamp | null;
          is_active: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          code: string;
          title?: string | null;
          description?: string | null;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          minimum_order?: number | null;
          maximum_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number | null;
          start_date?: Timestamp | null;
          expiry_date?: Timestamp | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          code?: string;
          title?: string | null;
          description?: string | null;
          discount_type?: "percentage" | "fixed";
          discount_value?: number;
          minimum_order?: number | null;
          maximum_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number | null;
          start_date?: Timestamp | null;
          expiry_date?: Timestamp | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      banners: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image_url: string;
          button_text: string | null;
          button_link: string | null;
          display_order: number | null;
          is_active: boolean | null;
          start_date: Timestamp | null;
          end_date: Timestamp | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          image_url: string;
          button_text?: string | null;
          button_link?: string | null;
          display_order?: number | null;
          is_active?: boolean | null;
          start_date?: Timestamp | null;
          end_date?: Timestamp | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          image_url?: string;
          button_text?: string | null;
          button_link?: string | null;
          display_order?: number | null;
          is_active?: boolean | null;
          start_date?: Timestamp | null;
          end_date?: Timestamp | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          message: string;
          notification_type: "general" | "order" | "offer" | "payment" | null;
          is_read: boolean | null;
          created_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title: string;
          message: string;
          notification_type?: "general" | "order" | "offer" | "payment" | null;
          is_read?: boolean | null;
          created_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          message?: string;
          notification_type?: "general" | "order" | "offer" | "payment" | null;
          is_read?: boolean | null;
          created_at?: Timestamp | null;
        };
        Relationships: [];
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: Timestamp | null;
        };
        Relationships: [];
      };
      product_reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          review: string | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          rating: number;
          review?: string | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          rating?: number;
          review?: string | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
      delivery_zones: {
        Row: {
          id: string;
          zone_name: string;
          city: string | null;
          delivery_radius_km: number | null;
          minimum_order: number | null;
          delivery_charge: number | null;
          free_delivery_above: number | null;
          is_active: boolean | null;
          created_at: Timestamp | null;
          updated_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          zone_name: string;
          city?: string | null;
          delivery_radius_km?: number | null;
          minimum_order?: number | null;
          delivery_charge?: number | null;
          free_delivery_above?: number | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Update: {
          id?: string;
          zone_name?: string;
          city?: string | null;
          delivery_radius_km?: number | null;
          minimum_order?: number | null;
          delivery_charge?: number | null;
          free_delivery_above?: number | null;
          is_active?: boolean | null;
          created_at?: Timestamp | null;
          updated_at?: Timestamp | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [key: string]: never;
    };
    Functions: {
      increment_coupon_usage: {
        Args: { coupon_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      [key: string]: never;
    };
    CompositeTypes: {
      [key: string]: never;
    };
  };
};
