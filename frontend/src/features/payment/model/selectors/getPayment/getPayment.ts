import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getPayment = (state: StateSchema) => state.payment?.payment;
