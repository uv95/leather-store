import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getUserId = (state: StateSchema) => state.user?.user?._id;
