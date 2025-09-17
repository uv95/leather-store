export interface CreatePaymentIntentDto {
  orderId: string;
  amount: number;
  currency: string;
}
