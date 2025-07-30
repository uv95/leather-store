import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../auth';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';
import { IQuantity } from '../../../types/data';
import useDebounce from '../../../hooks/useDebounce';
import { changeQuantity, changeQuantityLS } from '../../../entities/Cart';

export function useChangeQuantity() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const changeItemQuantity = useDebounce(
    (cartItemId: string, quantity: IQuantity) => {
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
