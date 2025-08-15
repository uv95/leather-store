import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { Item } from '../../types/item';

interface GetItemBySlugInput {
  slug: string;
}

export const getItemBySlug = createAsyncThunk<
  ApiSuccessResponse<Item>,
  GetItemBySlugInput,
  ThunkConfig<string>
>('@@items/getItemBySlug', async ({ slug }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get(`/item/slug/${slug}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
