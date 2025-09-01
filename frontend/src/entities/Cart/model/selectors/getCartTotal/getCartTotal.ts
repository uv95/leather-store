import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartTotal = (state: StateSchema) => state.cart.total;
