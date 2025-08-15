import {
  Cart,
  CartItem,
  CartSchema,
  Quantity,
  UpdatedQuantity,
  ItemColors,
  CartData,
  CartItemDto,
} from './model/types/cart';
import { addToCart } from './model/services/addToCart/addToCart';
import { changeQuantity } from './model/services/changeQuantity/changeQuantity';
import { clearCart } from './model/services/clearCart/clearCart';
import { getCart } from './model/services/getCart/getCart';
import { getCartItems } from './model/services/getCartItems/getCartItems';
import { mergeCartItems } from './model/services/mergeCartItems/mergeCartItems';
import { getCartItemCount } from './model/services/getCartItemCount/getCartItemCount';
import { removeFromCart } from './model/services/removeFromCart/removeFromCart';
import cartReducer from './model/slice/cartSlice';
import { getCartId } from './model/selectors/getCartId/getCartId';
import { getCartItemCount as getCartItemCountSelector } from './model/selectors/getCartItemCount/getCartItemCount';
import { getCartItems as getCartItemsSelector } from './model/selectors/getCartItems/getCartItems';
import { getCartTotal } from './model/selectors/getCartTotal/getCartTotal';
import { getCartLoading } from './model/selectors/getCartLoading/getCartLoading';
import {
  addToCartLS,
  removeFromCartLS,
  changeQuantityLS,
  getCartItemsLS,
} from './model/slice/cartSlice';

export {
  type Cart,
  type CartItem,
  type CartSchema,
  type Quantity,
  type UpdatedQuantity,
  type ItemColors,
  type CartData,
  type CartItemDto,
  getCart,
  addToCart,
  changeQuantity,
  clearCart,
  getCartItems,
  mergeCartItems,
  getCartItemCount,
  removeFromCart,
  cartReducer,
  getCartId,
  getCartLoading,
  getCartItemCountSelector,
  getCartItemsSelector,
  getCartTotal,
  addToCartLS,
  removeFromCartLS,
  changeQuantityLS,
  getCartItemsLS,
};
