import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllAddresses,
  getAllAddressesSelector,
} from '../../entities/Address';
import { CartItem, emptyCart, getCartSelector } from '../../entities/Cart';
import { createOrder } from '../../entities/Order';
import { Order, OrderStatus } from '../../entities/Order/model/types/order';
import { getUserSelector } from '../../entities/User';
import { getIsLoggedIn } from '../../features/auth';
import {
  CartButton,
  CartItemList,
  CartLayout,
  CartOrderStatusModal,
  CheckoutAddressSection,
} from '../../features/cart';
import toast from '../../shared/lib/toast/toast';
import './cart.scss';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';

const Cart = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);
  const cart = useSelector(getCartSelector);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const addresses = useSelector(getAllAddressesSelector);

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
        items: cart.items.map((cartItem: CartItem) => ({
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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      {isModalOpen && (
        <CartOrderStatusModal
          // isCartEmpty={isCartEmpty}
          isOpen={isModalOpen}
          onClose={onCloseModal}
        />
      )}

      <CartLayout isCartEmpty={isCartEmpty}>
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
