import { useSelector } from 'react-redux';
import { addToCart, addToCartLS, CartItem } from '../../../entities/Cart';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

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
