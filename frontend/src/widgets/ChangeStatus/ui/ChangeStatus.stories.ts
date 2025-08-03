import { OrderStatus } from '../../../entities/Order';
import ChangeStatus from './ChangeStatus';

export default {
  title: 'widgets/ChangeStatus',
  component: ChangeStatus,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    currentStatus: OrderStatus.AWAITING_PAYMENT,
  },
};
