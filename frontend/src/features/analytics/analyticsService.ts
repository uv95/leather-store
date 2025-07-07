import axios from 'axios';
import { BASE_URL } from '../../utils/consts';

const API_URL = BASE_URL + 'analytics';

const getMonthlyRevenue = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/monthly-revenue`, config);
  return res.data;
};

const getOrdersByCategory = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/orders-by-category`, config);
  return res.data;
};

const analyticsService = {
  getMonthlyRevenue,
  getOrdersByCategory,
};

export default analyticsService;
