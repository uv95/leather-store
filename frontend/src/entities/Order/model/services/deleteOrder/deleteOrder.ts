import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { AxiosError } from 'axios';

export interface DeleteOrderInput {
  orderId: string;
}

export interface DeleteOrderData {
  userActiveOrderCount: number;
}

export const deleteOrder = createAsyncThunk<
  ApiSuccessResponse<DeleteOrderData>,
  DeleteOrderInput,
  ThunkConfig<string>
>('@@orders/deleteOrder', async ({ orderId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.delete(`/order/${orderId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
