import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem/CartItem';
import SelectAddress from '../../components/Cart/SelectAddress/SelectAddress';
import Back from '../../components/UI/Back/Back';
import Button, {
  ButtonColor,
  ButtonSize,
} from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAppSelector } from '../../hooks';
import useCreateOrder from '../../hooks/useCreateOrder';
import { useGetAllAddresses } from '../../hooks/useGetAllAddresses';
import { ICartItem, IOrder, OrderStatus } from '../../types/data';
import { USER_PROFILE_ROUTE } from '../../utils/consts';
import './cart.scss';

const Cart = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, cart } = useAppSelector((state) => state.cart);
  const { isLoading: isOrderLoading, status } = useAppSelector(
    (state) => state.order
  );
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
    status: OrderStatus.AWAITING_PAYMENT,
    total: 0,
  });

  const setCart = useCallback(() => {
    if (cart && user && addresses[currentAddressIndex])
      setCartData({
        ...cartData,
        items: cart.items,
        user,
        address: addresses[currentAddressIndex],
        total: cart.total,
      });
  }, [cart, addresses, currentAddressIndex, user, cartData]);

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            isOrderLoading && cart?.items.length ? (
              <p className="cart__modal">Placing order...</p>
            ) : status === 'rejected' ? (
              <p className="cart__modal">
                An error occurred! Please reload the page and try again.
              </p>
            ) : (
              <p className="cart__modal">
                Order created! Go to{' '}
                <Link className="redLink" to={USER_PROFILE_ROUTE}>
                  your account.
                </Link>
              </p>
            )
          }
        />
      )}
      <div className="cart">
        <Back />
        <h1 className="cart__heading">Cart</h1>
        <div className="cart__container">
          {isLoading ? (
            <Spinner />
          ) : !cart || !cart.items.length ? (
            <p className="cart__container-empty">Cart is empty</p>
          ) : (
            <>
              <div className="cart__container__order">
                <div className="cart__container__order__items">
                  {cart.items.map((item: ICartItem) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
                <div className="cart__container__order__total">
                  <p>Total: {cart.total} RUB</p>
                </div>
              </div>
              {openSelectAddress && (
                <SelectAddress
                  setCurrentAddressIndex={setCurrentAddressIndex}
                  currentAddressIndex={currentAddressIndex}
                />
              )}
              <div className="cart__container__btn">
                <Button
                  onClick={() => {
                    if (openSelectAddress) {
                      createOrder(cartData);
                      setOpenModal(true);
                    } else {
                      setCart();
                      setOpenSelectAddress(true);
                    }
                  }}
                  color={ButtonColor.BLACK}
                  size={ButtonSize.L}
                  isAnimated={openSelectAddress}
                  disabled={!openSelectAddress ? false : !addresses.length}
                >
                  {openSelectAddress ? 'Order' : 'Checkout'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
