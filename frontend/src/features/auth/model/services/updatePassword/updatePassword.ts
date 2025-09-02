import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import { ApiErrorResponse } from '../../../../../shared/types/apiResponse';
import { AuthApiResponseData, UpdatePasswordInput } from '../../types/auth';
import { AxiosError } from 'axios';

export const updatePassword = createAsyncThunk<
  AuthApiResponseData,
  UpdatePasswordInput,
  ThunkConfig<string>
>('@@auth/updatePassword', async (dto, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.patch('/auth/updatePassword', dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
