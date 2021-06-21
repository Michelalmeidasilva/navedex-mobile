import { AxiosResponse } from 'axios';
import { fetchClient } from 'src/providers';

import { UserResponse } from 'src/context';
import { CredentialsParams } from 'src/context';

export const signup: any = () => fetchClient.post('/users/signup');

export const loginUser = (credentials: CredentialsParams): Promise<AxiosResponse<any>> =>
  fetchClient.post('/users/login', credentials);

export const getMe = (): Promise<AxiosResponse<any>> => fetchClient.get('/users/me');
