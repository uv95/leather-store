import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { Item } from '../../types/item';

export const getItems = createAsyncThunk<
  ApiSuccessResponse<Item[]>,
  void,
  ThunkConfig<string>
>('@@items/getItems', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get('/item');

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
