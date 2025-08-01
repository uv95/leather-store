import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getFilters = (state: StateSchema) => state.filters.filters;
