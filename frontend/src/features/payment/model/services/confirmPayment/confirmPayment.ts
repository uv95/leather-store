import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';

export interface ConfirmPaymentInput {
  paymentIntentId: string;
}

interface ConfirmPaymentResponseData {
  id: string;
  status: string;
}

export const confirmPayment = createAsyncThunk<
  ConfirmPaymentResponseData,
  ConfirmPaymentInput,
  ThunkConfig<string>
>('@@payment/confirmPayment', async ({ paymentIntentId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post(`payment/${paymentIntentId}/confirm`);

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
