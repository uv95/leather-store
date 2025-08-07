import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getOrderLoading = (state: StateSchema) => state.orders.loading;
