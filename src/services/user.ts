import { AxiosResponse } from 'axios';
import { fetchClient } from 'src/providers';

import { CredentialsParams } from 'src/context';

export const loginUser = (credentials: CredentialsParams): Promise<AxiosResponse<any>> =>
  fetchClient.post('/users/login', credentials);
