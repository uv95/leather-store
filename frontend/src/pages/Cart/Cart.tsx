import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../../components/Cart/CartButton/CartButton';
import CartItem from '../../components/Cart/CartItem/CartItem';
import SelectAddress from '../../components/Cart/SelectAddress/SelectAddress';
import CartLayout from '../../components/layouts/CartLayout/CartLayout';
import { useAppSelector } from '../../hooks';
import useCreateOrder from '../../hooks/useCreateOrder';
import { useGetAllAddresses } from '../../hooks/useGetAllAddresses';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import Modal from '../../shared/ui/Modal/Modal';
import { ICartItem, OrderStatus } from '../../types/data';
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
  const [isSelectAddressOpen, setIsSelectAddressOpen] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  function handleCartButton() {
    if (isSelectAddressOpen && cart) {
      const cartData = {
        items: cart.items.map((cartItem: ICartItem) => ({
          name: cartItem.item.name,
          colors: cartItem.colors,
          quantity: cartItem.quantity,
          total: cartItem.total as number,
          leather: cartItem.leather,
          imageCover: cartItem.item.imageCover.url,
          price: cartItem.item.price,
          type: cartItem.item.type,
        })),
        user,
        address: addresses[currentAddressIndex],
        status: OrderStatus.AWAITING_PAYMENT,
        total: cart.total,
      };
      createOrder(cartData);
      setOpenModal(true);
    } else {
      setIsSelectAddressOpen(true);
    }
  }

  const isCartEmpty = !cart?.items.length;

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            isOrderLoading && !isCartEmpty ? (
              <p className="cart__modal">Placing order...</p>
            ) : status === 'rejected' ? (
              <p className="cart__modal">
                An error occurred! Please reload the page and try again.
              </p>
            ) : (
              <p className="cart__modal">
                Order created! Go to{' '}
                <Link className="redLink" to={RoutePath.USER_PROFILE}>
                  your account.
                </Link>
              </p>
            )
          }
        />
      )}

      <CartLayout isCartEmpty={isCartEmpty} isLoading={isLoading}>
        <>
          <div className="cart__container__order">
            <div className="cart__container__order__items">
              {cart?.items.map((item: ICartItem) => {
                const key =
                  item.item.name + item.leather + JSON.stringify(item.colors);
                return <CartItem key={key} item={item} />;
              })}
            </div>
            <div className="cart__container__order__total">
              <p>Total: ${cart?.total}</p>
            </div>
          </div>
          {isSelectAddressOpen && (
            <SelectAddress
              setCurrentAddressIndex={setCurrentAddressIndex}
              currentAddressIndex={currentAddressIndex}
            />
          )}
          <CartButton
            addressNum={addresses.length}
            isSelectAddressOpen={isSelectAddressOpen}
            onClick={handleCartButton}
          />
        </>
      </CartLayout>
    </>
  );
};

export default Cart;
