import React from 'react';
import './cartItem.scss';
import { ReactComponent as Delete } from '../../assets/icons/trash.svg';
import wallet from '../../assets/img/wallet-1.jpg';
import black from '../../assets/img/black.jpg';

type Props = {};

const CartItem = (props: Props) => {
  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img src={wallet} alt="" className="cart-item__left-img" />
        <div className="cart-item__left__info">
          <h2 className="cart-item__left__info-title">Кожаный кошелек</h2>
          <p>Тип кожи: Crazy Horse</p>
          <div className="cart-item__left__info__colors">
            <p>Цвет кожи:</p>
            <img src={black} alt="" />
            <p className="cart-item__left__info__colors-threads">Цвет ниток:</p>
            <img src={black} alt="" />
          </div>

          <div className="cart-item__left__info__qty">
            <div className="cart-item__left__info__qty__counter">
              <div className="cart-item__left__info__qty__counter-cell">-</div>
              <div className="cart-item__left__info__qty__counter-cell--num">
                1
              </div>
              <div className="cart-item__left__info__qty__counter-cell">+</div>
            </div>
            <p className="cart-item__left__info__qty-price">1200 руб.</p>
          </div>
        </div>
      </div>
      <div className="cart-item__right">
        <div className="cart-item__right-remove">
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
