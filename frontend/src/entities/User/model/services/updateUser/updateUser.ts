import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { User } from '../../types/user';

export const updateUser = createAsyncThunk(
  '@@user/update',
  async (newData: Partial<User>, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.patch(
        `${BASE_URL}users/updateMe`,
        newData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
