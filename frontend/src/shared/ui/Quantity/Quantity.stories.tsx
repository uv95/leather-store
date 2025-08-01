import { useState } from 'react';
import Quantity from './Quantity';

export default {
  title: 'shared/Quantity',
  component: Quantity,
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
    const [quantity, setQuantuty] = useState(1);

    return (
      <Quantity
        quantity={quantity}
        onDecrement={() => setQuantuty((prev) => (prev > 1 ? prev - 1 : prev))}
        onIncrement={() => setQuantuty((prev) => prev + 1)}
      />
    );
  },
};
