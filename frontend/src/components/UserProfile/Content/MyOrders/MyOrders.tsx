import React from 'react';
import './myOrders.scss';
import OrderCard from './OrderCard/OrderCard';

type Props = {};

const MyOrders = (props: Props) => {
  console.log(Math.round(Math.random() * 1000000));
  return (
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        <p className="orders__container-empty">Список заказов пуст.</p>
        <OrderCard />
      </div>
    </div>
  );
};

export default MyOrders;
