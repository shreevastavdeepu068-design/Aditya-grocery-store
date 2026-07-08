import { supabase } from "@/lib/supabase";

/**
 * Search products by name
 */
export async function searchProducts(keyword: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${keyword}%`)
    .eq("is_available", true)
    .order("name");

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}

/**
 * Get search suggestions
 */
export async function getSearchSuggestions(keyword: string) {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug")
    .ilike("name", `%${keyword}%`)
    .limit(8);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

/**
 * Search by category
 */
export async function searchByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_available", true);

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}
