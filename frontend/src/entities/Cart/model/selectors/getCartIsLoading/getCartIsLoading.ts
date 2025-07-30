import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartIsLoading = (state: StateSchema) => state.cart.isLoading;
