import React from 'react';
import './cart.scss';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/UI/Button/Button';
import useGetCart from '../../hooks/useGetCart';

type Props = {};

const Cart = (props: Props) => {
  const { cart, isLoading } = useGetCart();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="cart">
      <h1 className="cart__heading">Корзина</h1>
      <div className="cart__container">
        <div className="cart__container__order">
          <div className="cart__container__order__items">
            {(!cart || !cart.items) && <p>Корзина пуста</p>}
            {cart &&
              cart.items &&
              cart.items.map((item, i) => <CartItem key={i} item={item} />)}
          </div>
          <div className="cart__container__order__total">
            <p>{cart && cart.total} руб.</p>
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
