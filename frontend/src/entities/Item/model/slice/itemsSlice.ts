import { createSlice } from '@reduxjs/toolkit';
import { addItem } from '../services/addItem/addItem';
import { deleteItem } from '../services/deleteItem/deleteItem';
import { getAllItems } from '../services/getAllItems/getAllItems';
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
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items!.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      .addCase(getItemBySlug.pending, (state) => {
        state.item = undefined;
      })
      .addCase(getItemBySlug.fulfilled, (state, action) => {
        state.item = action.payload.data.data;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload.data.data];
      })
      .addCase(getAllItems.pending, (state) => {
        state.items = [];
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.items = action.payload.data.data;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.item = action.payload.data.data;
        state.items = state.items.map((item) =>
          item._id === action.payload.data.data._id
            ? action.payload.data.data
            : item
        );
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
