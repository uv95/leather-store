import { Types, model, Schema } from 'mongoose';
import { OrderStatus, orderStatuses } from '../utils/types';

export interface Order {
  createdAt: NativeDate;
  user: Types.ObjectId;
  addressId: Types.ObjectId;
  total: number;
  status: OrderStatus;
}

const orderSchema = new Schema({
  total: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide a delivery address'],
  },
  status: {
    type: String,
    enum: orderStatuses,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model('Order', orderSchema);

export default Order;
