import { PaymentStatus } from '../model/payment.model';

export interface CreatePaymentIntentDto {
  amount: number;
  currency: string;
}

export interface UpdatePaymentDto {
  amount?: number;
  status?: PaymentStatus;
}
