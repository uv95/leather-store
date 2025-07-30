import { useSelector } from 'react-redux';
import { addToCart, addToCartLS, CartItem } from '../../../entities/Cart';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const addItemToCart = (item: Partial<CartItem>) => {
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
