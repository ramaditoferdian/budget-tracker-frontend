import { get, post, put, del } from '@/lib/fetcher';
import { CategoryDetailResponse, CategoryListResponse, CategoryPayload } from '@/types';

export const getCategories = () =>
  get<CategoryListResponse>('/categories');

export const createCategory = (payload: CategoryPayload) =>
  post<CategoryDetailResponse>('/categories', payload);

export const updateCategory = (id: string, payload: CategoryPayload) =>
  put<CategoryDetailResponse>(`/categories/${id}`, payload);

export const deleteCategory = (id: string) =>
  del(`/categories/${id}`);
