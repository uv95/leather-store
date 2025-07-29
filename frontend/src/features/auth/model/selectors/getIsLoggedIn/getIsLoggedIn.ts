import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getIsLoggedIn = (state: StateSchema) => state.auth.isLoggedIn;
