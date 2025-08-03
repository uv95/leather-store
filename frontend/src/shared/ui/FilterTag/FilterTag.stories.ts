import FilterTag from './FilterTag';

export default {
  title: 'shared/FilterTag',
  component: FilterTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    filter: 'FilterTag',
  },
};
