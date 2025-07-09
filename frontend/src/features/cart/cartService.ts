import axios from 'axios';
import { ICart, ICartItem, IQuantity } from '../../types/data';
import { BASE_URL } from '../../utils/consts';

const API_URL = BASE_URL + 'cart/';

const addToCart = async (cartItem: Partial<ICartItem>, token: string) => {
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

const changeQuantity = async (
  cartItemId: string,
  quantity: IQuantity,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(
    API_URL + cartItemId + '/changeQuantity',
    quantity,
    config
  );

  return res.data;
};

const cartService = {
  addToCart,
  getCart,
  emptyCart,
  deleteItemFromCart,
  updateCart,
  changeQuantity,
};

export default cartService;
