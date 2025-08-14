import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { Order, OrderStatus } from '../../types/order';
import { User } from '../../../../User';

export const getAllCompletedOrders = createSelector(
  (state: StateSchema) => state.orders,
  (order) =>
    order.orders.filter(
      (order: Order<Omit<User, '_id' | 'role'>>) =>
        order.status === OrderStatus.COMPLETED
    )
);
