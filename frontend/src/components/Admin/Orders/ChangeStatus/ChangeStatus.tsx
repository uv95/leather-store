import React, { useState, useEffect } from 'react';
import './changeStatus.scss';
import { statusStyles } from '../../../../utils/consts';
import { useAppDispatch } from '../../../../hooks';
import { updateOrder } from '../../../../features/order/orderSlice';
import { IOrder } from '../../../../types/data';

type ChangeStatusProps = { currentStatus: string; orderId: string };

const ChangeStatus = ({ currentStatus, orderId }: ChangeStatusProps) => {
  const dispatch = useAppDispatch();

  const [newStatus, setNewStatus] = useState<Partial<IOrder>>({
    status: '',
  });

  useEffect(() => {
    newStatus.status &&
      dispatch(updateOrder({ orderId, updatedOrder: newStatus }))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [newStatus, dispatch, orderId]);

  return (
    <div className="changeStatus">
      {statusStyles.map((el) => (
        <div
          key={el.status}
          className={`${el.style} ${
            currentStatus === el.status ? 'status-active' : 'status-inactive'
          }`}
          onClick={() => setNewStatus({ status: el.status })}
        >
          {el.status}
        </div>
      ))}
    </div>
  );
};

export default ChangeStatus;
