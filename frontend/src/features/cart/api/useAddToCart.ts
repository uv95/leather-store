import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../auth';
import { addToCart, addToCartLS } from '../../../entities/Cart';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';
import { ICartItem } from '../../../types/data';

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const addItemToCart = (item: Partial<ICartItem>) => {
    if (isLoggedIn) {
      dispatch(addToCart(item))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
    if (!isLoggedIn) {
      dispatch(addToCartLS(item));
    }
  };

  return addItemToCart;
}

export default useAddToCart;
