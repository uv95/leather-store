import axios from 'axios';
import { IRegister, ILogin, IUpdatedAuth } from '../../types/data';
import { BASE_URL } from '../../utils/consts';

// const API_URL = 'http://localhost:5000/users/';
const API_URL = BASE_URL + 'users/';

const register = async (userData: IRegister) => {
  const res = await axios.post(API_URL + 'signup', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

const login = async (userData: ILogin) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

const updatePassword = async (token: string, updatedData: IUpdatedAuth) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(
    API_URL + 'updateMyPassword',
    updatedData,
    config
  );

  return res.data;
};

const authService = {
  register,
  login,
  updatePassword,
};

export default authService;
