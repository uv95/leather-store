import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getClientSecret = (state: StateSchema) =>
  state?.payment?.clientSecret;
