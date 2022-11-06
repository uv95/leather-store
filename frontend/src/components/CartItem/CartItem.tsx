import React from 'react';
import './cartItem.scss';
import { ReactComponent as Delete } from '../../assets/icons/trash.svg';
import black from '../../assets/img/black.jpg';
import { ICartItem } from '../../types/data';

type CartItemProps = { item: ICartItem };

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img
          src={require(`../../assets/img/items/${item.imageCover}`)}
          alt="Фото товара"
          className="cart-item__left-img"
        />
        <div className="cart-item__left__info">
          <h2 className="cart-item__left__info-title">{item.name}</h2>
          <p>Тип кожи: {item.leather}</p>
          <div className="cart-item__left__info__colors">
            <p>Цвет кожи:</p>
            <img src={black} alt="color" />
            <p className="cart-item__left__info__colors-threads">Цвет ниток:</p>
            <img src={black} alt="color" />
          </div>

          <div className="cart-item__left__info__qty">
            <div className="cart-item__left__info__qty__counter">
              <div className="cart-item__left__info__qty__counter-cell">-</div>
              <div className="cart-item__left__info__qty__counter-cell--num">
                1
              </div>
              <div className="cart-item__left__info__qty__counter-cell">+</div>
            </div>
            <p className="cart-item__left__info__qty-price">
              {item.price} руб.
            </p>
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
