import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { AxiosError } from 'axios';

export interface ClearCartInput {
  cartId: string;
}

export const clearCart = createAsyncThunk<
  ApiSuccessResponse<null>,
  ClearCartInput,
  ThunkConfig<string>
>('@@cart/clearCart', async (clearCartInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartId } = clearCartInput;

  try {
    const response = await extra.api.delete(`/cart/${cartId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
