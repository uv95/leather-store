import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../features/cart/cartSlice';
import { CartItem } from '../features/cart/cartService';

export function useAddToCart() {
  const dispatch = useAppDispatch();

  const addItemToCart = (item: CartItem) => {
    dispatch(addToCart(item))
      .unwrap()
      .then((data) => console.log(data, 'addItemToCart'))
      .catch((error) => console.log(error, 'ERROR'));
  };

  return addItemToCart;
}

export default useAddToCart;
