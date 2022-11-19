import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import itemsService from './itemsService';
import { IItemsState, IUpdatedItem } from '../../types/data';
import { extractErrorMessage } from '../../utils/errorMessage';

const initialState: IItemsState = {
  item: null,
  items: [],
  isLoading: false,
};

export const addItem = createAsyncThunk(
  '@@items/add',
  async (itemData: FormData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await itemsService.addItem(itemData, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAllItems = createAsyncThunk(
  '@@items/getAll',
  async (_, thunkAPI) => {
    try {
      return await itemsService.getAllItems();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const getItemBySlug = createAsyncThunk(
  '@@items/getBySlug',
  async (slug: string, thunkAPI) => {
    try {
      return await itemsService.getItemBySlug(slug);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
// export const getItemById = createAsyncThunk(
//   '@@items/getById',
//   async (id: string, thunkAPI) => {
//     try {
//       return await itemsService.getItemById(id);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(extractErrorMessage(error));
//     }
//   }
// );

export const deleteItem = createAsyncThunk(
  '@@items/delete',
  async (itemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await itemsService.deleteItem(itemId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateItem = createAsyncThunk(
  '@@items/update',
  async ({ itemId, updatedItem }: IUpdatedItem, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await itemsService.updateItem(itemId, updatedItem, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

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
      .addCase(getItemBySlug.fulfilled, (state, action) => {
        state.item = action.payload.data.data;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload.data.data];
      })
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItems.pending, (state) => {
        state.items = [];
        state.isLoading = true;
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
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

//SELECTORS

export const selectVisibleItems = createSelector(
  (state: RootState) => state.items.items,
  (state: RootState) => state.filters,
  (items, filters) => {
    if (!filters.length) return items;
    return items.filter((item) => {
      const itemsFilters = ([] as string[]).concat(item.type);
      return filters.some((filter: string) => itemsFilters.includes(filter));
    });
  }
);

export default itemsSlice.reducer;
