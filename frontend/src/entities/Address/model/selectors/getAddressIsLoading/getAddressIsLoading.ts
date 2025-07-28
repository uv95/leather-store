import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAddressIsLoading = (state: StateSchema) =>
  state.address.isLoading;
