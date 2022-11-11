import React, { useEffect } from 'react';
import './myOrders.scss';
import OrderCard from './OrderCard/OrderCard';
import useGetMyOrders from '../../../../hooks/useGetMyOrders';
import useGetMe from '../../../../hooks/useGetMe';

type Props = {};

const MyOrders = (props: Props) => {
  const { user } = useGetMe();
  const { isLoading, myOrders } = useGetMyOrders(user?._id!);

  useEffect(() => {
    console.log(myOrders, 'my orders');
  }, [myOrders]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        {!myOrders.length && (
          <p className="orders__container-empty">Список заказов пуст.</p>
        )}
        {myOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
