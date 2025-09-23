import { StateSchema } from '../../../../../app/providers/StoreProvider';

export const getCurrentOrderId = (state: StateSchema) =>
  state.orders?.currentOrderId;
