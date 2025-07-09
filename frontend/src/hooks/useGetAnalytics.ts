import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getAllOrdersByCategory,
  getMonthlyRevenueData,
} from '../features/analytics/analyticsSlice';
import { useEffect } from 'react';

export function useGetAnalytics() {
  const dispatch = useAppDispatch();
  const { monthlyRevenue, ordersByCategory, isLoading } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    if (!monthlyRevenue.length) {
      dispatch(getMonthlyRevenueData())
        .unwrap()
        .then()
        .catch((error) =>
          console.log('Error getting monthly revenue: ', error)
        );
    }
  }, [dispatch, monthlyRevenue.length]);

  useEffect(() => {
    if (!ordersByCategory.length) {
      dispatch(getAllOrdersByCategory())
        .unwrap()
        .then()
        .catch((error) =>
          console.log('Error getting orders by category: ', error)
        );
    }
  }, [dispatch, ordersByCategory.length]);

  return { monthlyRevenue, ordersByCategory, isLoading };
}

export default useGetAnalytics;
