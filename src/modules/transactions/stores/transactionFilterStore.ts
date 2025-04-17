// src/modules/transactions/stores/transactionFilterStore.ts
import { create } from 'zustand';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface TransactionFilterStore {
  typeId?: string;
  categoryId?: string;
  startDate?: string; // Store as a string in YYYY-MM-DD format
  endDate?: string;   // Store as a string in YYYY-MM-DD format
  setTypeId: (id?: string) => void;
  setCategoryId: (id?: string) => void;
  setStartDate: (date?: string) => void;
  setEndDate: (date?: string) => void;
  resetFilters: () => void;
}

export const useTransactionFilterStore = create<TransactionFilterStore>((set) => {
  // Mendapatkan tanggal sekarang
  const now = new Date();

  // Mengatur startDate ke awal bulan ini
  const startDate = format(startOfMonth(now), 'yyyy-MM-dd'); // Format ke YYYY-MM-DD

  // Mengatur endDate ke akhir bulan ini
  const endDate = format(endOfMonth(now), 'yyyy-MM-dd'); // Format ke YYYY-MM-DD

  return {
    typeId: undefined,
    categoryId: undefined,
    startDate, // Default ke awal bulan ini
    endDate,   // Default ke akhir bulan ini
    setTypeId: (typeId) => set({ typeId }),
    setCategoryId: (categoryId) => set({ categoryId }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
    resetFilters: () =>
      set({
        typeId: undefined,
        categoryId: undefined,
        startDate, // Reset ke awal bulan ini
        endDate,   // Reset ke akhir bulan ini
      }),
  };
});
