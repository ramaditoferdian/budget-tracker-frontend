'use client';

import Loading from '@/components/Loading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTransactionCalendar } from '@/modules/transactions/hooks/useTransactions';
import { formatCurrency } from '@/utils/format';
import { getMonth } from 'date-fns';
import { CalendarDaysIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface CalendarData {
  date: string;
  types:
    | {
        [key: string]: number;
      }
    | {};
  netAmount: number;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
const getLastDayOfMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDay();
const getTotalDaysInPrevMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const BigCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(3);
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const monthParam = useMemo(() => {
    const month = (selectedMonth + 1).toString().padStart(2, '0');
    return `${selectedYear}-${month}`;
  }, [selectedMonth, selectedYear]);

  const {
    data: calendarData,
    isLoading: isLoadingCalendarData,
    error: errorCalendarData,
  } = useTransactionCalendar({ month: monthParam });

  const totalDaysInMonth = useMemo(
    () => getDaysInMonth(selectedMonth + 1, selectedYear),
    [selectedMonth, selectedYear]
  );
  const firstDayOfMonth = useMemo(
    () => getFirstDayOfMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );
  const lastDayOfMonth = useMemo(
    () => getLastDayOfMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );
  const totalDaysInPrevMonth = useMemo(
    () => getTotalDaysInPrevMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );
  const totalDaysInNextMonth = useMemo(() => 7 - lastDayOfMonth - 1, [lastDayOfMonth]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedMonth(parseInt(event.target.value));
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedYear(parseInt(event.target.value));

  const getNetAmountForDate = (date: number): number => {
    const data = calendarData?.data.find((item) => new Date(item.date).getDate() === date);
    return data ? data.netAmount : 0;
  };

  const getAmountColor = (netAmount: number) => {
    if (netAmount > 0) {
      return 'bg-green-100 text-green-700'; // Light green for positive (Income)
    } else if (netAmount < 0) {
      return 'bg-red-100 text-red-700'; // Light red for negative (Expense)
    } else {
      return 'bg-amber-100 text-amber-700'; // Light yellow for zero (No Transaction)
    }
  };

  if (isLoadingCalendarData) {
    return <Loading />;
  }

  return (
    <div className="w-full minw-[400px] max-w-3xl mx-auto p-4 mb-16">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDaysIcon className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold xl:hidden">Monthly Summary</h1> {/* Mobile */}
        <h1 className="text-2xl font-semibold hidden xl:block">Calendar View</h1> {/* Desktop */}
      </div>

      <div className="flex gap-4 mb-6 items-center w-full">
        {/* Select Bulan */}
        <Select
          value={selectedMonth.toString()}
          onValueChange={(value) => setSelectedMonth(Number(value))}
          disabled={isLoadingCalendarData}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select Tahun */}
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
          disabled={isLoadingCalendarData}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {[2025, 2026].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid untuk Desktop */}
      <div className="hidden xl:grid grid-cols-7 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold text-sm text-gray-600">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }, (_, index) => {
          const prevMonthDay = totalDaysInPrevMonth - firstDayOfMonth + index + 1;
          return (
            <div
              key={`prev-${prevMonthDay}`}
              className="flex justify-center items-center text-sm text-gray-400 min-w-[60px] min-h-[60px] aspect-square border border-gray-200"
            >
              <span>{prevMonthDay}</span>
            </div>
          );
        })}

        {Array.from({ length: totalDaysInMonth }, (_, index) => {
          const day = index + 1;
          const netAmount = getNetAmountForDate(day);
          const amountColor = getAmountColor(netAmount);
          return (
            <div
              key={day}
              className={`flex flex-col justify-between items-center text-sm text-center min-w-[60px] min-h-[60px] aspect-square border border-gray-200 relative`}
            >
              {/* Tanggal di tengah */}
              <div className="flex-grow flex items-center justify-center">
                <span className="font-medium">{day}</span>
              </div>

              {/* Nominal di bawah, dengan warna sesuai netAmount */}
              <div className={`w-full text-[10px] text-center truncate ${amountColor}`}>
                {formatCurrency(netAmount)}
              </div>
            </div>
          );
        })}

        {Array.from({ length: totalDaysInNextMonth }, (_, index) => {
          const nextMonthDay = index + 1;
          return (
            <div
              key={`next-${nextMonthDay}`}
              className="flex justify-center items-center text-sm text-gray-400 min-w-[60px] min-h-[60px] aspect-square border border-gray-200"
            >
              <span>{nextMonthDay}</span>
            </div>
          );
        })}
      </div>

      {/* Tampilan Mobile - List Vertikal */}
      <div className="xl:hidden">
        {Array.from({ length: totalDaysInMonth }).map((_, index) => {
          const date = index + 1;
          const netAmount = getNetAmountForDate(date);
          const amountColor = getAmountColor(netAmount); // Untuk menentukan warna berdasarkan netAmount
          const dayName = new Date(selectedYear, selectedMonth, date).toLocaleString('en-US', {
            weekday: 'long',
          }); // Mendapatkan nama hari

          return (
            <div
              key={date}
              className={`flex justify-between items-center p-4 mb-2 rounded-lg border shadow-md`} // Memberikan warna dan shadow untuk kartu
            >
              <div>
                <div className="text-base font-medium">
                  {date} {months[selectedMonth]}
                </div>{' '}
                {/* Tanggal dan bulan */}
                <div className="text-sm text-gray-500">{dayName}</div> {/* Nama hari */}
              </div>
              <div className={`text-sm font-medium ${amountColor} p-1 rounded-md text-end`}>
                {formatCurrency(netAmount)} {/* Nominal transaksi */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
