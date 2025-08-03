import { PartialStoryFn } from 'storybook/internal/csf';
import store from '../../../../app/providers/StoreProvider/config/store';
import { Provider } from 'react-redux';
import { StoryContext } from '@storybook/react/*';
import { EnhancedStore } from '@reduxjs/toolkit';

export const StoreDecorator = (
  Story: PartialStoryFn,
  context: StoryContext
) => {
  const storeValue = (context.args?.store as EnhancedStore) || store;

  return (
    <Provider store={storeValue}>
      <Story />
    </Provider>
  );
};
