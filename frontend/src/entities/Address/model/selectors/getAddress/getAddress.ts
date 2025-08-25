import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getAddress = createSelector(
  (state: StateSchema) => state.address.addresses,
  (addresses) => (addressId: string) =>
    addresses.find((address) => address._id === addressId)
);
