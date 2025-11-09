export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'canceled';

export interface Payment {
  order: string;
  user: string;
  amount: number;
  status: PaymentStatus;
  paymentIntentId: string;
  createdAt: string;
}

export interface PaymentIntent {
  id: string;
  status: string;
  amount: number;
  currency: string;
  clientSecret: string;
  customer: string;
  metadata: {
    orderId: string;
  };
}

export interface PaymentSchema {
  payments: Payment[];
  payment?: Payment;
  clientSecret?: string;
  paymentIntentId?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
