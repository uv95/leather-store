import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  BASE_URL,
  LOCAL_STORAGE_USER_KEY,
} from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { RegisterData } from '../../types/auth';
import { setUser } from '../../../../../entities/User';

export const register = createAsyncThunk(
  '@@auth/register',
  async (registerData: RegisterData, thunkAPI) => {
    try {
      const result = await axios.post(`${BASE_URL}users/signup`, registerData);

      if (result.data) {
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify(result.data.token)
        );

        thunkAPI.dispatch(setUser(result.data.data));
      }

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
