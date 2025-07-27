import { useEffect, useState } from 'react';
import { updateOrder } from '../../../features/order/orderSlice';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';
import OrderStatusBadge from '../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import './changeStatus.scss';
import { OrderStatus } from '../../../entities/Order/model/types/order';

type ChangeStatusProps = { currentStatus: OrderStatus; orderId: string };

const ChangeStatus = ({ currentStatus, orderId }: ChangeStatusProps) => {
  const dispatch = useAppDispatch();
  const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus);

  useEffect(() => {
    dispatch(updateOrder({ orderId, updatedOrder: { status: newStatus } }))
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [newStatus, dispatch, orderId]);

  return (
    <div className="changeStatus">
      {Object.values(OrderStatus).map((status) => (
        <OrderStatusBadge
          key={status}
          status={status}
          classNames={`${
            currentStatus !== status ? 'statusBadge-inactive' : ''
          }`}
          onClick={() => setNewStatus(status)}
        />
      ))}
    </div>
  );
};

export default ChangeStatus;
