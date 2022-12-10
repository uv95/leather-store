import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectActiveOrders,
  getAllOrders,
  selectFinishedOrders,
} from '../features/order/orderSlice';

export function useGetOrders() {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.order);
  const activeOrders = useAppSelector(selectActiveOrders);
  const finishedOrders = useAppSelector(selectFinishedOrders);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, activeOrders, finishedOrders };
}

export default useGetOrders;
