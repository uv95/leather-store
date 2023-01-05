import React, { useCallback, useEffect } from 'react';
import './myOrders.scss';
import MyOrderDetails from './MyOrderDetails/MyOrderDetails';
import ListItem from '../../../UI/ListItem/ListItem';
import Spinner from '../../../UI/Spinner/Spinner';
import { statusStyles } from '../../../../utils/consts';
import { IOrder } from '../../../../types/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  getMyOrders,
  selectMyActiveOrders,
  selectMyFinishedOrders,
} from '../../../../features/order/orderSlice';

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
          'Создан ' +
          new Date(order.createdAt!).toLocaleDateString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
          }),
      },
      {
        dataItem: order.status,
        style: statusStyles.find((status) => status.status === order.status)
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
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        {!myOrders.length && (
          <p className="orders__container-empty">Список заказов пуст.</p>
        )}
        {myActiveOrders.length !== 0 && (
          <h1 className="orders__orders__container-heading">Активные</h1>
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
          <h1 className="orders__orders__container-heading">Выполненные</h1>
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
