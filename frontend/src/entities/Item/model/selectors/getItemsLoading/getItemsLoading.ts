import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getItemsLoading = (state: StateSchema) => state.items.loading;
