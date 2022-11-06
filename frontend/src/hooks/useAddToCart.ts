import React from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../features/cart/cartSlice';
import { ICartItem } from '../types/data';

export function useAddToCart() {
  const dispatch = useAppDispatch();

  const addItemToCart = (item: ICartItem) => {
    dispatch(addToCart(item))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  return addItemToCart;
}

export default useAddToCart;
