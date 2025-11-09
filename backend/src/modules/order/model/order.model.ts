import { Types, model, Schema } from 'mongoose';

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

export interface Order {
  createdAt: NativeDate;
  user: Types.ObjectId;
  address: Types.ObjectId;
  total: number;
  status: OrderStatus;
}

const orderStatuses = Object.values(OrderStatus);

const orderSchema = new Schema<Order>({
  total: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide a delivery address'],
  },
  status: {
    type: String,
    enum: orderStatuses,
    default: OrderStatus.AWAITING_PAYMENT,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model('Order', orderSchema);

export default Order;
