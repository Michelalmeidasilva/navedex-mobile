import { fetchClient } from 'src/providers';

import { CredentialsParams } from 'src/context';

export const loginUser: any = (credentials: CredentialsParams) =>
  fetchClient.post('/users/login', credentials);

export const signup: any = () => fetchClient.post('/users/signup');
