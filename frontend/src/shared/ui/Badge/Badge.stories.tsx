import Badge from './Badge';

export default {
  title: 'shared/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  render: () => {
    return (
      <div style={{ position: 'relative' }}>
        <Badge value={2} />
      </div>
    );
  },
};
