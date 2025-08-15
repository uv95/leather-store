import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';

export interface CreateOrderInput {
  cartId: string;
  address: string;
}

export interface CreateOrderData {
  userActiveOrderCount: number;
}

export const createOrder = createAsyncThunk<
  ApiSuccessResponse<CreateOrderData>,
  CreateOrderInput,
  ThunkConfig<string>
>('@@orders/createOrder', async (dto, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post('/order', dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
