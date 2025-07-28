import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getOrderIsLoading = (state: StateSchema) => state.orders.isLoading;
