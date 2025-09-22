import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';
import { Payment } from '../../types/payment';

export const getAllPayments = createAsyncThunk<
  Payment,
  void,
  ThunkConfig<string>
>('@@payment/getAllPayments', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get('payment');

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
