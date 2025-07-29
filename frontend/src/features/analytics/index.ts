import analyticsReducer from './model/slice/analyticsSlice';
import { getOrdersByCategory } from './model/services/getOrdersByCategory/getOrdersByCategory';
import { getMonthlyRevenueData } from './model/services/getMonthlyRevenueData/getMonthlyRevenueData';
import {
  AnalyticsSchema,
  MonthleRevenue,
  OrdersByCategory,
} from './model/types/analytics';
import { getAnalyticsIsLoading } from './model/selectors/getAnalyticsIsLoading/getAnalyticsIsLoading';
import { getMonthlyRevenue as getMonthlyRevenueSelector } from './model/selectors/getMonthlyRevenue/getMonthlyRevenue';
import { getOrdersByCategory as getOrdersByCategorySelector } from './model/selectors/getOrdersByCategory/getOrdersByCategory';

export {
  analyticsReducer,
  getOrdersByCategory,
  getMonthlyRevenueData,
  type AnalyticsSchema,
  type MonthleRevenue,
  type OrdersByCategory,
  getAnalyticsIsLoading,
  getMonthlyRevenueSelector,
  getOrdersByCategorySelector,
};
