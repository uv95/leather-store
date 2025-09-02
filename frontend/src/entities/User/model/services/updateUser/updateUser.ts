import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { User } from '../../types/user';
import { AxiosError } from 'axios';

export const updateUser = createAsyncThunk<
  ApiSuccessResponse<User>,
  Omit<User, '_id' | 'role'>,
  ThunkConfig<string>
>('@@user/updateUser', async (dto, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.patch('/user/currentUser', dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
