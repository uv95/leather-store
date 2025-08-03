import { StoryContext } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { PartialStoryFn } from 'storybook/internal/csf';

export const RouterDecorator = (
  Story: PartialStoryFn,
  context: StoryContext
) => {
  const path = context.args?.path || '/';

  return (
    <MemoryRouter initialEntries={[path]}>
      <Story />
    </MemoryRouter>
  );
};
