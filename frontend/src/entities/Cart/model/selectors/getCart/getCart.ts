import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getCart = (state: StateSchema) => state.cart?.cart;
