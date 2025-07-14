import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectActiveOrders,
  getAllOrders,
  selectFinishedOrders,
} from '../features/order/orderSlice';
import toast from '../lib/toast';

export function useGetOrders() {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.order);
  const activeOrders = useAppSelector(selectActiveOrders);
  const finishedOrders = useAppSelector(selectFinishedOrders);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [dispatch]);

  return { isLoading, activeOrders, finishedOrders };
}

export default useGetOrders;
