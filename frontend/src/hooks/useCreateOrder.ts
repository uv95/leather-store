import { useAppDispatch, useAppSelector } from '../hooks';
import { addOrder, getMyOrders } from '../features/order/orderSlice';
import { IOrder } from '../types/data';
import { emptyCart } from '../features/cart/cartSlice';

export function useCreateOrder() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const createOrder = (order: IOrder) => {
    dispatch(addOrder(order))
      .unwrap()
      .then((_) => {
        dispatch(emptyCart());
        dispatch(getMyOrders(user?._id!));
      })
      .catch((error) => console.log(error, 'ERROR'));
  };

  return createOrder;
}

export default useCreateOrder;
