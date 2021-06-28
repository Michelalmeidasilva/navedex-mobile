import { AxiosResponse } from 'axios';
import { fetchClient } from 'src/providers';

export const getNavers = (): Promise<AxiosResponse<any>> => fetchClient.get('/navers');

export const createNaver = (data): Promise<AxiosResponse<any>> => fetchClient.post('/navers', data);

export const getNaverById = (id: string): Promise<AxiosResponse<any>> =>
  fetchClient.get(`/navers/${id}`);

export const updateNaverById = (id: string, data: any): Promise<AxiosResponse<any>> =>
  fetchClient.put(`/navers/${id}`, data);

export const deleteNaver = (id: string): Promise<AxiosResponse<any>> =>
  fetchClient.delete(`/navers/${id}`);
