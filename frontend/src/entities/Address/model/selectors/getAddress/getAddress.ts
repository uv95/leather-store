import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAddress = (state: StateSchema) => state.address?.address;
