import React from 'react';
import './myOrders.scss';
import MyOrderDetails from './MyOrderDetails/MyOrderDetails';
import useGetMyOrders from '../../../../hooks/useGetMyOrders';
import useGetMe from '../../../../hooks/useGetMe';
import ListItem from '../../../UI/ListItem/ListItem';
import { statusStyles } from '../../../../utils/consts';

const MyOrders = () => {
  const { user } = useGetMe();
  const { isLoading, myOrders } = useGetMyOrders(user?._id!);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        {!myOrders.length && (
          <p className="orders__container-empty">Список заказов пуст.</p>
        )}
        {myOrders.map((order) => (
          <ListItem
            key={order._id}
            Details={<MyOrderDetails order={order} />}
            bg="white"
            data={[
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
                style: statusStyles.find(
                  (status) => status.status === order.status
                )?.style,
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
