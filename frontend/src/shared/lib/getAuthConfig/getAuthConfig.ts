import { LOCAL_STORAGE_USER_KEY } from '../../const/consts';

export function getAuthConfig() {
  const config = { headers: {} };
  const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (token) {
    config.headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
    };
  }

  return config;
}
