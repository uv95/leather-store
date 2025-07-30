import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../services/addToCart/addToCart';
import { changeQuantity } from '../services/changeQuantity/changeQuantity';
import { deleteItemFromCart } from '../services/deleteItemFromCart/deleteItemFromCart';
import { emptyCart } from '../services/emptyCart/emptyCart';
import { getCart } from '../services/getCart/getCart';
import { updateCart } from '../services/updateCart/updateCart';
import { CartSchema } from '../types/cart';
import { LOCAL_STORAGE_CART } from '../../../../shared/const/consts';

const initialState: CartSchema = {
  cart: undefined,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    //if user not loggged in (LS - LocalStorage)
    addToCartLS: (state, action) => {
      if (state.cart) {
        //check if there is item in cart with the same ID and COLORS (same logic as in cartController)
        const itemIndex = state.cart.items.findIndex(
          (item) =>
            item.item.name === action.payload.item.name &&
            Object.values(item.colors).every(
              (color, i) => color === Object.values(action.payload.colors)[i]
            ) &&
            item.leather === action.payload.leather
        );

        if (itemIndex > -1) {
          let product = state.cart.items[itemIndex];
          product.quantity += 1;

          if (product.total) {
            product.total += product.item.price;
          }

          state.cart.items[itemIndex] = product;
          state.cart.totalQuantity += 1;
          state.cart.total += product.item.price;
        } else {
          state.cart.items.push(action.payload);
          state.cart.totalQuantity += 1;
          state.cart.total += action.payload.item.price;
        }
      }
      if (!state.cart)
        state.cart = {
          items: [action.payload],
          total: action.payload.item.price,
          totalQuantity: 1,
        };
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cart));
    },

    getCartLS: (state) => {
      state.cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART)!);
    },

    deleteItemFromCartLS: (state, action) => {
      if (state.cart) {
        const itemIndex = state.cart.items.findIndex(
          (item) => item._id === action.payload
        );

        if (itemIndex > -1) {
          let item = state.cart.items[itemIndex];
          if (item.total && item.total < 0) item.total = 0;
          state.cart.items.splice(itemIndex, 1);
          state.cart.total -= item.item.price * item.quantity;
          state.cart.totalQuantity -= item.quantity;
        }
        if (!state.cart.items.length) {
          state.cart.total = 0;
          state.cart.totalQuantity = 0;
        }
        localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cart));
      }
    },

    changeQuantityLS: (state, action) => {
      if (state.cart) {
        const itemIndex = state.cart.items.findIndex(
          (item) => item._id === action.payload.cartItemId
        );

        if (itemIndex > -1) {
          let item = state.cart.items[itemIndex];
          item.quantity = action.payload.quantity;
          item.total = item.item.price * action.payload.quantity;
          state.cart.total = state.cart.items
            .map((item) => item.total!)
            .reduce((prev, curr) => prev! + curr!, 0);
          state.cart.totalQuantity = state.cart.items
            .map((item) => item.quantity)
            .reduce((prev, curr) => prev! + curr!, 0);
          if (item.total < 0) item.total = 0;
          if (item.quantity === 0) state.cart.items.splice(itemIndex, 1);
        }
        localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cart));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.cart = undefined;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(getCart.pending, (state) => {
        state.cart = undefined;
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(getCart.rejected, (state) => {
        state.cart = undefined;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const {
  addToCartLS,
  getCartLS,
  deleteItemFromCartLS,
  changeQuantityLS,
} = cartSlice.actions;

export default cartSlice.reducer;
