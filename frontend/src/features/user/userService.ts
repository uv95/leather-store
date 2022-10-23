import axios from 'axios';

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

const userService = {
  getMe,
};

export default userService;
