import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/extractErrorMessage';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../../../../../shared/types/apiResponse';
import { CartItemDto, CartItem } from '../../types/cart';

export interface AddCartItemInput {
  cartId: string;
  dto: CartItemDto;
}

interface AddToCartData {
  cartItem: CartItem;
  total: number;
  itemCount: number;
}

export const addToCart = createAsyncThunk<
  ApiSuccessResponse<AddToCartData>,
  AddCartItemInput,
  ThunkConfig<string>
>('@@cart/addItem', async (addCartItemInput, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  const { cartId, dto } = addCartItemInput;

  try {
    const response = await extra.api.post(`/cart/${cartId}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error as ApiErrorResponse));
  }
});
