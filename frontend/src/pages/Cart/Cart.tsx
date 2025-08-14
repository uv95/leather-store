import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllAddresses,
  getAllAddressesSelector,
} from '../../entities/Address';
import {
  clearCart,
  getCartId,
  getCartItemCountSelector,
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
import Back from '../../shared/ui/Back/Back';
import './cart.scss';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartId = useSelector(getCartId);
  const cartItemsCount = useSelector(getCartItemCountSelector);
  const loading = useSelector(getCartLoading);
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
      dispatch(getAllAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      {isModalOpen && (
        <CartOrderStatusModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}

      <div className="cart">
        <Back />
        <h1 className="cart__heading">Cart</h1>
        <div className="cart__container">
          {loading === 'pending' && <CartItemListSkeleton />}

          {loading === 'succeeded' && !cartItemsCount && (
            <p className="cart__container-empty">Cart is empty</p>
          )}

          {loading === 'succeeded' && cartItemsCount && (
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
        </div>
      </div>
    </>
  );
};

export default Cart;
