import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../features/auth';
import {
  deleteItemFromCart,
  deleteItemFromCartLS,
} from '../features/cart/cartSlice';
import { useAppDispatch } from '../hooks';
import toast from '../shared/lib/toast/toast';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const deleteCartItem = (cartItemId: string) => {
    if (isLoggedIn)
      dispatch(deleteItemFromCart(cartItemId))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    if (!isLoggedIn) dispatch(deleteItemFromCartLS(cartItemId));
  };

  return deleteCartItem;
}

export default useDeleteCartItem;
