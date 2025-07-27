import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getItemsIsLoading = (state: StateSchema) => state.items.isLoading;
