import axios from 'axios';

const API_URL = 'http://localhost:5000/users/me/address/';

export interface addressData {
  _id?: string;
  city: string;
  address: string;
  zipcode: string;
}
export interface UpdatedAddress {
  city?: string;
  address?: string;
  zipcode?: string;
}

const addAddress = async (addressData: addressData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, addressData, config);
  console.log(res.data);
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
  console.log(res.data, 'getAddress');
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
  updatedAddress: UpdatedAddress,
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
