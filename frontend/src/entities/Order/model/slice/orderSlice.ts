import { createSlice } from '@reduxjs/toolkit';
import { OrderSchema } from '../types/order';
import { deleteOrder } from '../services/deleteOrder/deleteOrder';
import { createOrder } from '../services/createOrder/createOrder';
import { getUserOrders } from '../services/getUserOrders/getUserOrders';
import { getAllOrders } from '../services/getAllOrders/getAllOrders';
import { updateOrder } from '../services/updateOrder/updateOrder';
import { getUserActiveOrderCount } from '../services/getUserActiveOrderCount/getUserActiveOrderCount';

const initialState: OrderSchema = {
  orders: [],
  userOrders: [],
  userActiveOrderCount: 0,
  loading: 'idle',
};

export const orderSlice = createSlice({
  name: '@@orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { userActiveOrderCount } = action.payload.data;

        state.userActiveOrderCount = userActiveOrderCount;
        state.loading = 'succeeded';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { userActiveOrderCount } = action.payload.data;
        const { orderId } = action.meta.arg;

        state.userActiveOrderCount = userActiveOrderCount;
        state.userOrders = state.userOrders.filter(
          (order) => order._id !== orderId
        );
        state.orders = state.orders.filter((order) => order._id !== orderId);
        state.loading = 'succeeded';
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orders = [];
        state.loading = 'pending';
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.orders = [];
      })
      .addCase(getUserActiveOrderCount.fulfilled, (state, action) => {
        state.userActiveOrderCount = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getUserActiveOrderCount.rejected, (state) => {
        state.userActiveOrderCount = 0;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.userOrders = [];
        state.loading = 'pending';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.userOrders = [];
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const { orderId } = action.meta.arg;
        const updatedOrder = action.payload.data;

        state.orders = state.orders.map((order) =>
          order._id === orderId ? updatedOrder : order
        );
        state.loading = 'succeeded';
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
