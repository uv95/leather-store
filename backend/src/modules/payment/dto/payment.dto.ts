export interface CreatePaymentIntentDto {
  orderId: string;
  amount: number;
  currency: string;
}

export interface ConfirmPaymentIntentDto {
  paymentIntentId: string;
  paymentMethodId: string;
}
