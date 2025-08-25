import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartData } from '../../types/cart';

export interface RemoveFromCartInput {
  cartItemId: string;
}

export const removeFromCart = createAsyncThunk<
  ApiSuccessResponse<CartData>,
  RemoveFromCartInput,
  ThunkConfig<string>
>('@@cart/removeFromCart', async (removeFromCartInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartItemId } = removeFromCartInput;

  try {
    console.log('removeFromCart ♲', cartItemId);
    const response = await extra.api.delete(`/cart/item/${cartItemId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
