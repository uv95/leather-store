import React from 'react';
import './myOrders.scss';

type Props = {};

const MyOrders = (props: Props) => {
  return (
    <div className="orders">
      <h1 className="orders__heading">Мои заказы</h1>
      <div className="orders__container">
        <p className="orders__container-empty">Список заказов пуст.</p>
      </div>
    </div>
  );
};

export default MyOrders;
