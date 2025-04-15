import { get, post, put, del } from "@/lib/fetcher";
import { TransactionCalendarResponse, TransactionListResponse, TransactionPayload, TransactionQueryParams, TransactionSummaryResponse } from "@/types";

export const getTransactions = (params?: TransactionQueryParams) =>
  get<TransactionListResponse>("/transactions", params);

export const getTransactionCalendar = (month: string) =>
  get<TransactionCalendarResponse>("/transactions/calendar", { month });

export const getTransactionSummary = (month: string) =>
  get<TransactionSummaryResponse>("/transactions/summary", { month });

export const getTransactionById = (id: string) =>
  get(`/transactions/${id}`);

export const createTransaction = (payload: TransactionPayload) =>
  post("/transactions", payload);

export const updateTransaction = (id: string, payload: TransactionPayload) =>
  put(`/transactions/${id}`, payload);

export const deleteTransaction = (id: string) =>
  del(`/transactions/${id}`);
