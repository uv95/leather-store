import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartItem } from '../../types/cart';
import { AxiosError } from 'axios';

export interface GetCartItemsInput {
  cartId: string;
}

export const getCartItems = createAsyncThunk<
  ApiSuccessResponse<CartItem[]>,
  GetCartItemsInput,
  ThunkConfig<string>
>('@@cart/getCartItems', async (getCartItemsInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartId } = getCartItemsInput;

  try {
    const response = await extra.api.get(`/cart/${cartId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
