import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../../store';
import { Order, OrderStatus } from '../../types/order';

export const getAllCompletedOrders = createSelector(
  (state: RootState) => state.orders,
  (order) =>
    order.orders.filter(
      (order: Order) => order.status === OrderStatus.COMPLETED
    )
);
