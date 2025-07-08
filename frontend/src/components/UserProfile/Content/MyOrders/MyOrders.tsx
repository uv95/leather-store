import { useCallback, useEffect } from 'react';
import {
  getMyOrders,
  selectMyActiveOrders,
  selectMyFinishedOrders,
} from '../../../../features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IOrder } from '../../../../types/data';
import { orderStatuses } from '../../../../utils/consts';
import ListItem from '../../../UI/ListItem/ListItem';
import Spinner from '../../../UI/Spinner/Spinner';
import MyOrderDetails from './MyOrderDetails/MyOrderDetails';
import './myOrders.scss';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { isLoading, myOrders } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const myActiveOrders = useAppSelector(selectMyActiveOrders);
  const myFinishedOrders = useAppSelector(selectMyFinishedOrders);

  const orderData = useCallback((order: IOrder) => {
    return [
      { dataItem: '№ ' + order._id?.slice(0, 8) },
      {
        dataItem:
          'Created ' +
          new Date(order.createdAt!).toLocaleDateString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
          }),
      },
      {
        dataItem: order.status,
        style: orderStatuses.find(({ status }) => status === order.status)
          ?.style,
      },
    ];
  }, []);

  useEffect(() => {
    if (myOrders.some((order) => typeof order.address === 'string'))
      dispatch(getMyOrders(user._id))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
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
          <ListItem
            key={order._id}
            Details={<MyOrderDetails order={order} />}
            bg="white"
            data={orderData(order)}
            myOrder
          />
        ))}
        {myFinishedOrders.length !== 0 && (
          <h1 className="my-orders__orders__container-heading">Completed</h1>
        )}
        {myFinishedOrders.map((order) => (
          <ListItem
            key={order._id}
            Details={<MyOrderDetails order={order} />}
            bg="white"
            data={orderData(order)}
            myOrder
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
