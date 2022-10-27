import React from 'react';
import './cart.scss';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/UI/Button/Button';

type Props = {};

const Cart = (props: Props) => {
  return (
    <div className="cart">
      <h1 className="cart__heading">Корзина</h1>
      <div className="cart__container">
        <div className="cart__container__order">
          <div className="cart__container__order__items">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="cart__container__order__total">
            <p>Итого: 2000 руб.</p>
          </div>
        </div>
        <div className="cart__container__btn">
          <Button
            onClick={() => {}}
            text="Оформление заказа"
            color="black"
            big
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
