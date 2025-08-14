import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getUserActiveOrderCount = (state: StateSchema) =>
  state.orders.userActiveOrderCount;
