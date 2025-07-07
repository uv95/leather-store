import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getAllOrdersByCategory,
  getMonthlyRevenueData,
} from '../features/analytics/analyticsSlice';
import { useEffect } from 'react';

export function useGetAnalytics() {
  const dispatch = useAppDispatch();
  const { monthlyRevenue, ordersByCategory } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    if (!monthlyRevenue) {
      dispatch(getMonthlyRevenueData())
        .unwrap()
        .then()
        .catch((error) =>
          console.log('Error getting monthly revenue: ', error)
        );
    }
  }, [dispatch, monthlyRevenue]);

  useEffect(() => {
    if (!ordersByCategory) {
      dispatch(getAllOrdersByCategory())
        .unwrap()
        .then()
        .catch((error) =>
          console.log('Error getting orders by category: ', error)
        );
    }
  }, [dispatch, ordersByCategory]);

  return { monthlyRevenue, ordersByCategory };
}

export default useGetAnalytics;
