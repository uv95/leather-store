import { BrowserRouter } from 'react-router-dom';
import { PartialStoryFn } from 'storybook/internal/csf';

export const RouterDecorator = (Story: PartialStoryFn) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
