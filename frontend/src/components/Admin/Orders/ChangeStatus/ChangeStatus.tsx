import { useEffect, useState } from 'react';
import { updateOrder } from '../../../../features/order/orderSlice';
import { useAppDispatch } from '../../../../hooks';
import { OrderStatus } from '../../../../types/data';
import { orderStatuses } from '../../../../utils/consts';
import './changeStatus.scss';

type ChangeStatusProps = { currentStatus: OrderStatus; orderId: string };

const ChangeStatus = ({ currentStatus, orderId }: ChangeStatusProps) => {
  const dispatch = useAppDispatch();

  const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus);

  useEffect(() => {
    dispatch(updateOrder({ orderId, updatedOrder: { status: newStatus } }))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [newStatus, dispatch, orderId]);

  return (
    <div className="changeStatus">
      {orderStatuses.map(({ status, style }) => (
        <div
          key={status}
          className={`${style} ${
            currentStatus === status ? 'status-active' : 'status-inactive'
          }`}
          onClick={() => setNewStatus(status)}
        >
          {status}
        </div>
      ))}
    </div>
  );
};

export default ChangeStatus;
