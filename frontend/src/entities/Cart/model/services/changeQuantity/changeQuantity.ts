import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { UpdatedQuantity } from '../../types/cart';

export const changeQuantity = createAsyncThunk(
  '@@cart/changeQuantity',
  async ({ cartItemId, quantity }: UpdatedQuantity, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.post(
        `${BASE_URL}cart/${cartItemId}/changeQuantity`,
        quantity,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
