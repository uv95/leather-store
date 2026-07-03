import { MemoryRouter } from 'react-router-dom';
import type { Decorator } from '@storybook/react';


export const RouterDecorator: Decorator = (
  Story,
  context
) => {
  const path = context.args?.path || '/';

  return (
    <MemoryRouter initialEntries={[path]}>
      <Story />
    </MemoryRouter>
  );
};
