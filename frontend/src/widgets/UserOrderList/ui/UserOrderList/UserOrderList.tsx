import { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getOrderLoading,
  getUserActiveOrders,
  getUserCompletedOrders,
  getUserOrders,
} from '../../../../entities/Order';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import UserOrderListItem from '../UserOrderListItem/UserOrderListItem';
import UserOrderListSkeleton from '../UserOrderListSkeleton/UserOrderListSkeleton';
import './userOrderList.scss';

const UserOrderList = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getOrderLoading);
  const userActiveOrders = useSelector(getUserActiveOrders);
  const userCompletedOrders = useSelector(getUserCompletedOrders);

  const userOrders = useMemo(
    () => [...userActiveOrders, ...userCompletedOrders],
    [userActiveOrders, userCompletedOrders]
  );

  useEffect(() => {
    if (!userOrders.length) {
      dispatch(getUserOrders())
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
  }, [dispatch, userOrders.length]);

  return (
    <div className="userOrderList">
      <h1 className="userOrderList-title">My Orders</h1>

      {loading === 'pending' && <UserOrderListSkeleton />}

      {loading === 'succeeded' && (
        <div className="userOrderList-container">
          {!userOrders.length && (
            <p className="userOrderList-empty">Order list is empty.</p>
          )}

          {userActiveOrders.length !== 0 && (
            <h2 className="userOrderList__section-title">Active</h2>
          )}

          {userActiveOrders.map((order) => (
            <UserOrderListItem key={order._id} order={order} />
          ))}

          {userCompletedOrders.length !== 0 && (
            <h2 className="userOrderList__section-title">Completed</h2>
          )}

          {userCompletedOrders.map((order) => (
            <UserOrderListItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(UserOrderList);
