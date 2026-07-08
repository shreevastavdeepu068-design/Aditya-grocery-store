export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderPayload {
  customer: CustomerDetails;
  items: OrderItem[];
  paymentMethod: 'COD' | 'UPI' | 'Card';
}

export interface OrderResponse {
  success: boolean;
  message?: string;
  order?: Order;
}
