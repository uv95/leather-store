import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const getAllAddresses = createAsyncThunk(
  '@@address/getAll',
  async (_, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.get(`${BASE_URL}users/me/address`, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
