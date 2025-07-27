import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { RootState } from '../../../../../store';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const deleteItem = createAsyncThunk(
  '@@items/delete',
  async (itemId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      const config = getAuthConfig(token);
      const result = await axios.delete(`${BASE_URL}items/${itemId}`, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
