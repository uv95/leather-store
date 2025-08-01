import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSchema, SortingOptions } from '../types/filter';

const initialState: FilterSchema = {
  filters: [],
  sortBy: SortingOptions.DEFAULT,
};

const filterSlice = createSlice({
  name: '@@filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (!state.filters.includes(action.payload))
        state.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.filters = state.filters.filter(
        (filter) => filter !== action.payload
      );
    },
    clearFilter: (state) => {
      state.filters = [];
      state.sortBy = SortingOptions.DEFAULT;
    },
    setSort: (state, action: PayloadAction<SortingOptions>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addFilter, removeFilter, clearFilter, setSort } =
  filterSlice.actions;

export default filterSlice.reducer;
