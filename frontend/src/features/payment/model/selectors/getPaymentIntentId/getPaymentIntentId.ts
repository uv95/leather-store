import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getPaymentIntentId = (state: StateSchema) =>
  state.payment?.paymentIntentId;
