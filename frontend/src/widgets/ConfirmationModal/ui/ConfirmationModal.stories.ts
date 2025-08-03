import ConfirmationModal from './ConfirmationModal';
import { action } from 'storybook/actions';

export default {
  title: 'widgets/ConfirmationModal',
  component: ConfirmationModal,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    isOpen: true,
    text: 'Are you sure you want to cancel the order?',
    confirmAction: action('confirmAction'),
    onClose: action('onClose'),
  },
};
