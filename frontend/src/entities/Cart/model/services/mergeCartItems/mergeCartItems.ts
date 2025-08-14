import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartData, CartItemDto } from '../../types/cart';
import { LOCAL_STORAGE_CART } from '../../../../../shared/const/consts';

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

    if (!response.data) {
      throw new Error();
    }

    extra.navigate && extra.navigate('/');
    localStorage.removeItem(LOCAL_STORAGE_CART);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
