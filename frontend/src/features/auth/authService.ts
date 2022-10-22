import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/users/';

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

const register = async (userData: RegisterData) => {
  const res = await axios.post(API_URL + 'signup', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  console.log('register', res.data);
  return res.data;
};

const login = async (userData: LoginData) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  console.log('login', res.data);
  return res.data;
};

const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  logout,
  login,
};

export default authService;
