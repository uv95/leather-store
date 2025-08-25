import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartItemCount = (state: StateSchema) =>
  state.cart.cartItemCount;
