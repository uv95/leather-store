import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';

export const getCart = createAsyncThunk('@@cart/get', async (_, thunkAPI) => {
  try {
    const config = getAuthConfig();
    const result = await axios.get(`${BASE_URL}cart`, config);
    console.log('getCart', result.data);

    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
