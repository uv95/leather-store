import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { Cart } from '../../types/cart';

export const updateCart = createAsyncThunk(
  '@@cart/update',
  async (newData: Partial<Cart>, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.patch(`${BASE_URL}cart`, newData, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
