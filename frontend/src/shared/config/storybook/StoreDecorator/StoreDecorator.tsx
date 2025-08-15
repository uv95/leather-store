import { PartialStoryFn } from 'storybook/internal/csf';
import { StoreProvider } from '../../../../app/providers/StoreProvider';

export const StoreDecorator = (Story: PartialStoryFn) => {
  return (
    <StoreProvider>
      <Story />
    </StoreProvider>
  );
};
