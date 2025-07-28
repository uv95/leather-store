import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../../store';
import { Order, OrderStatus } from '../../types/order';

export const getAllActiveOrders = createSelector(
  (state: RootState) => state.orders,
  (order) =>
    order.orders.filter(
      (order: Order) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
