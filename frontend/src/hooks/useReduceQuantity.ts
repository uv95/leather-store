import React from 'react';
import { useAppDispatch } from '../hooks';
import { reduceQuantity, reduceQuantityLS } from '../features/cart/cartSlice';
import useGetMe from './useGetMe';

export function useReduceQuantity() {
  const dispatch = useAppDispatch();
  const { user } = useGetMe();

  const reduceItemQuantity = (cartItemId: string) => {
    if (user)
      dispatch(reduceQuantity(cartItemId))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
    if (!user) dispatch(reduceQuantityLS(cartItemId));
  };

  return reduceItemQuantity;
}

export default useReduceQuantity;
