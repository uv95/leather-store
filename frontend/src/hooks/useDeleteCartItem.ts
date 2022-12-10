import React from 'react';
import { useAppDispatch } from '../hooks';
import {
  deleteItemFromCart,
  deleteItemFromCartLS,
} from '../features/cart/cartSlice';
import useGetMe from './useGetMe';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();
  const { user } = useGetMe();

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
