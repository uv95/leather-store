import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCart as fetchCart, getCartLS } from '../../../entities/Cart';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';

const useGetCart = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const getCart = useCallback(() => {
    if (isLoggedIn)
      dispatch(fetchCart())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    if (!isLoggedIn) dispatch(getCartLS());
  }, [dispatch, isLoggedIn]);

  return getCart;
};

export default useGetCart;
