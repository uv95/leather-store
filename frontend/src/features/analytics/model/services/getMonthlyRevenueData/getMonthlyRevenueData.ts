import axios from 'axios';
import { RootState } from '../../../../../store';
import { BASE_URL } from '../../../../../shared/const/consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const getMonthlyRevenueData = createAsyncThunk(
  '@@analytics/monthly-revenue',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      const config = getAuthConfig(token);
      const result = await axios.get(
        `${BASE_URL}analytics/monthly-revenue`,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
