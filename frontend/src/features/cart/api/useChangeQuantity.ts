import { useSelector } from 'react-redux';
import {
  changeQuantity,
  changeQuantityLS,
  Quantity,
} from '../../../entities/Cart';
import { useAppDispatch } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';

export function useChangeQuantity() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const changeItemQuantity = useDebounce(
    (cartItemId: string, quantity: Quantity) => {
      if (isLoggedIn) {
        dispatch(changeQuantity({ cartItemId, quantity }))
          .unwrap()
          .then()
          .catch((error: string) => toast.error(error));
      }
      if (!isLoggedIn) {
        dispatch(changeQuantityLS({ cartItemId, ...quantity }));
      }
    },
    500
  );

  return changeItemQuantity;
}

export default useChangeQuantity;
