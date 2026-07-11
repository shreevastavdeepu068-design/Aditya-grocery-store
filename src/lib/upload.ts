import { supabase } from "@/lib/supabase";

/**
 * Upload product image
 */
export async function uploadProductImage(
  file: File,
  fileName: string
) {
  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get public image URL
 */
export function getProductImageUrl(path: string) {
  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Delete image
 */
export async function deleteProductImage(path: string) {
  const { error } = await supabase.storage
    .from("products")
    .remove([path]);

  if (error) {
    throw error;
  }

  return true;
}

/**
 * Replace image
 */
export async function replaceProductImage(
  oldPath: string,
  file: File,
  newPath: string
) {
  await deleteProductImage(oldPath);

  return uploadProductImage(file, newPath);
}
