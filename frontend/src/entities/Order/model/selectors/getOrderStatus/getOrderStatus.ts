import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getOrderStatus = (state: StateSchema) =>
  state.orders?.order?.status;
