import React, { useState, useEffect } from 'react';
import './cart.scss';
import { Link } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem/CartItem';
import SelectAddress from '../../components/Cart/SelectAddress/SelectAddress';
import Button from '../../components/UI/Button/Button';
import useGetCart from '../../hooks/useGetCart';
import useCreateOrder from '../../hooks/useCreateOrder';
import Back from '../../components/UI/Back/Back';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ICartItem, IOrder } from '../../types/data';
import { USER_PROFILE_ROUTE } from '../../utils/consts';
import { useAppSelector } from '../../hooks';
import { useGetAllAddresses } from '../../hooks/useGetAllAddresses';

const Cart = () => {
  const { user } = useAppSelector((state) => state.user);
  const { cart, isLoading } = useGetCart();
  const { addresses } = useGetAllAddresses();
  const createOrder = useCreateOrder();

  const [openModal, setOpenModal] = useState(false);
  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const [cartData, setCartData] = useState<IOrder>({
    items: [],
    user: {
      name: '',
      email: '',
      phone: '',
    },
    address: {
      city: '',
      address: '',
      zipcode: '',
    },
    status: '',
    total: 0,
  });

  useEffect(() => {
    if (cart && user && addresses[currentAddressIndex])
      setCartData({
        items: cart.items,
        user,
        address: addresses[currentAddressIndex],
        status: 'Ожидает оплаты',
        total: cart.total,
      });
  }, [cart, addresses, currentAddressIndex, user]);

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            <p className="cart__modal">
              Заказ создан! Перейти в{' '}
              <Link className="redLink" to={USER_PROFILE_ROUTE}>
                личный кабинет.
              </Link>
            </p>
          }
        />
      )}
      <div className="cart">
        <Back />
        <h1 className="cart__heading">Корзина</h1>
        <div className="cart__container">
          {isLoading ? (
            <Spinner />
          ) : !cart || !cart.items.length ? (
            <p className="cart__container-empty">Корзина пуста</p>
          ) : (
            <>
              <div className="cart__container__order">
                <div className="cart__container__order__items">
                  {cart.items.map((item: ICartItem, i: number) => (
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
                    if (openSelectAddress) {
                      createOrder(cartData);
                      setOpenModal(true);
                    } else setOpenSelectAddress(true);
                  }}
                  text={openSelectAddress ? 'Заказать' : 'Оформление заказа'}
                  color="black"
                  big
                  animation={openSelectAddress}
                  disabled={
                    !openSelectAddress ? false : addresses.length ? false : true
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
