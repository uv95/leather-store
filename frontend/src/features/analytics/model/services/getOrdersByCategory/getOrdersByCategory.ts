import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { OrdersByCategory } from '../../types/analytics';
import { AxiosError } from 'axios';

export const getOrdersByCategory = createAsyncThunk<
  ApiSuccessResponse<OrdersByCategory[]>,
  void,
  ThunkConfig<string>
>('@@analytics/orders-by-category', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get('/analytics/orders-by-category');

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
