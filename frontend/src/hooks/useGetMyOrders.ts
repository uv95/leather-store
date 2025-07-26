import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getMyOrders,
  selectMyActiveOrders,
  selectMyFinishedOrders,
} from '../features/order/orderSlice';
import { Role } from '../types/data';
import toast from '../shared/lib/toast/toast';

export function useGetMyOrders() {
  const dispatch = useAppDispatch();
  const { role, user } = useAppSelector((state) => state.auth);
  const { isLoading, myOrders } = useAppSelector((state) => state.order);
  const myActiveOrders = useAppSelector(selectMyActiveOrders);
  const myFinishedOrders = useAppSelector(selectMyFinishedOrders);

  const userId = user?.data.user._id;

  useEffect(() => {
    role === Role.USER &&
      userId &&
      dispatch(getMyOrders(userId))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
  }, [dispatch, userId, role]);

  return { isLoading, myActiveOrders, myFinishedOrders, myOrders };
}

export default useGetMyOrders;
