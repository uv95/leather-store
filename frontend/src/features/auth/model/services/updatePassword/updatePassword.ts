import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { PasswordUpdateData } from '../../types/auth';

export const updatePassword = createAsyncThunk(
  '@@auth/updatePassword',
  async (passwordUpdateData: PasswordUpdateData, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.patch(
        `${BASE_URL}users/updateMyPassword`,
        passwordUpdateData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
