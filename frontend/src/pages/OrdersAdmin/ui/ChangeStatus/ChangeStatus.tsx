import { useCallback } from 'react';
import { updateOrder } from '../../../../entities/Order';
import { OrderStatus } from '../../../../entities/Order/model/types/order';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import OrderStatusBadge from '../../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import './changeStatus.scss';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';

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
    [dispatch, orderId],
  );

  return (
    <div className="changeStatus" role="group" aria-label="Change order status">
      {Object.values(OrderStatus).map((status) => (
        <Button
          key={status}
          onClick={() => updateStaus(status)}
          theme={ButtonTheme.CLEAR}
          aria-label={`Set status to: ${status}`}
        >
          <OrderStatusBadge
            status={status}
            classNames={`${
              currentStatus !== status ? 'statusBadge-inactive' : ''
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default ChangeStatus;
