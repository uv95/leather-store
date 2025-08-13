import { Types, model, Schema } from 'mongoose';

export interface Cart {
  user: Types.ObjectId;
}

const cartSchema = new Schema<Cart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cart = model('Cart', cartSchema);

export default Cart;
