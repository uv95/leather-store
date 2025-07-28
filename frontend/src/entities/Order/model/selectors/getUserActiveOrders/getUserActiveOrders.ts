import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../../store';
import { Order, OrderStatus } from '../../types/order';

export const getUserActiveOrders = createSelector(
  (state: RootState) => state.orders,
  (order) =>
    order.myOrders.filter(
      (order: Order) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
