import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { AxiosError } from 'axios';

export const deleteUser = createAsyncThunk<
  ApiSuccessResponse<null>,
  void,
  ThunkConfig<string>
>('@@user/deleteUser', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.delete('/user/currentUser');

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as AxiosError | ApiErrorResponse));
  }
});
