import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartLoading = (state: StateSchema) => state.cart.loading;
