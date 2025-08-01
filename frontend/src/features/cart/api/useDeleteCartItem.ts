import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../auth';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../shared/lib/toast/toast';
import {
  deleteItemFromCart,
  deleteItemFromCartLS,
} from '../../../entities/Cart';
import { useCallback } from 'react';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const deleteCartItem = useCallback(
    (cartItemId: string) => {
      if (isLoggedIn)
        dispatch(deleteItemFromCart(cartItemId))
          .unwrap()
          .then()
          .catch((error) => toast.error(error));
      if (!isLoggedIn) dispatch(deleteItemFromCartLS(cartItemId));
    },
    [dispatch, isLoggedIn]
  );

  return deleteCartItem;
}

export default useDeleteCartItem;
