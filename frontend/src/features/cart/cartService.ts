import axios from 'axios';

const API_URL = 'http://localhost:5000/cart/';

export interface CartItem {
  itemId: string;
  quantity: number;
  colors: {
    leatherColor: string;
    threadsColor: string;
  };
  leather: string;
}

const addToCart = async (cartItem: CartItem, token: string) => {
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

const deleteItemFromCart = async (itemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + itemId, config);
  return res.data;
};

const reduceQuantity = async (itemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(
    API_URL + itemId + '/decreaseQuantity',
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
