import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCart, getCartLS } from '../features/cart/cartSlice';

export function useGetCart() {
  const dispatch = useAppDispatch();
  const { isLoading, cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user)
      dispatch(getCart())
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
    if (!user) dispatch(getCartLS());
  }, [dispatch, user]);

  return { isLoading, cart };
}

export default useGetCart;
