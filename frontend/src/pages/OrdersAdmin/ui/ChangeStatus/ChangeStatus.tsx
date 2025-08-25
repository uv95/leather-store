import { useCallback } from 'react';
import { updateOrder } from '../../../../entities/Order';
import { OrderStatus } from '../../../../entities/Order/model/types/order';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import OrderStatusBadge from '../../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import './changeStatus.scss';

type ChangeStatusProps = { currentStatus: OrderStatus; orderId: string };

const ChangeStatus = ({ currentStatus, orderId }: ChangeStatusProps) => {
  const dispatch = useAppDispatch();

  const updateStaus = useCallback(
    (status: OrderStatus) => {
      dispatch(updateOrder({ orderId, dto: { status } }))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    },
    [dispatch, orderId]
  );

  return (
    <div className="changeStatus">
      {Object.values(OrderStatus).map((status) => (
        <OrderStatusBadge
          key={status}
          status={status}
          classNames={`${
            currentStatus !== status ? 'statusBadge-inactive' : ''
          }`}
          onClick={() => updateStaus(status)}
        />
      ))}
    </div>
  );
};

export default ChangeStatus;
