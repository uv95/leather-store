import './orderStatusBadge.scss';

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

const statusClassName = {
  [OrderStatus.AWAITING_PAYMENT]: 'awaiting-payment',
  [OrderStatus.IN_PROGRESS]: 'in-progress',
  [OrderStatus.COMPLETED]: 'completed',
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <div className={`statusBadge statusBadge--${statusClassName[status]}`}>
      {status}
    </div>
  );
};

export default OrderStatusBadge;
