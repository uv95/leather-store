import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../shared/const/consts';
import { extractErrorMessage } from '../../../../../shared/lib/extractErrorMessage/errorMessage';
import { getAuthConfig } from '../../../../../shared/lib/getAuthConfig/getAuthConfig';
import { Item } from '../../types/item';

export const updateItem = createAsyncThunk(
  '@@items/update',
  async (
    { itemId, newData }: { itemId: string; newData: Partial<Item> },
    thunkAPI
  ) => {
    try {
      const config = getAuthConfig();
      const result = await axios.patch(
        `${BASE_URL}items/${itemId}`,
        newData,
        config
      );

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
