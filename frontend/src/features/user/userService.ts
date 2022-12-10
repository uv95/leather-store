import axios from 'axios';
import { IUser } from '../../types/data';
import { BASE_URL } from '../../utils/consts';

// const API_URL = 'http://localhost:5000/users/';
const API_URL = BASE_URL + 'users/';

const getMe = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + 'me', config);

  return res.data;
};

const updateMe = async (token: string, updatedData: Partial<IUser>) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(API_URL + 'updateMe', updatedData, config);
  console.log(res.data);
  return res.data;
};

const userService = {
  getMe,
  updateMe,
};

export default userService;
