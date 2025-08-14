import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { Order, OrderStatus } from '../../types/order';

export const getUserActiveOrders = createSelector(
  (state: StateSchema) => state.orders,
  (order) =>
    order.userOrders.filter(
      (order: Order<string>) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
