import { AxiosResponse } from 'axios';
import { fetchClient } from 'src/providers';

export interface NaverData {
  id: any;
  name: string;
  admissionDate: string;
  job_role: string;
  user_id: string;
  project: string;
  birthdate: string;
  url: string;
}

export const getNavers = (): Promise<AxiosResponse<any>> => fetchClient.get('/navers');
