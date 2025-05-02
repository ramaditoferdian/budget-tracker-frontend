// src/modules/dashboard/stores/dashboardFilterStore.ts
import { getMonth, getYear } from 'date-fns';
import { create } from 'zustand';

interface DashboardFilterStore {
  month: number; // 1-12
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  reset: () => void;
}

export const useDashboardFilterStore = create<DashboardFilterStore>((set) => {
  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  return {
    month: currentMonth,
    year: currentYear,
    setMonth: (month) => set({ month }),
    setYear: (year) => set({ year }),
    reset: () =>
      set({
        month: currentMonth,
        year: currentYear,
      }),
  };
});
