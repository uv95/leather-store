import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../features/auth';
import { getCart, getCartLS } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import toast from '../shared/lib/toast/toast';

const useGetCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn)
      dispatch(getCart())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    if (!isLoggedIn) dispatch(getCartLS());
  }, [dispatch, isLoggedIn]);

  return { cart };
};

export default useGetCart;
