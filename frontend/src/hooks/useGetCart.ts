import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCart } from '../features/cart/cartSlice';

export function useGetCart() {
  const dispatch = useAppDispatch();

  const { isLoading, cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, cart };
}

export default useGetCart;
