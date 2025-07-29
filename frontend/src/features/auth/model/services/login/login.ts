import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  BASE_URL,
  LOCAL_STORAGE_USER_KEY,
} from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { LoginData } from '../../types/auth';
import { setUser } from '../../../../../entities/User';

export const login = createAsyncThunk(
  '@@auth/login',
  async (loginData: LoginData, thunkAPI) => {
    try {
      const result = await axios.post(`${BASE_URL}users/login`, loginData);

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
