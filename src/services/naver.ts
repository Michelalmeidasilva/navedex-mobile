import { AxiosResponse } from 'axios';
import { fetchClient } from 'src/providers';

export const getNavers = (): Promise<AxiosResponse<any>> => fetchClient.get('/navers');

export const createNaver = (): Promise<AxiosResponse<any>> => fetchClient.post('/navers');
