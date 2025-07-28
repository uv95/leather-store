import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAllAddresses = (state: StateSchema) => state.address.addresses;
