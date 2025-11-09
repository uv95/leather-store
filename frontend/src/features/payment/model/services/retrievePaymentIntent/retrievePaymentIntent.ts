import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { PaymentIntent } from '../../types/payment';

export const retrievePaymentIntent = createAsyncThunk<
  ApiSuccessResponse<PaymentIntent>,
  { paymentIntentId: string },
  ThunkConfig<string>
>('@@payment/retrievePaymentIntent', async ({ paymentIntentId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get(`payment/${paymentIntentId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
