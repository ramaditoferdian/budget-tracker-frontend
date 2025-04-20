// src/modules/categories/hooks/useCategories.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/categoryService'
import { CategoryListResponse, CategoryPayload } from '@/types'
import { usePessimisticUpdate } from '@/hooks/usePessimisticUpdate' // ← import hook global

export const useCategories = () => {
  return useQuery<CategoryListResponse, Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data,
  })
}

export const useCreateCategory = () => {
  const { onSuccess, onError } = usePessimisticUpdate('categories')

  return useMutation({
    mutationFn: (payload: CategoryPayload) => createCategory(payload),
    onSuccess,
    onError,
  })
}

export const useUpdateCategory = () => {
  const { onSuccess, onError } = usePessimisticUpdate('categories')

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CategoryPayload }) =>
      updateCategory(id, payload),
    onSuccess,
    onError,
  })
}

export const useDeleteCategory = () => {
  const { onSuccess, onError } = usePessimisticUpdate('categories')

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess,
    onError,
  })
}
