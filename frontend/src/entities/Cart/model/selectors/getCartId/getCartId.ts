import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartId = (state: StateSchema) => state.cart.cartId;
