import axios from 'axios';
import Config from 'react-native-config';

import { getTokenStorage } from 'src/utils';

const provider = axios.create({
  baseURL: 'https://navedex-api.herokuapp.com/v1'
});

provider.interceptors.request.use(async ({ headers, ...config }) => {
  const token = await getTokenStorage();

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

provider.interceptors.response.use(
  response => response?.data,
  err => Promise.reject(err?.response?.data)
);

export default provider;
