import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAnalyticsIsLoading = (state: StateSchema) =>
  state.analytics.isLoading;
