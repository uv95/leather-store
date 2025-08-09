import { Types, model, Schema } from 'mongoose';
import {
  leatherTypeValues,
  colorValues,
  LeatherType,
  Color,
} from '../utils/types';

export interface CartItem {
  leatherType: LeatherType;
  quantity: number;
  price: number;
  cartId: Types.ObjectId;
  itemId: Types.ObjectId;
  colors: {
    leather: Color;
    thread: Color;
  };
}

const cartItemSchema = new Schema<CartItem>({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  itemId: {
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
  price: {
    type: Number,
    required: true,
  },
});

const CartItem = model('CartItem', cartItemSchema);

export default CartItem;
