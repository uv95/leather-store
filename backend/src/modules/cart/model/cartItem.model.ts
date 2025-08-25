import { Types, model, Schema, Model } from 'mongoose';
import {
  leatherTypeValues,
  colorValues,
  LeatherType,
  Color,
} from '../../../utils/types';

interface Colors {
  leather: Color;
  thread: Color;
}

export interface CartItem {
  leatherType: LeatherType;
  quantity: number;
  price: number;
  cart: Types.ObjectId;
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

const cartItemSchema = new Schema<CartItem, Model<CartItem>>({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
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

const CartItem = model('CartItem', cartItemSchema);

export default CartItem;
