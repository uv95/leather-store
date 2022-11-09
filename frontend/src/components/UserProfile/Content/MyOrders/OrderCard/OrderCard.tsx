import React from 'react';
import './orderCard.scss';
import OrderDetails from '../OrderDetails/OrderDetails';

type Props = {};

const OrderCard = (props: Props) => {
  return (
    <>
      <div className="order-card">
        <div className="order-card__field">
          <p>Заказ </p>
          №429601
        </div>
        <div className="order-card__field">
          <p>Создан</p> 21.11.2022 в 13:37
        </div>
        <div className="order-card__field ">
          <div className="order-card__field-status">Принят</div>
        </div>
        <div className="order-card__field ">
          <p className="order-card__field-open">Просмотр</p>
        </div>
      </div>
      <OrderDetails />
    </>
  );
};

export default OrderCard;
