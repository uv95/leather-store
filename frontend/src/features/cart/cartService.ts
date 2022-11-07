import axios from 'axios';
import { ICartItem } from '../../types/data';

const API_URL = 'http://localhost:5000/cart/';

const addToCart = async (cartItem: ICartItem, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, cartItem, config);
  console.log(res.data);
  return res.data;
};

const getCart = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);
  console.log(res.data, 'getCart');
  return res.data;
};

const emptyCart = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL, config);
  return res.data;
};

const deleteItemFromCart = async (cartItemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + cartItemId, config);
  return res.data;
};

const reduceQuantity = async (cartItemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(
    API_URL + cartItemId + '/reduceQuantity',
    config
  );
  return res.data;
};

const cartService = {
  addToCart,
  getCart,
  emptyCart,
  deleteItemFromCart,
  reduceQuantity,
};

export default cartService;
