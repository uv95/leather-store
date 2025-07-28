import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { RootState } from '../../../../../store';
import { Address } from '../../types/address';

export const updateAddress = createAsyncThunk(
  '@@address/update',
  async (
    { addressId, newData }: { addressId: string; newData: Partial<Address> },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      const config = getAuthConfig(token);
      const result = await axios.patch(
        `${BASE_URL}users/me/address/${addressId}`,
        newData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
