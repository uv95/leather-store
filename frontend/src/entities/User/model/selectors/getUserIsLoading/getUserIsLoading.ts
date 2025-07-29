import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
