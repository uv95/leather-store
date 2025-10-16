import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getUserAddresses,
  getUserAddressesSelector,
} from '../../entities/Address';
import {
  clearCart,
  getCartId,
  getCartItemCountSelector,
  getCartItems,
  getCartLoading,
} from '../../entities/Cart';
import { createOrder } from '../../entities/Order';
import { getIsLoggedIn } from '../../features/auth';
import {
  CartButton,
  CartItemList,
  CartOrderStatusModal,
  CheckoutAddressSection,
} from '../../features/cart';
import CartItemListSkeleton from '../../features/cart/ui/CartItemListSkeleton/CartItemListSkeleton';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import toast from '../../shared/lib/toast/toast';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';
import './cart.scss';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartId = useSelector(getCartId);
  const cartItemsCount = useSelector(getCartItemCountSelector);
  const loading = useSelector(getCartLoading);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const addresses = useSelector(getUserAddressesSelector);

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
    (addressId: string) => {
      dispatch(createOrder({ cartId, address: addressId }))
        .unwrap()
        .then((_) => {
          dispatch(clearCart({ cartId }));
        })
        .catch((error) => toast.error(error));
    },
    [dispatch, cartId]
  );

  function handleCartButton() {
    if (isSelectAddressOpen) {
      const addressId = addresses[currentAddressIndex]._id;

      handleCreateOrder(addressId);
      onOpenModal();
    } else {
      setIsSelectAddressOpen(true);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserAddresses())
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));

      cartId &&
        dispatch(getCartItems({ cartId }))
          .unwrap()
          .then()
          .catch((error: string) => toast.error(error));
    }
  }, [dispatch, isLoggedIn, cartId]);

  return (
    <>
      {isModalOpen && (
        <CartOrderStatusModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}

      <Wrapper heading="Cart">
        {loading === 'pending' && <CartItemListSkeleton />}

        {loading === 'succeeded' && cartItemsCount === 0 && (
          <p className="cart__container-empty">Cart is empty</p>
        )}

        {loading === 'succeeded' && cartItemsCount !== 0 && (
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
        )}
      </Wrapper>
    </>
  );
};

export default Cart;
