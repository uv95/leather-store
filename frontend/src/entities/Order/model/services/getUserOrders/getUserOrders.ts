import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const getUserOrders = createAsyncThunk(
  '@@orders/getUserOrders',
  async (userId: string, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.get(
        `${BASE_URL}order/${userId}/myOrders`,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
