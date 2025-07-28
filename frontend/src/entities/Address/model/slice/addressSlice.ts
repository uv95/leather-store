import { createSlice } from '@reduxjs/toolkit';
import { AddressSchema } from '../types/address';
import { deleteAddress } from '../services/deleteAddress/deleteAddress';
import { getAddress } from '../services/getAddress/getAddress';
import { addAddress } from '../services/addAddress/addAddress';
import { getAllAddresses } from '../services/getAllAddresses/getAllAddresses';
import { updateAddress } from '../services/updateAddress/updateAddress';
import { logout } from '../../../../features/auth/authSlice';

const initialState: AddressSchema = {
  addresses: [],
  address: undefined,
  isLoading: false,
};

export const addressSlice = createSlice({
  name: '@@address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.addresses = [];
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.meta.arg
        );
      })
      .addCase(getAddress.rejected, (state) => {
        state.address = undefined;
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
