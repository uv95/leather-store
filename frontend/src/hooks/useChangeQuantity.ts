import { useAppDispatch, useAppSelector } from '../hooks';
import { changeQuantity, changeQuantityLS } from '../features/cart/cartSlice';
import { IQuantity } from '../types/data';
import useDebounce from './useDebounce';

export function useChangeQuantity() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const changeItemQuantity = useDebounce(
    (cartItemId: string, quantity: IQuantity) => {
      if (user) {
        dispatch(changeQuantity({ cartItemId, quantity }))
          .unwrap()
          .then()
          .catch((error) => console.log(error, 'ERROR'));
      }
      if (!user) {
        dispatch(changeQuantityLS({ cartItemId, ...quantity }));
      }
    },
    500
  );

  return changeItemQuantity;
}

export default useChangeQuantity;
