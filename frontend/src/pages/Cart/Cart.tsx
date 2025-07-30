import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartButton from '../../components/Cart/CartButton/CartButton';
import CartLayout from '../../components/layouts/CartLayout/CartLayout';
import { createOrder } from '../../entities/Order';
import { Order, OrderStatus } from '../../entities/Order/model/types/order';
import { getUserSelector } from '../../entities/User';
import CartItemList from '../../features/cart/ui/CartItemList/CartItemList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetAllAddresses } from '../../hooks/useGetAllAddresses';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import toast from '../../shared/lib/toast/toast';
import Modal from '../../shared/ui/Modal/Modal';
import { ICartItem } from '../../types/data';
import { CheckoutAddressSection } from '../../widgets/CheckoutAddressSection';
import './cart.scss';
import {
  emptyCart,
  getCartIsLoading,
  getCartSelector,
} from '../../entities/Cart';

const Cart = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);
  const isLoading = useSelector(getCartIsLoading);
  const cart = useSelector(getCartSelector);

  const { isLoading: isOrderLoading, status } = useAppSelector(
    (state) => state.orders
  );
  const { addresses } = useGetAllAddresses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectAddressOpen, setIsSelectAddressOpen] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCreateOrder = useCallback(
    (order: Omit<Order, 'createdAt'>) => {
      dispatch(createOrder(order))
        .unwrap()
        .then((_) => {
          dispatch(emptyCart());
        })
        .catch((error) => toast.error(error));
    },
    [dispatch]
  );

  function handleCartButton() {
    if (isSelectAddressOpen && cart && user) {
      const cartData: Omit<Order, 'createdAt'> = {
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
      handleCreateOrder(cartData);
      onOpenModal();
    } else {
      setIsSelectAddressOpen(true);
    }
  }

  const isCartEmpty = !cart?.items.length;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          {isOrderLoading && !isCartEmpty ? (
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
          )}
        </Modal>
      )}

      <CartLayout isCartEmpty={isCartEmpty} isLoading={isLoading}>
        <>
          <CartItemList />
          {isSelectAddressOpen && (
            <CheckoutAddressSection
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
