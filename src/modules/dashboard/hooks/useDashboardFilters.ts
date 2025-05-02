// src/modules/transactions/hooks/useDashboardFilter.ts
import { useDashboardFilterStore } from './../stores/dashboardFilterStore';
export const useDashboardFilters = () => {
  const { month, year, setMonth, setYear } = useDashboardFilterStore();

  return {
    month,
    year,
    setMonth,
    setYear,
  };
};
