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

  // const getAllMyOrders = (userId: string) =>
  //   dispatch(getMyOrders(userId))
  //     .unwrap()
  //     .then((data) => console.log('get amy orders', data))
  //     .catch((error) => console.log(error, 'ERROR'));

  return { isLoading, myOrders };
}

export default useGetMyOrders;
