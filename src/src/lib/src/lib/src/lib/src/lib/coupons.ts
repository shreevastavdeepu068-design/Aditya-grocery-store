import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type Coupon = Database["public"]["Tables"]["coupons"]["Row"];

/**
 * Get coupon by code
 */
export async function getCoupon(code: string): Promise<Coupon | null> {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/**
 * Validate coupon
 */
export async function validateCoupon(
  code: string,
  orderAmount: number
) {
  const coupon = await getCoupon(code);

  if (!coupon) {
    return {
      valid: false,
      message: "Invalid coupon",
    };
  }

  if (orderAmount < coupon.minimum_order) {
    return {
      valid: false,
      message: `Minimum order ₹${coupon.minimum_order}`,
    };
  }

  return {
    valid: true,
    coupon,
  };
}

/**
 * Increase coupon usage count
 */
export async function useCoupon(id: string) {
  const { error } = await supabase.rpc("increment_coupon_usage", {
    coupon_id: id,
  });

  if (error) throw error;
}
