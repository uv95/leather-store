import { Address, AddressSchema } from './model/types/address';
import addressReducer from './model/slice/addressSlice';
import { getAddress as getAddressSelector } from './model/selectors/getAddress/getAddress';
import { getAddressLoading } from './model/selectors/getAddressLoading/getAddressLoading';
import { getUserAddresses as getUserAddressesSelector } from './model/selectors/getUserAddresses/getUserAddresses';
import { createAddress } from './model/services/createAddress/createAddress';
import { deleteAddress } from './model/services/deleteAddress/deleteAddress';
import { getUserAddresses } from './model/services/getUserAddresses/getUserAddresses';
import { updateAddress } from './model/services/updateAddress/updateAddress';

export {
  type Address,
  type AddressSchema,
  addressReducer,
  getAddressSelector,
  getAddressLoading,
  getUserAddressesSelector,
  createAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
};
