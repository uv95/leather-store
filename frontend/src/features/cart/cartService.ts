import axios from 'axios';
import { ICart, ICartItem, IQuantity } from '../../types/data';
import { BASE_URL } from '../../shared/const/consts';
import { getAuthConfig } from '../../shared/lib/getAuthConfig/getAuthConfig';

const API_URL = BASE_URL + 'cart/';

const addToCart = async (cartItem: Partial<ICartItem>) => {
  const config = getAuthConfig();
  const res = await axios.post(API_URL, cartItem, config);
  return res.data;
};

const getCart = async () => {
  const config = getAuthConfig();

  const res = await axios.get(API_URL, config);
  return res.data;
};

const updateCart = async (updatedCart: Partial<ICart>) => {
  const config = getAuthConfig();

  const res = await axios.patch(API_URL, updatedCart, config);
  return res.data;
};

const emptyCart = async () => {
  const config = getAuthConfig();
  const res = await axios.delete(API_URL, config);
  return res.data;
};

const deleteItemFromCart = async (cartItemId: string) => {
  const config = getAuthConfig();
  const res = await axios.delete(API_URL + cartItemId, config);
  return res.data;
};

const changeQuantity = async (cartItemId: string, quantity: IQuantity) => {
  const config = getAuthConfig();
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
