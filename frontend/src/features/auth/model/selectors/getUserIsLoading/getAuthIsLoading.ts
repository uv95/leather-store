import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAuthIsLoading = (state: StateSchema) => state.auth.isLoading;
