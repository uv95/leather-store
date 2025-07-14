import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCart, getCartLS } from '../features/cart/cartSlice';
import toast from '../lib/toast';

const useGetCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user)
      dispatch(getCart())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    if (!user) dispatch(getCartLS());
  }, [dispatch, user]);

  return { cart };
};

export default useGetCart;
