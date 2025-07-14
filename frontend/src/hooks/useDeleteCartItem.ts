import { useAppDispatch, useAppSelector } from '../hooks';
import {
  deleteItemFromCart,
  deleteItemFromCartLS,
} from '../features/cart/cartSlice';
import toast from '../lib/toast';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const deleteCartItem = (cartItemId: string) => {
    if (user)
      dispatch(deleteItemFromCart(cartItemId))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    if (!user) dispatch(deleteItemFromCartLS(cartItemId));
  };

  return deleteCartItem;
}

export default useDeleteCartItem;
