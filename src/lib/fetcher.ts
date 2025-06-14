import api from '@/lib/axios';
import qs from 'qs';

export const get = async <T>(url: string, params?: any): Promise<T> => {
  const res = await api.get(url, {
    params,
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    },
  });
  return res.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  const res = await api.post(url, data);
  return res.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
  const res = await api.put(url, data);
  return res.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const res = await api.delete(url);
  return res.data;
};
