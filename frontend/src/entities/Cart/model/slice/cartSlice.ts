import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_CART } from '../../../../shared/const/consts';
import { addToCart } from '../services/addToCart/addToCart';
import { changeQuantity } from '../services/changeQuantity/changeQuantity';
import { getCart } from '../services/getCart/getCart';
import { CartItem, CartItemDto, CartSchema } from '../types/cart';
import { clearCart } from '../services/clearCart/clearCart';
import { getCartItemCount } from '../services/getCartItemCount/getCartItemCount';
import { getCartItems } from '../services/getCartItems/getCartItems';
import { mergeCartItems } from '../services/mergeCartItems/mergeCartItems';
import { removeFromCart } from '../services/removeFromCart/removeFromCart';

function areCartItemsEqual(item1: CartItemDto, item2: CartItemDto) {
  return (
    item1.colors.leather === item2.colors.leather &&
    item1.colors.thread === item2.colors.thread &&
    item1.item === item2.item &&
    item1.leatherType === item2.leatherType
  );
}

const initialState: CartSchema = {
  cartId: '',
  total: 0,
  cartItems: [],
  cartItemCount: 0,
  loading: 'idle',
};

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    addToCartLS: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;

      const existingCartItem = state.cartItems.find((cartItem) =>
        areCartItemsEqual(cartItem, newCartItem)
      );

      if (existingCartItem) {
        existingCartItem.quantity += newCartItem.quantity;
      }
      if (!existingCartItem) {
        state.cartItems.push(newCartItem);
      }

      state.total += newCartItem.price * newCartItem.quantity;
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cartItems));
    },

    getCartItemsLS: (state) => {
      const cartItemsStringified = localStorage.getItem(LOCAL_STORAGE_CART);
      state.cartItems = cartItemsStringified
        ? JSON.parse(cartItemsStringified)
        : [];
      state.loading = 'succeeded';
    },

    removeFromCartLS: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const cartItemIndex = state.cartItems.findIndex(
        (existingCartItem) => existingCartItem._id === cartItemId
      );

      if (cartItemIndex > -1) {
        state.cartItems.splice(cartItemIndex, 1);
        state.total -=
          state.cartItems[cartItemIndex].price *
          state.cartItems[cartItemIndex].quantity;
        localStorage.setItem(
          LOCAL_STORAGE_CART,
          JSON.stringify(state.cartItems)
        );
      }
    },

    changeQuantityLS: (
      state,
      action: PayloadAction<{ cartItemId: string; quantity: number }>
    ) => {
      const { cartItemId, quantity } = action.payload;
      const cartItemIndex = state.cartItems.findIndex(
        (existingCartItem) => existingCartItem._id === cartItemId
      );

      if (cartItemIndex > -1) {
        if (quantity <= 0) {
          state.cartItems.splice(cartItemIndex, 1);
        } else {
          state.cartItems[cartItemIndex].quantity = quantity;
        }

        state.total = state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        localStorage.setItem(
          LOCAL_STORAGE_CART,
          JSON.stringify(state.cartItems)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const { total, itemCount } = action.payload.data;

        state.cartItemCount = itemCount;
        state.total = total;
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        const { total, cartItems, itemCount } = action.payload.data;

        state.cartItems = cartItems;
        state.total = total;
        state.cartItemCount = itemCount;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.total = 0;
        state.cartItems = [];
        state.cartItemCount = 0;
      })
      .addCase(getCart.pending, (state) => {
        state.cartId = '';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const { total, _id: id } = action.payload.data;

        state.cartId = id;
        state.total = total;
      })
      .addCase(getCart.rejected, (state) => {
        state.cartId = '';
      })
      .addCase(getCartItemCount.fulfilled, (state, action) => {
        state.cartItemCount = action.payload.data;
      })
      .addCase(getCartItemCount.rejected, (state) => {
        state.cartItemCount = 0;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.cartItems = [];
      })
      .addCase(mergeCartItems.fulfilled, (state, action) => {
        const { total, cartItems, itemCount } = action.payload.data;

        state.cartItems = cartItems;
        state.total = total;
        state.cartItemCount = itemCount;
      })
      .addCase(mergeCartItems.rejected, (state) => {
        state.cartItems = [];
        state.total = 0;
        state.cartItemCount = 0;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { total, cartItems, itemCount } = action.payload.data;

        state.cartItems = cartItems;
        state.total = total;
        state.cartItemCount = itemCount;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('@@cart') &&
          action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = 'succeeded';
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('@@cart') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = 'pending';
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('@@cart') && action.type.endsWith('/rejected'),
        (state) => {
          state.loading = 'failed';
        }
      );
  },
});

export const {
  addToCartLS,
  getCartItemsLS,
  removeFromCartLS,
  changeQuantityLS,
} = cartSlice.actions;

export default cartSlice.reducer;
