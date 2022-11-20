import React from 'react';
import './orderDetails.scss';
import Colors from '../../../UI/Colors/Colors';
import { IOrder } from '../../../../types/data';
import ChangeStatus from '../ChangeStatus/ChangeStatus';

type OrderDetailsProps = { order: IOrder };

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="orderDetails">
      <div className="orderDetails__items">
        {order.items.map((item) => (
          <div key={item._id} className="orderDetails__items__item">
            <div className="orderDetails__items__item-left">
              <img
                src={require(`../../../../assets/img/items/${item.imageCover}`)}
                alt="Фото товара"
                className="orderDetails__items__item-left-img"
              />
              <div className="orderDetails__items__item-left__info">
                <h2 className="orderDetails__items__item-left__info-title">
                  {item.name}
                </h2>
                <p>Тип кожи: {item.leather}</p>
                <Colors
                  leatherColor={item.colors.leatherColor}
                  threadsColor={item.colors.threadsColor}
                />
                <p className="orderDetails__items__item-left__info-qty">
                  Количество: {item.quantity}
                </p>
                <p className="orderDetails__items__item-left__info-qty">
                  Цена: {item.price} руб.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="orderDetails__userInfo">
        <p>
          Адрес доставки:{' '}
          <span>
            {order.address.city}, {order.address.address},
            {order.address.zipcode}
          </span>
        </p>
        <p>
          Клиент: <span>{order.user.name}</span>
        </p>
        <p>
          Контакты:{' '}
          <span>
            {order.user.email}, {order.user.phone}
          </span>
        </p>
      </div>
      <ChangeStatus currentStatus={order.status} orderId={order._id!} />
    </div>
  );
};

export default OrderDetails;
