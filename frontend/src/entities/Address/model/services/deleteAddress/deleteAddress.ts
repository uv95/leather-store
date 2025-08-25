import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';

export interface DeleteAddressInput {
  addressId: string;
}

export const deleteAddress = createAsyncThunk<
  ApiSuccessResponse<null>,
  DeleteAddressInput,
  ThunkConfig<string>
>('@@address/deleteAddress', async ({ addressId }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.delete(`/address/${addressId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
