import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { Order } from '../../types/order';

export const createOrder = createAsyncThunk(
  '@@orders/add',
  async (orderData: Omit<Order, 'createdAt'>, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.post(`${BASE_URL}order`, orderData, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
