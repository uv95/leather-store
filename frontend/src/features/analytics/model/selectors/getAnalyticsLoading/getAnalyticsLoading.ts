import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAnalyticsLoading = (state: StateSchema) =>
  state.analytics.loading;
