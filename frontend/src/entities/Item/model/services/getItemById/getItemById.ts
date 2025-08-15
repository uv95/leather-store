import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { Item } from '../../types/item';

interface GetItemByIdInput {
  itemId: string;
}

export const getItemById = createAsyncThunk<
  ApiSuccessResponse<Item>,
  GetItemByIdInput,
  ThunkConfig<string>
>('@@items/getItemById', async ({ itemId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get(`/item/${itemId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
