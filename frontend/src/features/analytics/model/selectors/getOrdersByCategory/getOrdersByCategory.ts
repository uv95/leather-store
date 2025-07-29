import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getOrdersByCategory = (state: StateSchema) =>
  state.analytics.ordersByCategory;
