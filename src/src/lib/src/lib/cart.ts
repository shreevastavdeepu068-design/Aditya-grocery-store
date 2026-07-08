import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];

/**
 * Get user's cart items
 */
export async function getCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}

/**
 * Add item to cart
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1
) {
  const { data, error } = await supabase
    .from("cart_items")
    .insert([
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
/**
 * Update cart quantity
 */
export async function updateCartItem(
  id: string,
  quantity: number
) {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

/**
 * Remove cart item
 */
export async function removeCartItem(id: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
}

/**
 * Clear user's cart
 */
export async function clearCart(userId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
}
