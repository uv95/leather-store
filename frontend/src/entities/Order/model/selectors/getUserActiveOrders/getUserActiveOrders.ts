import { createSelector } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../types/order';
import { RootState } from '../../../../../app/providers/StoreProvider/config/store';

export const getUserActiveOrders = createSelector(
  (state: RootState) => state.orders,
  (order) =>
    order.myOrders.filter(
      (order: Order) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
