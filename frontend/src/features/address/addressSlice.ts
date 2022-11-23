import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IAddress, IAddressState, IUpdatedAddress } from '../../types/data';
import addressService from './addressService';
import { extractErrorMessage } from '../../utils/errorMessage';

const initialState: IAddressState = {
  address: null,
  addresses: [],
  isLoading: false,
};

export const addAddress = createAsyncThunk(
  '@@addresses/add',
  async (addressData: IAddress, thunkAPI) => {
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
  async (addressId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await addressService.getAddress(addressId, token);
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
export const updateAddress = createAsyncThunk(
  '@@addresses/update',
  async ({ addressId, updatedAddress }: IUpdatedAddress, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await addressService.updateAddress(
        addressId,
        updatedAddress,
        token
      );
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
      .addCase(getAddress.rejected, (state, action) => {
        state.address = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.address = action.payload.data.data;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = [...state.addresses, action.payload.data.data];
      })
      .addCase(getAllAddresses.pending, (state) => {
        state.addresses = [];
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data.data;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.address = action.payload.data.data;
        state.addresses = state.addresses.map((address) =>
          address._id === action.payload.data.data._id
            ? action.payload.data.data
            : address
        );
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default addressSlice.reducer;
