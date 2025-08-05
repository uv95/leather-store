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
  loading: 'idle',
};

export const orderSlice = createSlice({
  name: '@@orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = 'succeeded';
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
        state.loading = 'succeeded';
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload.data.data];
        state.myOrders = [...state.myOrders, action.payload.data.data];
        state.loading = 'succeeded';
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orders = [];
        state.loading = 'pending';
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data.data;
        state.loading = 'succeeded';
      })
      .addCase(getUserOrders.pending, (state) => {
        state.myOrders = [];
        state.loading = 'pending';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload.data.data;
        state.loading = 'succeeded';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.order = action.payload.data.data;
        state.orders = state.orders.map((order) =>
          order._id === action.payload.data.data._id
            ? action.payload.data.data
            : order
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('@@orders') &&
          action.type.endsWith('/rejected'),
        (state) => {
          state.loading = 'failed';
        }
      );
  },
});

export default orderSlice.reducer;
