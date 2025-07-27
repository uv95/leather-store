import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';

export const getItemBySlug = createAsyncThunk(
  '@@items/getBySlug',
  async (slug: string, thunkAPI) => {
    try {
      const result = await axios.get(`${BASE_URL}items/${slug}`);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
