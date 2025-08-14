import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { MonthleRevenue } from '../../types/analytics';

export const getMonthlyRevenueData = createAsyncThunk<
  ApiSuccessResponse<MonthleRevenue[]>,
  void,
  ThunkConfig<string>
>('@@analytics/monthly-revenue', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get('/analytics/monthly-revenue');

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
