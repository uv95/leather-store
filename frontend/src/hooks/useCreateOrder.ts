import { useAppDispatch } from '../hooks';
import { addOrder } from '../features/order/orderSlice';
import { IOrder } from '../types/data';
import { emptyCart } from '../features/cart/cartSlice';
import toast from '../lib/toast';

export function useCreateOrder() {
  const dispatch = useAppDispatch();

  const createOrder = (order: IOrder) => {
    dispatch(addOrder(order))
      .unwrap()
      .then((_) => {
        dispatch(emptyCart());
      })
      .catch((error) => toast.error(error));
  };

  return createOrder;
}

export default useCreateOrder;
