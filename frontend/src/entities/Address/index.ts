import { Address, AddressSchema } from './model/types/address';
import addressReducer from './model/slice/addressSlice';
import { getAddress as getAddressSelector } from './model/selectors/getAddress/getAddress';
import { getAddressIsLoading } from './model/selectors/getAddressIsLoading/getAddressIsLoading';
import { getAllAddresses as getAllAddressesSelector } from './model/selectors/getAllAddresses/getAllAddresses';
import { addAddress } from './model/services/addAddress/addAddress';
import { deleteAddress } from './model/services/deleteAddress/deleteAddress';
import { getAddress } from './model/services/getAddress/getAddress';
import { getAllAddresses } from './model/services/getAllAddresses/getAllAddresses';
import { updateAddress } from './model/services/updateAddress/updateAddress';

export {
  type Address,
  type AddressSchema,
  addressReducer,
  getAddressSelector,
  getAddressIsLoading,
  getAllAddressesSelector,
  addAddress,
  deleteAddress,
  getAddress,
  getAllAddresses,
  updateAddress,
};
