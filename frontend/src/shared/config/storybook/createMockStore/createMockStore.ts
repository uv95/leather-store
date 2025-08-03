import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

export const createMockStore = (
  initialState = {},
  reducers: ReducersMapObject
) =>
  configureStore({
    reducer: reducers,
    preloadedState: initialState,
  });
