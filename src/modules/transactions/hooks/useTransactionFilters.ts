// src/modules/transactions/hooks/useTransactionFilter.ts
import { useTransactionFilterStore } from '../stores/transactionFilterStore';

export const useTransactionFilters = () => {
  const {
    typeIds,
    categoryIds,
    sourceIds,
    startDate,
    endDate,
    setTypeIds,
    setCategoryIds,
    setSourceIds,
    setStartDate,
    setEndDate,
    resetFilters,
  } = useTransactionFilterStore();

  return {
    typeIds,
    categoryIds,
    sourceIds,
    startDate,
    endDate,
    setTypeIds,
    setCategoryIds,
    setSourceIds,
    setStartDate,
    setEndDate,
    resetFilters,
  };
};
