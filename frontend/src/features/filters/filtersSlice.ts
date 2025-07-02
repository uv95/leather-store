import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterState } from '../../types/data';

const initialState: IFilterState = {
  filters: [],
  sort: 'Default',
};

const filtersSlice = createSlice({
  name: '@@filters',
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
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
});

export const { addFilter, removeFilter, clearFilter, setSort } =
  filtersSlice.actions;

export default filtersSlice.reducer;
