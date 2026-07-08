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
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function searchProducts(keyword: string): Promise<Product[]> {
  return getProducts({
    search: keyword,
  });
}

export async function createProduct(
  product: Database["public"]["Tables"]["products"]["Insert"]
) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProduct(
  id: string,
  updates: Database["public"]["Tables"]["products"]["Update"]
) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

export async function toggleFeatured(
  id: string,
  featured: boolean
) {
  return updateProduct(id, {
    featured,
  });
}

export async function toggleAvailability(
  id: string,
  is_available: boolean
) {
  return updateProduct(id, {
    is_available,
  });
}

export async function getLatestProducts(limit = 10) {
  return getProducts({
    limit,
  });
}
