import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { User } from '../../../../User';
import { Order, OrderStatus } from '../../types/order';

export const getAllActiveOrders = createSelector(
  (state: StateSchema) => state.orders,
  (order) =>
    order.orders.filter(
      (order: Order<Omit<User, '_id' | 'role'>>) =>
        order.status === OrderStatus.AWAITING_PAYMENT ||
        order.status === OrderStatus.IN_PROGRESS
    )
);
