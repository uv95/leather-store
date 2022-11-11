import React, { useState, useEffect } from 'react';
import './cart.scss';
import CartItem from '../../components/Cart/CartItem/CartItem';
import SelectAddress from '../../components/Cart/SelectAddress/SelectAddress';
import Button from '../../components/UI/Button/Button';
import useGetCart from '../../hooks/useGetCart';
import { useGetAllAddresses } from '../../hooks/useGetAllAddresses';
import { IOrder } from '../../types/data';
import useCreateOrder from '../../hooks/useCreateOrder';

const Cart = () => {
  const { cart, isLoading } = useGetCart();
  const { addresses } = useGetAllAddresses();
  const createOrder = useCreateOrder();

  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  const [cartData, setCartData] = useState<IOrder>({
    items: [],
    user: '',
    addressId: '',
    status: '',
    total: 0,
  });

  useEffect(() => {
    if (cart && addresses[currentAddressIndex])
      setCartData({
        items: cart.items,
        user: cart.user,
        addressId: addresses[currentAddressIndex]._id!,
        status: 'Ожидает оплаты',
        total: cart.total,
      });
  }, [cart, addresses, currentAddressIndex]);

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
                <p>Итого: {cart.total} руб.</p>
              </div>
            </div>
            {openSelectAddress && (
              <SelectAddress
                setCurrentAddressIndex={setCurrentAddressIndex}
                currentAddressIndex={currentAddressIndex}
                addresses={addresses}
              />
            )}
            <div className="cart__container__btn">
              <Button
                onClick={() => {
                  openSelectAddress
                    ? createOrder(cartData)
                    : setOpenSelectAddress(true);
                }}
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
