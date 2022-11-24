import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCart } from '../features/cart/cartSlice';

export function useGetCart() {
  const dispatch = useAppDispatch();

  const { isLoading, cart } = useAppSelector((state) => state.cart);
  const role = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    role !== '' &&
      dispatch(getCart())
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, role]);

  return { isLoading, cart };
}

export default useGetCart;
