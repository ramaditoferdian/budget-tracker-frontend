'use client';

import { useState, useMemo } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, set, subMonths } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTransactionCalendar } from '@/modules/transactions/hooks/useTransactions';
import { formatCurrency } from '@/utils/format';
import { useTransactionFilters } from '@/modules/transactions/hooks/useTransactionFilters';
import { useRouter } from 'next/navigation';
import { useDashboardFilters } from '../hooks/useDashboardFilters';

interface CalendarData {
  date: string;
  types: { [key: string]: number } | {};
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
  const router = useRouter();

  const {
    month: selectedMonth,
    year: selectedYear,
    setMonth: setSelectedMonth,
    setYear: setSelectedYear,
  } = useDashboardFilters();

  const { setStartDate, setEndDate } = useTransactionFilters();

  const monthParam = useMemo(() => {
    const month = (selectedMonth + 1).toString().padStart(2, '0');
    return `${selectedYear}-${month}`;
  }, [selectedMonth, selectedYear]);

  const { data: calendarData, isLoading: isLoadingCalendarData } = useTransactionCalendar({
    month: monthParam,
  });

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

  const getNetAmountForDate = (date: number): number => {
    const data = calendarData?.data.find((item) => new Date(item.date).getDate() === date);
    return data ? data.netAmount : 0;
  };

  const handlePreviousMonth = () => {
    const date = new Date(selectedYear, selectedMonth, 1);
    const prevMonth = subMonths(date, 1);
    setSelectedMonth(prevMonth.getMonth());
    setSelectedYear(prevMonth.getFullYear());
  };

  const handleNextMonth = () => {
    const date = new Date(selectedYear, selectedMonth, 1);
    const nextMonth = addMonths(date, 1);
    setSelectedMonth(nextMonth.getMonth());
    setSelectedYear(nextMonth.getFullYear());
  };

  if (isLoadingCalendarData) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(35)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="aspect-square h-16" />
            ))}
        </div>
      </div>
    );
  }

  const handleRowClick = (date: string) => {
    console.log(date);

    setStartDate(date);
    setEndDate(date);

    router.push('/transactions?start_date=' + date + '&end_date=' + date);
  };

  return (
    <div className="w-full lg:max-w-lg xl:max-w-2xl mx-auto py-4 space-y-6">
      <div className="sticky top-0 h-16 z-[3] border-b bg-background flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-sm lg:text-xl font-semibold">Daily Expenses</h1>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-xs sm:text-sm font-medium">
            {months[selectedMonth]} {selectedYear}
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center px-4">
        <Select
          value={selectedMonth.toString()}
          onValueChange={(value) => setSelectedMonth(Number(value))}
        >
          <SelectTrigger className="w-[140px]">
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

        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
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

      {/* Desktop Calendar Grid */}
      <div className="hidden sm:block md:hidden xl:block px-4">
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Previous month days */}
          {Array.from({ length: firstDayOfMonth }, (_, index) => {
            const prevMonthDay = totalDaysInPrevMonth - firstDayOfMonth + index + 1;
            return (
              <div
                key={`prev-${prevMonthDay}`}
                className="aspect-square p-1 border border-border/40 rounded-md text-muted-foreground/50"
              >
                <div className="text-xs">{prevMonthDay}</div>
              </div>
            );
          })}

          {/* Current month days */}
          {Array.from({ length: totalDaysInMonth }, (_, index) => {
            const day = index + 1;
            const netAmount = getNetAmountForDate(day);
            const isPositive = netAmount > 0;
            const isNegative = netAmount < 0;
            const isToday =
              day === new Date().getDate() &&
              selectedMonth === new Date().getMonth() &&
              selectedYear === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`aspect-square p-1 border rounded-md flex flex-col justify-between
                  ${isToday ? 'border-primary/50 bg-primary/5' : 'border-border/40'}
                  hover:border-primary/30 hover:bg-primary/5 transition-colors`}
              >
                <div className="text-xs font-medium">{day}</div>
                {netAmount !== 0 && (
                  <div
                    className={`text-[10px] font-medium mt-auto text-right
                    ${isPositive ? 'text-emerald-600' : ''}
                    ${isNegative ? 'text-rose-600' : ''}
                  `}
                  >
                    {formatCurrency(netAmount)}
                  </div>
                )}
              </div>
            );
          })}

          {/* Next month days */}
          {Array.from({ length: totalDaysInNextMonth }, (_, index) => {
            const nextMonthDay = index + 1;
            return (
              <div
                key={`next-${nextMonthDay}`}
                className="aspect-square p-1 border border-border/40 rounded-md text-muted-foreground/50"
              >
                <div className="text-xs">{nextMonthDay}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile List View */}
      <div className="flex flex-col sm:hidden md:flex xl:hidden space-y-2 px-4">
        {Array.from({ length: totalDaysInMonth }).map((_, index) => {
          const date = index + 1;
          const netAmount = getNetAmountForDate(date);
          const isPositive = netAmount > 0;
          const isNegative = netAmount < 0;
          const isToday =
            date === new Date().getDate() &&
            selectedMonth === new Date().getMonth() &&
            selectedYear === new Date().getFullYear();

          const dayName = new Date(selectedYear, selectedMonth, date).toLocaleString('en-US', {
            weekday: 'long',
          });

          const dateString = `${selectedYear}-${selectedMonth + 1}-${date}`;

          return (
            <Card
              key={date}
              className={`p-3 cursor-pointer ${isToday ? 'bg-primary/5 border-black/30' : ''}`}
              onClick={() => handleRowClick(dateString)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex flex-col items-center justify-center w-8 h-8 rounded-full bg-muted ${isToday ? 'bg-blue-500/70 text-white' : ''}`}
                  >
                    <span className="text-xs font-medium">{date}</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{months[selectedMonth]}</div>
                    <div className="text-xs font-medium">{dayName}</div>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium
                  ${netAmount === 0 ? 'text-blue-600' : ''}
                  ${isPositive ? 'text-green-600' : ''}
                  ${isNegative ? 'text-red-600' : ''}
                `}
                >
                  {formatCurrency(netAmount)}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
