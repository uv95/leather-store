import React from 'react';
import { useAppDispatch } from '../hooks';
import { deleteItemFromCart } from '../features/cart/cartSlice';

export function useDeleteCartItem() {
  const dispatch = useAppDispatch();

  const deleteCartItem = (cartItemId: string) => {
    dispatch(deleteItemFromCart(cartItemId))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  return deleteCartItem;
}

export default useDeleteCartItem;
