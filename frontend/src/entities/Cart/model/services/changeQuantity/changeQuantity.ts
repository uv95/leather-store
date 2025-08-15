import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartData } from '../../types/cart';

export interface ChangeQuantityInput {
  cartItemId: string;
  dto: {
    quantity: number;
  };
}

export const changeQuantity = createAsyncThunk<
  ApiSuccessResponse<CartData>,
  ChangeQuantityInput,
  ThunkConfig<string>
>('@@cart/changeQuantity', async (changeQuantityInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartItemId, dto } = changeQuantityInput;

  try {
    const response = await extra.api.patch(`/cart/item/${cartItemId}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
