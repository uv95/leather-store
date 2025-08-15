import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getUserAddresses = (state: StateSchema) => state.address.addresses;
