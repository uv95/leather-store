import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { Address } from '../../types/address';

export const addAddress = createAsyncThunk(
  '@@address/add',
  async (addressData: Omit<Address, '_id'>, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.post(
        `${BASE_URL}users/me/address`,
        addressData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
