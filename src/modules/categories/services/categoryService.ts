import { get, post, put, del } from '@/lib/fetcher';
import { CategoryDetailResponse, CategoryListResponse, CategoryPayload } from '@/types';
import qs from 'qs';

export const getCategories = (params?: Record<string, any>) => {
  const queryString = params ? `?${qs.stringify(params)}` : ''
  return get<CategoryListResponse>(`/categories${queryString}`)
}

export const createCategory = (payload: CategoryPayload) =>
  post<CategoryDetailResponse>('/categories', payload);

export const updateCategory = (id: string, payload: CategoryPayload) =>
  put<CategoryDetailResponse>(`/categories/${id}`, payload);

export const deleteCategory = (id: string) =>
  del(`/categories/${id}`);
