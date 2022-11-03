import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import addressService from './addressService';
import { addressData } from './addressService';
import { extractErrorMessage } from '../../utils/errorMessage';

interface IAddresses {
  address: addressData | null;
  addresses: addressData[] | [];
  isLoading: boolean;
}

const initialState: IAddresses = {
  address: null,
  addresses: [],
  isLoading: false,
};

export const addAddress = createAsyncThunk(
  '@@addresses/add',
  async (addressData: addressData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await addressService.addAddress(addressData, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAllAddresses = createAsyncThunk(
  '@@addresses/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await addressService.getAllAddresses(token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
export const getAddress = createAsyncThunk(
  '@@addresses/getOne',
  async (slug: string, thunkAPI) => {
    try {
      return await addressService.getAddress(slug);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteAddress = createAsyncThunk(
  '@@addresses/delete',
  async (addressId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await addressService.deleteAddress(addressId, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const addressSlice = createSlice({
  name: '@@addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.meta.arg
        );
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.address = action.payload.data.data;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = [...state.addresses, action.payload.data.data];
      })

      .addCase(getAllAddresses.pending, (state) => {
        state.addresses = [];
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data.data;
      })
      .addCase(getAllAddresses.rejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default addressSlice.reducer;
