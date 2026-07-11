import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Order = Database["public"]["Tables"]["orders"]["Row"];

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
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
 * Get single order
 */
export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
/**
 * Create a new order
 */
export async function createOrder(order: {
  user_id: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      order_status: status,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string) {
  return updateOrderStatus(orderId, "cancelled");
}
