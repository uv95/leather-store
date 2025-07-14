import { useAppDispatch } from '../hooks';
import { deleteOrder } from '../features/order/orderSlice';
import toast from '../lib/toast';

export function useCancelOrder() {
  const dispatch = useAppDispatch();

  const cancelOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId))
      .unwrap()
      .then(() => toast.success('Order canceled'))
      .catch((error) => toast.error(error));
  };

  return cancelOrder;
}

export default useCancelOrder;
