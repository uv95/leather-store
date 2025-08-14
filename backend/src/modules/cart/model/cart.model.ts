import { Types, model, Schema } from 'mongoose';

export interface Cart {
  user: Types.ObjectId;
  total: number;
}

const cartSchema = new Schema<Cart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  total: { type: Number, default: 0, required: true },
});

const Cart = model('Cart', cartSchema);

export default Cart;
