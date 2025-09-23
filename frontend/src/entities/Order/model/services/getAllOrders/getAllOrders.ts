import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { AdminOrder } from '../../types/order';
import { AxiosError } from 'axios';

export const getAllOrders = createAsyncThunk<
  ApiSuccessResponse<AdminOrder[]>,
  void,
  ThunkConfig<string>
>('@@orders/getAllOrders', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get('/order');

    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error as AxiosError | ApiErrorResponse)
    );
  }
});
