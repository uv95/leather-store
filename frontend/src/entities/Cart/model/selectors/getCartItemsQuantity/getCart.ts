import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartItemsQuantity = (state: StateSchema) =>
  state.cart?.cart?.totalQuantity || 0;
