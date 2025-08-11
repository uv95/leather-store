import { Types, model, Schema } from 'mongoose';
import {
  leatherTypeValues,
  colorValues,
  Color,
  LeatherType,
} from '../utils/types';

export interface OrderItem {
  leatherType: LeatherType;
  quantity: number;
  priceAtPurchase: number;
  order: Types.ObjectId;
  item: Types.ObjectId;
  colors: {
    leather: Color;
    thread: Color;
  };
}

const orderItemSchema = new Schema<OrderItem>({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  colors: {
    leather: {
      type: String,
      enum: {
        values: colorValues,
      },
      required: true,
      default: Color.BLACK,
    },
    thread: {
      type: String,
      enum: {
        values: colorValues,
      },
      required: true,
      default: Color.BLACK,
    },
  },
  leatherType: {
    type: String,
    enum: {
      values: leatherTypeValues,
    },
    required: true,
    default: LeatherType.CRAZY_HORSE,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});

const OrderItem = model('OrderItem', orderItemSchema);

export default OrderItem;
