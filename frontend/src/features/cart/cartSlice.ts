import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extractErrorMessage } from '../../utils/errorMessage';
import cartService from './cartService';
import { ICartItem, ICartState } from '../../types/data';

const initialState: ICartState = {
  cart: null,
  isLoading: false,
};

//this function also increases quantity
export const addToCart = createAsyncThunk(
  '@@cart/add',
  async (cartItem: ICartItem, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.addToCart(cartItem, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getCart = createAsyncThunk('@@cart/get', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.auth.user;
    return await cartService.getCart(token);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const emptyCart = createAsyncThunk(
  '@@cart/emptyCart',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.emptyCart(token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const deleteItemFromCart = createAsyncThunk(
  '@@cart/deleteItem',
  async (cartItemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.deleteItemFromCart(cartItemId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const reduceQuantity = createAsyncThunk(
  '@@cart/reduceQuantity',
  async (cartItemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.reduceQuantity(cartItemId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.data;
        console.log(action);
      })

      .addCase(emptyCart.rejected, (state) => {
        state.cart = null;
      })
      .addCase(getCart.pending, (state) => {
        state.cart = null;
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.data;
      })
      .addCase(getCart.rejected, (state) => {
        state.cart = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.data;
      })
      .addCase(reduceQuantity.fulfilled, (state, action) => {
        let cartItem;
        if (state.cart)
          cartItem = state.cart.items.find(
            (item) => item._id === action.meta.arg
          );
        if (cartItem) cartItem.quantity -= 1;
        state.cart = action.payload.data.data;
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

export default cartSlice.reducer;
