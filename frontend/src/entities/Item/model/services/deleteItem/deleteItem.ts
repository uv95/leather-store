import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';

interface DeleteItemInput {
  itemId: string;
}

export const deleteItem = createAsyncThunk<
  ApiSuccessResponse<null>,
  DeleteItemInput,
  ThunkConfig<string>
>('@@items/deleteItem', async ({ itemId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.delete(`/item/${itemId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
