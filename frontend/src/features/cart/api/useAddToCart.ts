import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addToCart,
  addToCartLS,
  CartItemDto,
  getCartId,
} from '../../../entities/Cart';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const cartId = useSelector(getCartId);

  const addItemToCart = (item: CartItemDto) => {
    if (isLoggedIn) {
      dispatch(addToCart({ cartId, dto: item }))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
    if (!isLoggedIn) {
      const cartItemId = uuidv4();
      dispatch(addToCartLS({ _id: cartItemId, cart: cartId, ...item }));
    }
  };

  return addItemToCart;
}

export default useAddToCart;
