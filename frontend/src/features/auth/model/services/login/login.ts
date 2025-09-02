import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { setUser } from '../../../../../entities/User';
import { LOCAL_STORAGE_USER_KEY } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';
import { AuthApiResponseData, LoginInput } from '../../types/auth';
import { AxiosError } from 'axios';

export const login = createAsyncThunk<
  AuthApiResponseData,
  LoginInput,
  ThunkConfig<string>
>('@@auth/login', async (dto, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI;

  try {
    const response = await extra.api.post('/auth/login', dto);

    if (response.data) {
      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify(response.data.token)
      );

      dispatch(setUser(response.data.data));
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
