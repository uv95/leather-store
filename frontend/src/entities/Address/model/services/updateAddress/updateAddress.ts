import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { Address } from '../../types/address';

export interface UpdateAddressInput {
  addressId: string;
  dto: AllOptional<Address>;
}

export const updateAddress = createAsyncThunk<
  ApiSuccessResponse<Address>,
  UpdateAddressInput,
  ThunkConfig<string>
>('@@address/updateAddress', async (updateAdressInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { addressId, dto } = updateAdressInput;

  try {
    const response = await extra.api.patch(`/address/${addressId}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
