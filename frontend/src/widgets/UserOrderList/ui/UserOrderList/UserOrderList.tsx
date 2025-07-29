import { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getOrderIsLoading,
  getUserActiveOrders,
  getUserCompletedOrders,
  getUserOrders,
} from '../../../../entities/Order';
import { getUserSelector } from '../../../../entities/User';
import { useAppDispatch } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import UserOrderListItem from '../UserOrderListItem/UserOrderListItem';
import './userOrderList.scss';

const UserOrderList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getOrderIsLoading);
  const userActiveOrders = useSelector(getUserActiveOrders);
  const userCompletedOrders = useSelector(getUserCompletedOrders);
  const user = useSelector(getUserSelector);

  const userOrders = useMemo(
    () => [...userActiveOrders, ...userCompletedOrders],
    [userActiveOrders, userCompletedOrders]
  );

  useEffect(() => {
    if (userOrders.some((order) => typeof order.address === 'string') && user)
      dispatch(getUserOrders(user._id))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
  }, [dispatch, user, userOrders]);

  if (isLoading) return <Spinner />;

  return (
    <div className="userOrderList">
      <h1 className="userOrderList-title">My Orders</h1>
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
    </div>
  );
};

export default memo(UserOrderList);
