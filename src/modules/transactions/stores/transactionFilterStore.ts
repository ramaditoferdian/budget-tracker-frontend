// src/modules/transactions/stores/transactionFilterStore.ts
import { create } from 'zustand';
import { startOfMonth, endOfMonth, format } from 'date-fns';

// Helper untuk ambil dan validasi tanggal dari URL
const getDateFromUrl = (param: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get(param);
  return date && !isNaN(Date.parse(date)) ? date : undefined;
};

interface TransactionFilterStore {
  typeIds: string[];
  categoryIds: string[];
  sourceIds: string[];
  startDate?: string;
  endDate?: string;
  setTypeIds: (ids: string[]) => void;
  setCategoryIds: (ids: string[]) => void;
  setSourceIds: (ids: string[]) => void;
  setStartDate: (date?: string) => void;
  setEndDate: (date?: string) => void;
  resetFilters: () => void;
}

export const useTransactionFilterStore = create<TransactionFilterStore>((set) => {
  const now = new Date();
  const urlStartDate = getDateFromUrl('start_date');
  const urlEndDate = getDateFromUrl('end_date');

  const defaultStartDate = urlStartDate ?? format(startOfMonth(now), 'yyyy-MM-dd');
  const defaultEndDate = urlEndDate ?? format(endOfMonth(now), 'yyyy-MM-dd');

  return {
    typeIds: [],
    categoryIds: [],
    sourceIds: [],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    setTypeIds: (typeIds) => set({ typeIds }),
    setCategoryIds: (categoryIds) => set({ categoryIds }),
    setSourceIds: (sourceIds) => set({ sourceIds }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
    resetFilters: () =>
      set({
        typeIds: [],
        categoryIds: [],
        sourceIds: [],
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      }),
  };
});
