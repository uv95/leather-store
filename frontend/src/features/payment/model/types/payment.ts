export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'canceled';

export interface Payment {
  order: string;
  user: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
}
