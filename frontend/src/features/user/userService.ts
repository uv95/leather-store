import axios from 'axios';

const API_URL = 'http://localhost:5000/users/';

export interface IUpdatedData {
  name?: string;
  email?: string;
  phone?: string;
}

const getMe = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + 'me', config);

  return res.data;
};

const updateMe = async (token: string, updatedData: IUpdatedData) => {
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
