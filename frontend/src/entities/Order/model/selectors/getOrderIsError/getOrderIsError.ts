import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getOrderIsError = (state: StateSchema) => state.orders?.isError;
