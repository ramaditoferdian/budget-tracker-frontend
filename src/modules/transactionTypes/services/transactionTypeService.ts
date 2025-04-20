// src/modules/transactions/services/transactionTypeService.ts
import { get, post, put, del } from '@/lib/fetcher'
import {
  TransactionTypePayload,
  TransactionTypeListResponse,
  TransactionTypeDetailResponse,
} from '@/types'

export const getTransactionTypes = () =>
  get<TransactionTypeListResponse>('/transaction-types')

export const createTransactionType = (payload: TransactionTypePayload) =>
  post<TransactionTypeDetailResponse>('/transaction-types', payload)

export const updateTransactionType = (id: string, payload: TransactionTypePayload) =>
  put<TransactionTypeDetailResponse>(`/transaction-types/${id}`, payload)

export const deleteTransactionType = (id: string) =>
  del(`/transaction-types/${id}`)
