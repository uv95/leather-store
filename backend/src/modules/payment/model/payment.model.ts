import { Types, model, Schema } from 'mongoose';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'canceled';

export interface Payment {
  order: Types.ObjectId;
  user: Types.ObjectId;
  amount: number;
  status: PaymentStatus;
  createdAt: NativeDate;
}

const paymentStatuses: PaymentStatus[] = [
  'pending',
  'paid',
  'failed',
  'canceled',
];

const paymentSchema = new Schema<Payment>({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    enum: paymentStatuses,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Payment = model('Payment', paymentSchema);

export default Payment;
