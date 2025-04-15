import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (dateStr: string, formatStr = 'dd MMM yyyy') => {
  try {
    const parsedDate = parseISO(dateStr);
    return format(parsedDate, formatStr, { locale: id });
  } catch {
    return dateStr;
  }
};

export const formatToGroupLabel = (dateString: string): string => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'MMMM dd'); // contoh: April 14
};


export const formatCurrency = (amount: number, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};
