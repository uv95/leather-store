import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { User } from '../../../../User';
import { Order, OrderStatus } from '../../types/order';

export interface UpdateOrderInput {
  orderId: string;
  dto: {
    status?: OrderStatus;
    address?: string;
  };
}

export const updateOrder = createAsyncThunk<
  ApiSuccessResponse<Order<Omit<User, '_id' | 'role'>>>,
  UpdateOrderInput,
  ThunkConfig<string>
>('@@orders/updateOrder', async (updateOrderInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { orderId, dto } = updateOrderInput;

  try {
    const response = await extra.api.patch(`/order/${orderId}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
