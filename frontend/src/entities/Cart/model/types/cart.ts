import { Color } from '../../../../types/data';
import { Image, ItemType } from '../../../Item';

export interface CartItem {
  _id: string;
  total: number;
  item: {
    name: string;
    imageCover: Image;
    price: number;
    type: ItemType;
  };
  quantity: number;
  colors: {
    leatherColor: Color;
    threadsColor: Color;
  };
  leather: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalQuantity: number;
}
export interface UpdatedQuantity {
  cartItemId: string;
  quantity: Quantity;
}
export interface Quantity {
  quantity: number;
}

export interface CartSchema {
  cart?: Cart;
  isLoading: boolean;
}
