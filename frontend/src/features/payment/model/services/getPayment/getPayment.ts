import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';
import { Payment } from '../../types/payment';

export interface GetPaymentInput {
  orderId: string;
}

export const getPayment = createAsyncThunk<
  Payment,
  GetPaymentInput,
  ThunkConfig<string>
>('@@payment/getPayment', async ({ orderId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get(`order/${orderId}/payment`);

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
