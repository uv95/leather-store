import {
  Cart,
  CartItem,
  CartSchema,
  Quantity,
  UpdatedQuantity,
  ItemColors,
} from './model/types/cart';
import { getCart } from './model/services/getCart/getCart';
import { addToCart } from './model/services/addToCart/addToCart';
import { changeQuantity } from './model/services/changeQuantity/changeQuantity';
import { deleteItemFromCart } from './model/services/deleteItemFromCart/deleteItemFromCart';
import { emptyCart } from './model/services/emptyCart/emptyCart';
import { updateCart } from './model/services/updateCart/updateCart';
import cartReducer from './model/slice/cartSlice';
import { getCart as getCartSelector } from './model/selectors/getCart/getCart';
import { getCartLoading } from './model/selectors/getCartLoading/getCartLoading';
import {
  addToCartLS,
  deleteItemFromCartLS,
  changeQuantityLS,
  getCartLS,
} from './model/slice/cartSlice';

export {
  type Cart,
  type CartItem,
  type CartSchema,
  type Quantity,
  type UpdatedQuantity,
  type ItemColors,
  getCart,
  addToCart,
  changeQuantity,
  deleteItemFromCart,
  emptyCart,
  updateCart,
  cartReducer,
  getCartSelector,
  getCartLoading,
  addToCartLS,
  deleteItemFromCartLS,
  changeQuantityLS,
  getCartLS,
};
