import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { AdminOrder, OrderStatus } from '../../types/order';

export const getAllActiveOrders = createSelector(
  (state: StateSchema) => state.orders,
  (order) =>
    order.orders.filter(
      (order: AdminOrder) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
