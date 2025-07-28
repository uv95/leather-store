import { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getOrderIsLoading,
  getUserActiveOrders,
  getUserCompletedOrders,
  getUserOrders,
} from '../../../../entities/Order';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { MyOrderListItem } from '../../../../widgets/MyOrderListItem';
import './myOrders.scss';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getOrderIsLoading);
  const userActiveOrders = useSelector(getUserActiveOrders);
  const userCompletedOrders = useSelector(getUserCompletedOrders);
  const { user } = useAppSelector((state) => state.auth);

  const userOrders = useMemo(
    () => [...userActiveOrders, ...userCompletedOrders],
    [userActiveOrders, userCompletedOrders]
  );

  useEffect(() => {
    if (userOrders.some((order) => typeof order.address === 'string'))
      dispatch(getUserOrders(user._id))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
  }, [dispatch, user, userOrders]);

  if (isLoading) return <Spinner />;

  return (
    <div className="my-orders">
      <h1 className="my-orders__heading">My Orders</h1>
      <div className="my-orders__container">
        {!userOrders.length && (
          <p className="my-orders__container-empty">Order list is empty.</p>
        )}
        {userActiveOrders.length !== 0 && (
          <h1 className="my-orders__orders__container-heading">Active</h1>
        )}
        {userActiveOrders.map((order) => (
          <MyOrderListItem key={order._id} order={order} />
        ))}
        {userCompletedOrders.length !== 0 && (
          <h1 className="my-orders__orders__container-heading">Completed</h1>
        )}
        {userCompletedOrders.map((order) => (
          <MyOrderListItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default memo(MyOrders);
