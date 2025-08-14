import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { OrderStatus, UserOrder } from '../../types/order';

export const getUserCompletedOrders = createSelector(
  (state: StateSchema) => state.orders,
  (order) =>
    order.userOrders.filter(
      (order: UserOrder) => order.status === OrderStatus.COMPLETED
    )
);
