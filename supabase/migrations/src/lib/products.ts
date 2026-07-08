import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Product = Database["public"]["Tables"]["products"]["Row"];

export interface ProductFilters {
  categoryId?: string;
  featured?: boolean;
  bestseller?: boolean;
  search?: string;
  limit?: number;
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (filters.featured) {
    query = query.eq("featured", true);
  }

  if (filters.bestseller) {
    query = query.eq("bestseller", true);
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}

export async function getFeaturedProducts() {
  return getProducts({
    featured: true,
    limit: 12,
  });
}

export async function getBestSellerProducts() {
  return getProducts({
    bestseller: true,
    limit: 12,
  });
}

export async function getProductsByCategory(
  categoryId: string
) {
  return getProducts({
    categoryId,
  });
}
