import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';

export interface CreatePaymentInput {
  orderId: string;
  amount: number;
}

interface CreatePaymentResponseData {
  clientSecret: string;
  paymentIntentId: string;
}

export const createPayment = createAsyncThunk<
  ApiSuccessResponse<CreatePaymentResponseData>,
  CreatePaymentInput,
  ThunkConfig<string>
>('@@payment/createPayment', async ({ orderId, amount }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post(`order/${orderId}/payment`, {
      amount,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
