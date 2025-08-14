import { createSlice } from '@reduxjs/toolkit';
import { createItem } from '../services/createItem/createItem';
import { deleteItem } from '../services/deleteItem/deleteItem';
import { getItems } from '../services/getItems/getItems';
import { getItemBySlug } from '../services/getItemBySlug/getItemBySlug';
import { updateItem } from '../services/updateItem/updateItem';
import { ItemsSchema } from '../types/item';

const initialState: ItemsSchema = {
  items: [],
  item: undefined,
  loading: 'idle',
};

export const itemsSlice = createSlice({
  name: '@@items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload.data;

        state.item = updatedItem;
        state.items = state.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const { itemId } = action.meta.arg;

        state.items = state.items!.filter((item) => item._id !== itemId);
      })
      .addCase(getItems.pending, (state) => {
        state.items = [];
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(getItemBySlug.pending, (state) => {
        state.item = undefined;
      })
      .addCase(getItemBySlug.fulfilled, (state, action) => {
        state.item = action.payload.data;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('@@items') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = 'pending';
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('@@items') &&
          action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = 'succeeded';
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('@@items') &&
          action.type.endsWith('/rejected'),
        (state) => {
          state.loading = 'failed';
        }
      );
  },
});

export default itemsSlice.reducer;
