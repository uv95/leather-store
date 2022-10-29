import axios from 'axios';

const API_URL = 'http://localhost:5000/users/';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export interface UpdatedData {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

const register = async (userData: RegisterData) => {
  const res = await axios.post(API_URL + 'signup', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

const login = async (userData: LoginData) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

const updatePassword = async (token: string, updatedData: UpdatedData) => {
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
