import ConfirmationModal from './ConfirmationModal';
import { fn } from 'storybook/test';

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
    title: 'Are you sure you want to cancel the order?',
    confirmAction: fn(),
    onClose: fn(),
    buttonTexts: {
      yes: 'Yes',
      no: 'No',
    }
  }
};
