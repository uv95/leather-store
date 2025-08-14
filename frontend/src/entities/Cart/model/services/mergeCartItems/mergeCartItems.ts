import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartData, CartItemDto } from '../../types/cart';

export interface MergeCartItemsInput {
  dto: CartItemDto[];
}

export const mergeCartItems = createAsyncThunk<
  ApiSuccessResponse<CartData>,
  MergeCartItemsInput,
  ThunkConfig<string>
>('@@cart/mergeCartItems', async (mergeCartItemsInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { dto } = mergeCartItemsInput;

  try {
    const response = await extra.api.post(`/cart`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
