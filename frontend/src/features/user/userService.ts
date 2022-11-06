import axios from 'axios';
import { IUpdatedUser } from '../../types/data';

const API_URL = 'http://localhost:5000/users/';

const getMe = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + 'me', config);

  return res.data;
};

const updateMe = async (token: string, updatedData: IUpdatedUser) => {
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
