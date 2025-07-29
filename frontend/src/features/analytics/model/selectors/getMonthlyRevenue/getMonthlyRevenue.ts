import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getMonthlyRevenue = (state: StateSchema) =>
  state.analytics.monthlyRevenue;
