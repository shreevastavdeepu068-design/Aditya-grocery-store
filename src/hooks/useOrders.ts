"use client";

import { useEffect, useState } from "react";
import {
  getUserOrders,
  createOrder,
  cancelOrder,
} from "@/lib/orders";

export function useOrders(userId: string) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    if (!userId) return;

    try {
      setLoading(true);

      const data = await getUserOrders(userId);

      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, [userId]);

  async function placeOrder(orderData: {
    total_amount: number;
    payment_method: string;
    payment_status: string;
    order_status: string;
  }) {
    const order = await createOrder({
      user_id: userId,
      ...orderData,
    });

    await loadOrders();

    return order;
  }

  async function cancel(orderId: string) {
    await cancelOrder(orderId);

    await loadOrders();
  }

  return {
    orders,
    loading,
    placeOrder,
    cancel,
    refresh: loadOrders,
  };
}
