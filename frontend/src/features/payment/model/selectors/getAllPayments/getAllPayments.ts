import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAllPayments = (state: StateSchema) => state.payment.payments;
