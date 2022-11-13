import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMyOrders } from '../features/order/orderSlice';

export function useGetMyOrders(userId: string) {
  const dispatch = useAppDispatch();

  const { isLoading, myOrders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders(userId))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, userId]);

  return { isLoading, myOrders };
}

export default useGetMyOrders;
