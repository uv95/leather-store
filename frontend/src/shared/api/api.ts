import axios from 'axios';
import { LOCAL_STORAGE_USER_KEY } from '../const/consts';

export const $api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
    :  'https://leather-store.fly.dev',
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return config;
});
