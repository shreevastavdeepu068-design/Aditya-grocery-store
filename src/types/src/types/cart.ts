export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  cart?: Cart;
}
