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
}

const OrderStatusBadge = ({ status, classNames }: OrderStatusBadgeProps) => {
  return (
    <span
      className={`statusBadge statusBadge--${statusClassName[status]} ${classNames}`}
      aria-label={`Order status: ${status}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
