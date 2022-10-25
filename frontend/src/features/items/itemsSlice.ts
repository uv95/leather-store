import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import itemsService, { ItemData } from './itemsService';
import { extractErrorMessage } from '../../utils/errorMessage';

interface IItems {
  item: ItemData | null;
  items: ItemData[] | [];
  isLoading: boolean;
}

const initialState: IItems = {
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

export const deleteItem = createAsyncThunk(
  '@@items/add',
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

export const itemsSlice = createSlice({
  name: '@@items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(deleteItem.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteItem.fulfilled, (state) => {
      //   state.isLoading = false;
      // })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.items = action.payload.data.data;
      })
      .addCase(getAllItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default itemsSlice.reducer;