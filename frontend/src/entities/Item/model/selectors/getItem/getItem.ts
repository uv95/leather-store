import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getItem = (state: StateSchema) => state.items?.item;
