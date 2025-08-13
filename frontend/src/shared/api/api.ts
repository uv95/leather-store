import axios from 'axios';
import { LOCAL_STORAGE_USER_KEY } from '../const/consts';

export const $api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://leather-store.fly.dev',
  headers: {
    authorization: localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '',
  },
});
