import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getMyOrders,
  selectMyActiveOrders,
  selectMyFinishedOrders,
} from '../features/order/orderSlice';

export function useGetMyOrders(userId: string) {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);

  const { isLoading, myOrders } = useAppSelector((state) => state.order);
  const myActiveOrders = useAppSelector(selectMyActiveOrders);
  const myFinishedOrders = useAppSelector(selectMyFinishedOrders);

  useEffect(() => {
    role === 'user' &&
      userId &&
      dispatch(getMyOrders(userId))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, userId, role]);

  return { isLoading, myActiveOrders, myFinishedOrders, myOrders };
}

export default useGetMyOrders;
