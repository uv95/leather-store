import { createSelector } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../types/order';
import { RootState } from '../../../../../app/providers/StoreProvider/config/store';

export const getAllCompletedOrders = createSelector(
  (state: RootState) => state.orders,
  (order) =>
    order.orders.filter(
      (order: Order) => order.status === OrderStatus.COMPLETED
    )
);
