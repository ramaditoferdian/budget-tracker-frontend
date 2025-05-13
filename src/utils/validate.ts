export const isValidDateParam = (date: string | null) => {
  if (!date) return false;

  // Terima format "yyyy-M-d" atau "yyyy-MM-dd"
  return /^\d{4}-\d{1,2}-\d{1,2}$/.test(date);
};
