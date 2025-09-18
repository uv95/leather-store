import { PaymentStatus } from '../model/payment.model';

export interface CreatePaymentIntentDto {
  orderId: string;
  amount: number;
  currency: string;
}

export interface UpdatePaymentDto {
  amount?: number;
  status?: PaymentStatus;
}
