import React from 'react';
import './orders.scss';
import useGetOrders from '../../../hooks/useGetOrders';
import ListItem from '../../UI/ListItem/ListItem';
import OrderDetails from './OrderDetails/OrderDetails';
import { statusStyles } from '../../../utils/consts';

type Props = {};

const Orders = (props: Props) => {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="orders">
      {orders.map((order) => (
        <ListItem
          key={order._id}
          Details={<OrderDetails order={order} />}
          bg="grey"
          data={[
            {
              dataItem: new Date(order.createdAt!).toLocaleDateString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric',
              }),
            },
            { dataItem: order.user.name },
            { dataItem: order.address.city },
            { dataItem: order.total + ' руб.' },
            {
              dataItem: order.status,
              style: statusStyles.find(
                (status) => status.status === order.status
              )?.style,
            },
          ]}
        />
      ))}
    </div>
  );
};

export default Orders;
