import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const addItem = createAsyncThunk(
  '@@items/add',
  async (itemData: FormData, thunkAPI) => {
    try {
      const config = getAuthConfig();
      const result = await axios.post(`${BASE_URL}items`, itemData, config);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
