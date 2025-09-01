import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCartItems = (state: StateSchema) => state.cart.cartItems;
