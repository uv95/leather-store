import React from 'react';
import { useAppDispatch } from '../hooks';
import { reduceQuantity } from '../features/cart/cartSlice';

export function useReduceQuantity() {
  const dispatch = useAppDispatch();

  const reduceItemQuantity = (cartItemId: string) => {
    dispatch(reduceQuantity(cartItemId))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  return reduceItemQuantity;
}

export default useReduceQuantity;
