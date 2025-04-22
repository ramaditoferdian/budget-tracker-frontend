// src/modules/transactions/hooks/useTransactions.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService';
import {
  TransactionListResponse,
  TransactionPayload,
  TransactionQueryParams,
} from '@/types';
import { usePessimisticUpdate } from '@/hooks/usePessimisticUpdate';

export const useTransactions = (params: TransactionQueryParams = {}) => {
  return useQuery<TransactionListResponse, Error>({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
    select: (data) => data,
    placeholderData: (prev) => prev, // tetap gunakan data sebelumnya saat loading
  });
};

export const useCreateTransaction = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transactions');
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (payload: TransactionPayload) => createTransaction(payload),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const useUpdateTransaction = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transactions');
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TransactionPayload;
    }) => updateTransaction(id, payload),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const useDeleteTransaction = () => {
  const { onSuccess, onError } = usePessimisticUpdate('transactions');
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};