import { useEffect } from 'react';
import {
  getMyOrders,
  selectMyActiveOrders,
  selectMyFinishedOrders,
} from '../../../../features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { MyOrderListItem } from '../../../../widgets/MyOrderListItem';
import './myOrders.scss';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { isLoading, myOrders } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const myActiveOrders = useAppSelector(selectMyActiveOrders);
  const myFinishedOrders = useAppSelector(selectMyFinishedOrders);

  useEffect(() => {
    if (myOrders.some((order) => typeof order.address === 'string'))
      dispatch(getMyOrders(user._id))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
  }, [dispatch, user, myOrders]);

  if (isLoading) return <Spinner />;

  return (
    <div className="my-orders">
      <h1 className="my-orders__heading">My Orders</h1>
      <div className="my-orders__container">
        {!myOrders.length && (
          <p className="my-orders__container-empty">Order list is empty.</p>
        )}
        {myActiveOrders.length !== 0 && (
          <h1 className="my-orders__orders__container-heading">Active</h1>
        )}
        {myActiveOrders.map((order) => (
          <MyOrderListItem key={order._id} order={order} />
        ))}
        {myFinishedOrders.length !== 0 && (
          <h1 className="my-orders__orders__container-heading">Completed</h1>
        )}
        {myFinishedOrders.map((order) => (
          <MyOrderListItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
