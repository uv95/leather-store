import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { UserOrder } from '../../types/order';

export const getOrder = createAsyncThunk<
  ApiSuccessResponse<UserOrder>,
  { orderId: string },
  ThunkConfig<string>
>('@@orders/getOrder', async ({ orderId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get(`/order/${orderId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
