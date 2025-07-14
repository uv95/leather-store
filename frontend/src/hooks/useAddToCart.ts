import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart, addToCartLS } from '../features/cart/cartSlice';
import { ICartItem } from '../types/data';
import toast from '../lib/toast';

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const addItemToCart = (item: Partial<ICartItem>) => {
    if (user) {
      dispatch(addToCart(item))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
    if (!user) {
      dispatch(addToCartLS(item));
    }
  };

  return addItemToCart;
}

export default useAddToCart;
