import { useAppDispatch, useAppSelector } from '../hooks';
import {
  deleteItemFromCart,
  deleteItemFromCartLS,
} from '../features/cart/cartSlice';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const deleteCartItem = (cartItemId: string) => {
    if (user)
      dispatch(deleteItemFromCart(cartItemId))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
    if (!user) dispatch(deleteItemFromCartLS(cartItemId));
  };

  return deleteCartItem;
}

export default useDeleteCartItem;
