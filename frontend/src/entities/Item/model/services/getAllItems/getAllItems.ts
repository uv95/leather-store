import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';

export const getAllItems = createAsyncThunk(
  '@@items/getAll',
  async (_, thunkAPI) => {
    try {
      const result = await axios.get(`${BASE_URL}items`);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
