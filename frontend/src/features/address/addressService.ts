import axios from 'axios';
import { IAddress } from '../../types/data';
import { BASE_URL } from '../../utils/consts';

// const API_URL = 'http://localhost:5000/users/me/address/';
const API_URL = BASE_URL + 'users/me/address/';

const addAddress = async (addressData: IAddress, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, addressData, config);

  return res.data;
};

const getAllAddresses = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);
  return res.data;
};

const getAddress = async (addressId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + addressId, config);

  return res.data;
};

const deleteAddress = async (addressId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + addressId, config);
  return res.data;
};

const updateAddress = async (
  addressId: string,
  updatedAddress: Partial<IAddress>,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.patch(API_URL + addressId, updatedAddress, config);
  return res.data;
};

const addressService = {
  addAddress,
  getAllAddresses,
  getAddress,
  deleteAddress,
  updateAddress,
};

export default addressService;
