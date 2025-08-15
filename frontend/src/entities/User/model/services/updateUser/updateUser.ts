import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { User } from '../../types/user';

interface UpdateUserInput {
  dto: Omit<User, '_id' | 'role'>;
}

export const updateUser = createAsyncThunk<
  ApiSuccessResponse<User>,
  UpdateUserInput,
  ThunkConfig<string>
>('@@user/updateUser', async (dto, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.patch('/user/currentUser', dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
