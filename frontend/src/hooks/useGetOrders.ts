import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllOrders } from '../features/order/orderSlice';

export function useGetOrders() {
  const dispatch = useAppDispatch();

  const { isLoading, orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, orders };
}

export default useGetOrders;
