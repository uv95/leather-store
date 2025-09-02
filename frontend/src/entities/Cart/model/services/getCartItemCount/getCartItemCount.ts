import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { AxiosError } from 'axios';

export interface GetCartItemCountInput {
  cartId: string;
}

export const getCartItemCount = createAsyncThunk<
  ApiSuccessResponse<number>,
  GetCartItemCountInput,
  ThunkConfig<string>
>('@@cart/getCartItemCount', async (getCartItemCountInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartId } = getCartItemCountInput;

  try {
    const response = await extra.api.get(`/cart/${cartId}/count`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
