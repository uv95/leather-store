import { useAppDispatch } from '../hooks';
import { deleteOrder } from '../features/order/orderSlice';

export function useCancelOrder() {
  const dispatch = useAppDispatch();

  const cancelOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  return cancelOrder;
}

export default useCancelOrder;
