// src/modules/transactions/hooks/useTransactionFilter.ts
import { useTransactionFilterStore } from '../stores/transactionFilterStore';

export const useTransactionFilters = () => {
  const {
    typeId,
    categoryId,
    startDate,
    endDate,
    setTypeId,
    setCategoryId,
    setStartDate,
    setEndDate,
    resetFilters,
  } = useTransactionFilterStore();

  return {
    typeId,
    categoryId,
    startDate,
    endDate,
    setTypeId,
    setCategoryId,
    setStartDate,
    setEndDate,
    resetFilters,
  };
};
