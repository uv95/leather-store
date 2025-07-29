import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { RootState } from '../../../../../store';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const getUser = createAsyncThunk(
  '@@user/getOne',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      const config = getAuthConfig(token);
      const result = await axios.get(`${BASE_URL}users/me`, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
