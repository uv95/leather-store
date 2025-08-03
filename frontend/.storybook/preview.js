import { StyleDecorator } from '../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StoreDecorator } from '../src/shared/config/storybook/StoreDecorator/StoreDecorator';

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
  decorators: [StyleDecorator, RouterDecorator, StoreDecorator],
};

export default preview;
