import axios from 'axios';
import { ICart, ICartItem } from '../../types/data';
import { BASE_URL } from '../../utils/consts';

// const API_URL = 'http://localhost:5000/cart/';
const API_URL = BASE_URL + 'cart/';

const addToCart = async (cartItem: ICartItem, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, cartItem, config);
  return res.data;
};

const getCart = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

const updateCart = async (updatedCart: Partial<ICart>, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.patch(API_URL, updatedCart, config);
  console.log(res.data, 'updateCart');
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
  updateCart,
};

export default cartService;
