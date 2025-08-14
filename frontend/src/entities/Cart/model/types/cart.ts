import { Color, Image, LeatherType } from '../../../Item';

export interface UpdatedQuantity {
  cartItemId: string;
  quantity: Quantity;
}
export interface Quantity {
  quantity: number;
}

export interface CartSchema {
  cartId: string;
  total: number;
  cartItems: CartItem[];
  cartItemCount: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export type CartItemDto = Omit<CartItem, '_id' | 'cart'>;

export interface ItemColors {
  leather: Color;
  thread: Color;
}

export interface Cart {
  _id: string;
  total: number;
}

export interface CartItem {
  _id: string;
  cart: string;
  item: {
    _id: string;
    name: string;
    imageCover: Image;
  };
  quantity: number;
  price: number;
  colors: ItemColors;
  leatherType: LeatherType;
}

export interface CartData {
  cartItems: CartItem[];
  total: number;
  itemCount: number;
}
