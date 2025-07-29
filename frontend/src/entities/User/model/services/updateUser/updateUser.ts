import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { RootState } from '../../../../../store';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { User } from '../../types/user';

export const updateUser = createAsyncThunk(
  '@@user/update',
  async (newData: Partial<User>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      const config = getAuthConfig(token);
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
