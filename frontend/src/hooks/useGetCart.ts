import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCart, getCartLS } from '../features/cart/cartSlice';

const useGetCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user)
      dispatch(getCart())
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
    if (!user) dispatch(getCartLS());
  }, [dispatch, user]);

  return { cart };
};

export default useGetCart;
