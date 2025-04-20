// src/modules/transactions/hooks/useTransactionTypes.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTransactionType, deleteTransactionType, getTransactionTypes, updateTransactionType } from '../services/transactionTypeService'
import { TransactionTypeListResponse, TransactionTypePayload } from '@/types'
import { usePessimisticUpdate } from '@/hooks/usePessimisticUpdate' // ← import hook global

export const useTransactionTypes = () => {
  return useQuery<TransactionTypeListResponse, Error>({
    queryKey: ['transaction-types'],
    queryFn: getTransactionTypes,
    select: (data) => data,
  })
}

export const useCreateTransactionType = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transaction-types')
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (payload: TransactionTypePayload) => createTransactionType(payload),
    onSuccess,
    onError,
  })

  return { mutate, isPending, isError, isSuccess }
}

export const useUpdateTransactionType = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transaction-types')
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionTypePayload }) =>
      updateTransactionType(id, payload),
    onSuccess,
    onError,
  })

  return { mutate, isPending, isError, isSuccess }
}

export const useDeleteTransactionType = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transaction-types')
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (id: string) => deleteTransactionType(id),
    onSuccess,
    onError,
  })

  return { mutate, isPending, isError, isSuccess }
}
