export type PaymentMethod = "COD" | "UPI" | "Razorpay";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;

  method: PaymentMethod;
  status: PaymentStatus;

  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;

  createdAt: string;
}

export interface CreatePaymentPayload {
  orderId: string;
  amount: number;
  method: PaymentMethod;
}

export interface PaymentResponse {
  success: boolean;
  payment?: Payment;
  message?: string;
}
