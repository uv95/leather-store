import { createSlice } from '@reduxjs/toolkit';
import { OrderSchema } from '../types/order';
import { cancelOrder } from '../services/cancelOrder/cancelOrder';
import { getOrder } from '../services/getOrder/getOrder';
import { createOrder } from '../services/createOrder/createOrder';
import { getUserOrders } from '../services/getUserOrders/getUserOrders';
import { getAllOrders } from '../services/getAllOrders/getAllOrders';
import { updateOrder } from '../services/updateOrder/updateOrder';

const initialState: OrderSchema = {
  order: undefined,
  orders: [],
  myOrders: [],
  isLoading: false,
  isError: false,
};

export const orderSlice = createSlice({
  name: '@@orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.myOrders = state.myOrders.filter(
          (order) => order._id !== action.meta.arg
        );
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(getOrder.rejected, (state) => {
        state.order = undefined;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.data.data;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload.data.data];
        state.myOrders = [...state.myOrders, action.payload.data.data];
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data.data;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.myOrders = [];
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
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
          state.isError = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default orderSlice.reducer;
