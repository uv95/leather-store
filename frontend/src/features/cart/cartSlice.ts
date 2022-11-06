import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extractErrorMessage } from '../../utils/errorMessage';
import cartService from './cartService';
import { CartItem } from './cartService';

interface ICart {
  cart: CartItem[] | [];
  isLoading: boolean;
}

const initialState: ICart = {
  cart: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  '@@cart/add',
  async (cartItem: CartItem, thunkAPI) => {
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
  async (itemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.deleteItemFromCart(itemId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const reduceQuantity = createAsyncThunk(
  '@@cart/reduceQuantity',
  async (itemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await cartService.reduceQuantity(itemId, token);
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
        state.cart = state.cart.filter(
          (cartItem) => cartItem.itemId !== action.meta.arg
        );
      })
      .addCase(emptyCart.rejected, (state) => {
        state.cart = [];
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.data;
      })
      .addCase(getCart.rejected, (state) => {
        state.cart = [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = [...state.cart, action.payload.data.data];
      })
      .addCase(reduceQuantity.fulfilled, (state, action) => {
        const cartItem = state.cart.find(
          (item) => item.itemId === action.meta.arg
        );
        if (cartItem) cartItem.quantity -= 1;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
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
