// src/modules/transactions/hooks/useTransactions.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTransactions } from '../services/transactionService';
import { TransactionListResponse, TransactionQueryParams } from '@/types';

export const useTransactions = (params: TransactionQueryParams = {}) => {
  return useQuery<TransactionListResponse, Error>({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};
