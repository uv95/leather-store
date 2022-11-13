import axios from 'axios';
import { IOrder } from '../../types/data';

const API_URL = 'http://localhost:5000/order/';

const createOrder = async (orderData: IOrder, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, orderData, config);

  return res.data;
};

const getAllOrders = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);
  return res.data;
};

const getMyOrders = async (userId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + `${userId}/myOrders`, config);
  return res.data;
};

const getOrder = async (orderId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + orderId, config);
  console.log(res.data, 'getOrder');
  return res.data;
};

const cancelOrder = async (orderId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + orderId, config);
  return res.data;
};

const updateOrder = async (
  orderId: string,
  updatedOrder: Partial<IOrder>,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.patch(API_URL + orderId, updatedOrder, config);
  return res.data;
};

const orderService = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrder,
  cancelOrder,
};

export default orderService;
