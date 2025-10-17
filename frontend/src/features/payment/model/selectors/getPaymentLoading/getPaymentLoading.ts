import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getPaymentLoading = (state: StateSchema) =>
  state?.payment?.loading;
