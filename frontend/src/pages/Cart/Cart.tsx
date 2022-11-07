import React, { useState } from 'react';
import './cart.scss';
import CartItem from '../../components/Cart/CartItem/CartItem';
import SelectAddress from '../../components/Cart/SelectAddress/SelectAddress';
import Button from '../../components/UI/Button/Button';
import useGetCart from '../../hooks/useGetCart';

const Cart = () => {
  const { cart, isLoading } = useGetCart();
  const [openSelectAddress, setOpenSelectAddress] = useState(false);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="cart">
      <h1 className="cart__heading">Корзина</h1>
      <div className="cart__container">
        {(!cart || !cart.items.length) && (
          <p className="cart__container-empty">Корзина пуста</p>
        )}
        {cart && cart.items.length !== 0 && (
          <>
            <div className="cart__container__order">
              <div className="cart__container__order__items">
                {cart.items.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </div>
              <div className="cart__container__order__total">
                <p>{cart.total} руб.</p>
              </div>
            </div>
            {openSelectAddress && <SelectAddress />}
            <div className="cart__container__btn">
              <Button
                onClick={() => setOpenSelectAddress(true)}
                text={openSelectAddress ? 'Заказать' : 'Оформление заказа'}
                color="black"
                big
                animation={openSelectAddress}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
