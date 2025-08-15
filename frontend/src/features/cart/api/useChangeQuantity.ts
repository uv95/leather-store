import { useSelector } from 'react-redux';
import { changeQuantity, changeQuantityLS } from '../../../entities/Cart';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import useDebounce from '../../../shared/lib/hooks/useDebounce';
import toast from '../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../auth';

export function useChangeQuantity() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const changeItemQuantity = useDebounce(
    (cartItemId: string, quantity: number) => {
      if (isLoggedIn) {
        dispatch(changeQuantity({ cartItemId, dto: { quantity } }))
          .unwrap()
          .then()
          .catch((error: string) => toast.error(error));
      }
      if (!isLoggedIn) {
        dispatch(changeQuantityLS({ cartItemId, quantity }));
      }
    },
    500
  );

  return changeItemQuantity;
}

export default useChangeQuantity;
