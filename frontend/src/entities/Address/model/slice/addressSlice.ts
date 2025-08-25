import { createSlice } from '@reduxjs/toolkit';
import { AddressSchema } from '../types/address';
import { deleteAddress } from '../services/deleteAddress/deleteAddress';
import { createAddress } from '../services/createAddress/createAddress';
import { getUserAddresses } from '../services/getUserAddresses/getUserAddresses';
import { updateAddress } from '../services/updateAddress/updateAddress';
import { logout } from '../../../User';

const initialState: AddressSchema = {
  addresses: [],
  address: undefined,
  loading: 'idle',
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
      .addCase(createAddress.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload.data);
        state.loading = 'succeeded';
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const updatedAddress = action.payload.data;

        state.address = updatedAddress;
        state.addresses = state.addresses.map((address) =>
          address._id === updatedAddress._id ? updatedAddress : address
        );
        state.loading = 'succeeded';
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const { addressId } = action.meta.arg;
        state.loading = 'succeeded';

        state.addresses = state.addresses.filter(
          (address) => address._id !== addressId
        );
      })
      .addCase(getUserAddresses.pending, (state) => {
        state.addresses = [];
        state.loading = 'pending';
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data;
        state.loading = 'succeeded';
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('@@address') &&
          action.type.endsWith('/rejected'),
        (state) => {
          state.loading = 'failed';
        }
      );
  },
});

export default addressSlice.reducer;
