import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { Item, ItemDto } from '../../types/item';
import { AxiosError } from 'axios';

interface UpdateItemInput {
  itemId: string;
  dto: AllOptional<ItemDto>;
}

export const updateItem = createAsyncThunk<
  ApiSuccessResponse<Item>,
  UpdateItemInput,
  ThunkConfig<string>
>('@@items/updateItem', async (updateItemInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { itemId, dto } = updateItemInput;

  try {
    const response = await extra.api.patch(`/item/${itemId}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
