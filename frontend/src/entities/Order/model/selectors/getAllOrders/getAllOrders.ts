import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAllOrders = (state: StateSchema) => state.orders.orders;
