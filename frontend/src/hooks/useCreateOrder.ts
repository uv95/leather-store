import { useAppDispatch } from '../hooks';
import { addOrder } from '../features/order/orderSlice';
import { IOrder } from '../types/data';
import { emptyCart } from '../features/cart/cartSlice';

export function useCreateOrder() {
  const dispatch = useAppDispatch();

  const createOrder = (order: IOrder) => {
    dispatch(addOrder(order))
      .unwrap()
      .then((_) => {
        dispatch(emptyCart());
      })
      .catch((error) => console.log(error, 'ERROR'));
  };

  return createOrder;
}

export default useCreateOrder;
