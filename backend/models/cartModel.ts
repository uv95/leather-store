import { Types, model, Schema } from 'mongoose';

export interface Cart {
  userId: Types.ObjectId;
}

const cartSchema = new Schema<Cart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cart = model('Cart', cartSchema);

export default Cart;
