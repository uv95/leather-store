import React from 'react';
import './orderDetails.scss';
import black from '../../../../../assets/img/black.jpg';
import Colors from '../../../../UI/Colors/Colors';
import Button from '../../../../UI/Button/Button';

type Props = {};

const OrderDetails = (props: Props) => {
  return (
    <div className="orderDetails">
      <div className="orderDetails__item">
        <div className="orderDetails__item-left">
          {/* <img
            src={require(`../../../assets/img/items/${item.imageCover}`)}
            alt="Фото товара"
            className="orderDetails__item-left-img"
          /> */}
          <div className="orderDetails__item-left__info">
            <h2 className="orderDetails__item-left__info-title">{'Wallet'}</h2>
            <p>Тип кожи: {''}</p>
            <Colors leatherColor={black} threadsColor={black} />
            <p className="orderDetails__item-left__info-qty">Количество: 1</p>
          </div>
        </div>
        <div className="orderDetails__item-right">1500 rub</div>
      </div>
      <div className="orderDetails__bottom">
        <div className="orderDetails__bottom-total">
          <p>Итого: 2000руб.</p>
        </div>
        <div className="orderDetails__bottom-btns">
          <Button text="Отменить заказ" color="gray" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
