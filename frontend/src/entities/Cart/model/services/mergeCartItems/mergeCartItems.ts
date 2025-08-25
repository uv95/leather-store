import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartData, CartItemDto } from '../../types/cart';
import { LOCAL_STORAGE_CART } from '../../../../../shared/const/consts';
import { To } from 'react-router-dom';

export interface MergeCartItemsInput {
  dto: CartItemDto[];
  navigate: (to: To) => void;
}

export const mergeCartItems = createAsyncThunk<
  ApiSuccessResponse<CartData>,
  MergeCartItemsInput,
  ThunkConfig<string>
>('@@cart/mergeCartItems', async ({ dto, navigate }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    console.log('mergeCartItems dto', dto);
    const response = await extra.api.post(`/cart`, dto);

    if (!response.data) {
      throw new Error();
    }

    navigate('/');
    localStorage.removeItem(LOCAL_STORAGE_CART);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
