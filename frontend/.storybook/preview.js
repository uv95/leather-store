import { StyleDecorator } from '../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../src/shared/config/storybook/RouterDecorator/RouterDecorator';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StyleDecorator, RouterDecorator],
};

export default preview;
