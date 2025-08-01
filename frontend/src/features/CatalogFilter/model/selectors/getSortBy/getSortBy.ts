import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getSortBy = (state: StateSchema) => state.filters.sortBy;
