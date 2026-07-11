"use client";

import { useEffect, useState } from "react";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/lib/cart";

export function useCart(userId: string) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await getCartItems(userId);
      setCartItems(data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, [userId]);

  async function add(productId: string, quantity = 1) {
    await addToCart(userId, productId, quantity);
    await loadCart();
  }

  async function update(id: string, quantity: number) {
    await updateCartItem(id, quantity);
    await loadCart();
  }

  async function remove(id: string) {
    await removeCartItem(id);
    await loadCart();
  }

  async function clear() {
    await clearCart(userId);
    await loadCart();
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return {
    cartItems,
    loading,
    totalItems,
    totalPrice,
    add,
    update,
    remove,
    clear,
    refresh: loadCart,
  };
}
