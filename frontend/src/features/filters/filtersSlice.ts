import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const filtersSlice = createSlice({
  name: '@@filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) state.push(action.payload);
    },
    removeFilter: (state, action) => {
      return state.filter((item) => item !== action.payload);
    },
    clearFilter: () => [],
  },
});

export const { addFilter, removeFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
