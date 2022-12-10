import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart, addToCartLS } from '../features/cart/cartSlice';
import { ICartItem } from '../types/data';

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const addItemToCart = (item: ICartItem) => {
   if (user) {
      dispatch(addToCart(item))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
    }
    if (!user) {
      dispatch(addToCartLS(item));
    }
  };

  return addItemToCart;
}

export default useAddToCart;
