import Back from './Back';

export default {
  title: 'shared/Back',
  component: Back,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {},
};
