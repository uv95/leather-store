import { Types, model, Schema } from 'mongoose';
import {
  leatherTypeValues,
  colorValues,
  Color,
  LeatherType,
} from '../../../utils/types';

interface Colors {
  leather: Color;
  thread: Color;
}

export interface OrderItem {
  leatherType: LeatherType;
  quantity: number;
  price: number;
  order: Types.ObjectId;
  item: Types.ObjectId;
  colors: Colors;
}

const colorsSchema = new Schema<Colors>({
  leather: {
    type: String,
    enum: {
      values: colorValues,
      message: 'This leather color is not available',
    },
    required: true,
    default: Color.BLACK,
  },
  thread: {
    type: String,
    enum: {
      values: colorValues,
      message: 'This thread color is not available',
    },
    required: true,
    default: Color.BLACK,
  },
});

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
    type: colorsSchema,
    required: true,
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
  price: {
    type: Number,
    required: true,
  },
});

const OrderItem = model('OrderItem', orderItemSchema);

export default OrderItem;
