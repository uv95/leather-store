import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IOrder, IOrderState, IUpdatedOrder } from '../../types/data';
import orderService from './orderService';
import { extractErrorMessage } from '../../utils/errorMessage';

const initialState: IOrderState = {
  order: null,
  orders: [],
  myOrders: [],
  isLoading: false,
};

export const addOrder = createAsyncThunk(
  '@@Orderes/add',
  async (orderData: IOrder, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.createOrder(orderData, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAllOrders = createAsyncThunk(
  '@@Orderes/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.getAllOrders(token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const getMyOrders = createAsyncThunk(
  '@@Orderes/getMyOrders',
  async (userId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.getMyOrders(userId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getOrder = createAsyncThunk(
  '@@Orderes/getOne',
  async (OrderId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.getOrder(OrderId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteOrder = createAsyncThunk(
  '@@Orderes/delete',
  async (OrderId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.cancelOrder(OrderId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const updateOrder = createAsyncThunk(
  '@@Orderes/update',
  async ({ orderId, updatedOrder }: IUpdatedOrder, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await orderService.updateOrder(orderId, updatedOrder, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const orderSlice = createSlice({
  name: '@@Orderes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.myOrders = state.myOrders.filter(
          (order) => order._id !== action.meta.arg
        );
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(getOrder.rejected, (state) => {
        state.order = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.data.data;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload.data.data];
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data.data;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.myOrders = [];
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload.data.data;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.order = action.payload.data.data;
        state.orders = state.orders.map((order) =>
          order._id === action.payload.data.data._id
            ? action.payload.data.data
            : order
        );
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

export default orderSlice.reducer;
