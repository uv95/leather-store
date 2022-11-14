import React from 'react';
import './myOrders.scss';
import MyOrderDetails from './MyOrderDetails/MyOrderDetails';
import useGetMyOrders from '../../../../hooks/useGetMyOrders';
import useGetMe from '../../../../hooks/useGetMe';
import ListItem from '../../../UI/ListItem/ListItem';
import { statusStyles } from '../../../../utils/consts';
import { IOrder } from '../../../../types/data';

const MyOrders = () => {
  const { user } = useGetMe();
  const { isLoading, myActiveOrders, myFinishedOrders, myOrders } =
    useGetMyOrders(user?._id!);

  const orderData = (order: IOrder) => [
    { dataItem: '№ ' + order._id?.slice(0, 6) },
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

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        {!myOrders.length && (
          <p className="orders__container-empty">Список заказов пуст.</p>
        )}
        <h1 className="orders__orders__container-heading">Активные</h1>
        {myActiveOrders.map((order) => (
          <ListItem
            key={order._id}
            Details={<MyOrderDetails order={order} />}
            bg="white"
            data={orderData(order)}
          />
        ))}
        <h1 className="orders__orders__container-heading">Выполненные</h1>
        {myFinishedOrders.map((order) => (
          <ListItem
            key={order._id}
            Details={<MyOrderDetails order={order} />}
            bg="white"
            data={orderData(order)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
