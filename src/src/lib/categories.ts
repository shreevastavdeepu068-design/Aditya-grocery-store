import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Category =
  Database["public"]["Tables"]["categories"]["Row"];

/**
 * Get all active categories
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
/**
 * Get category by id
 */
export async function getCategoryById(id: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
