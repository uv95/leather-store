import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { Order } from '../../types/order';

export const updateOrder = createAsyncThunk(
  '@@orders/update',
  async (
    { orderId, newData }: { orderId: string; newData: Partial<Order> },
    thunkAPI
  ) => {
    try {
      const config = getAuthConfig();
      const result = await axios.patch(
        `${BASE_URL}order/${orderId}`,
        newData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
