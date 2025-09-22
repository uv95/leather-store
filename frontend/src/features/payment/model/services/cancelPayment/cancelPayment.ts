import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';

export interface CancelPaymentInput {
  paymentIntentId: string;
}

interface CancelPaymentResponseData {
  id: string;
  status: string;
}

export const cancelPayment = createAsyncThunk<
  CancelPaymentResponseData,
  CancelPaymentInput,
  ThunkConfig<string>
>('@@payment/cancelPayment', async ({ paymentIntentId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post(`payment/${paymentIntentId}/cancel`);

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
