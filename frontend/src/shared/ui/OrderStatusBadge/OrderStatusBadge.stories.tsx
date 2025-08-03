import { OrderStatus } from '../../../entities/Order';
import OrderStatusBadge from './OrderStatusBadge';

export default {
  title: 'shared/OrderStatusBadge',
  component: OrderStatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const AwaitingPayment = {
  args: {
    status: OrderStatus.AWAITING_PAYMENT,
  },
};

export const InProgress = {
  args: {
    status: OrderStatus.IN_PROGRESS,
  },
};

export const Completed = {
  args: {
    status: OrderStatus.COMPLETED,
  },
};
