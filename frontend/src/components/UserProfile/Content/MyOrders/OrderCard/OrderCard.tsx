import React, { useState } from 'react';
import './orderCard.scss';
import OrderDetails from '../OrderDetails/OrderDetails';
import { IOrder } from '../../../../../types/data';

type OrderCardProps = { order: IOrder };

const OrderCard = ({ order }: OrderCardProps) => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  return (
    <>
      <div className="order-card">
        <div className="order-card__field">
          <p>ID заказа: </p>
          {order._id?.slice(0, 6)}
        </div>
        <div className="order-card__field">
          <p>Создан</p>
          <p>
            {new Date(order.createdAt!).toLocaleDateString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
        </div>
        <div className="order-card__field ">
          <div className="order-card__field-status">{order.status}</div>
        </div>
        <div className="order-card__field ">
          <p
            className="order-card__field-open"
            onClick={() => setOpenOrderDetails(!openOrderDetails)}
          >
            {openOrderDetails ? 'Закрыть' : 'Просмотр'}
          </p>
        </div>
      </div>
      {openOrderDetails && <OrderDetails order={order} />}
    </>
  );
};

export default OrderCard;
