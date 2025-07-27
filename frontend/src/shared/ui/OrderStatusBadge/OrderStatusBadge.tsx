import { OrderStatus } from '../../../entities/Order/model/types/order';
import './orderStatusBadge.scss';

const statusClassName = {
  [OrderStatus.AWAITING_PAYMENT]: 'awaiting-payment',
  [OrderStatus.IN_PROGRESS]: 'in-progress',
  [OrderStatus.COMPLETED]: 'completed',
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  classNames?: string;
  onClick?: () => void;
}

const OrderStatusBadge = ({
  status,
  classNames,
  onClick,
}: OrderStatusBadgeProps) => {
  return (
    <div
      className={`statusBadge statusBadge--${statusClassName[status]} ${classNames}`}
      onClick={onClick}
    >
      {status}
    </div>
  );
};

export default OrderStatusBadge;
