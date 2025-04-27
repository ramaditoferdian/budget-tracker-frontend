'use client';

import { formatCurrency } from '@/utils/format';
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
  const [selectedMonth, setSelectedMonth] = useState<number>(3); // April (month index is 0-based)
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [calendarData, setCalendarData] = useState<CalendarData[]>([]);

  const fetchCalendarData = async () => {
    // Data dummy untuk April 2025
    const dummyData = [
      {
        date: '2025-04-01',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-02',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-03',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-04',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-05',
        types: {
          'expense-type': 102500,
        },
        netAmount: -102500,
      },
      {
        date: '2025-04-06',
        types: {
          'expense-type': 671765,
          'transfer-type': 479000,
        },
        netAmount: -671765,
      },
      {
        date: '2025-04-07',
        types: {
          'expense-type': 124900,
          'transfer-type': 42400,
        },
        netAmount: -124900,
      },
      {
        date: '2025-04-08',
        types: {
          'expense-type': 35300,
          'transfer-type': 42400,
        },
        netAmount: -35300,
      },
      {
        date: '2025-04-09',
        types: {
          'expense-type': 89588,
          'transfer-type': 42400,
        },
        netAmount: -89588,
      },
      {
        date: '2025-04-10',
        types: {
          'expense-type': 48600,
        },
        netAmount: -48600,
      },
      {
        date: '2025-04-11',
        types: {
          'expense-type': 35000,
        },
        netAmount: -35000,
      },
      {
        date: '2025-04-12',
        types: {
          'expense-type': 115000,
          'transfer-type': 55240,
        },
        netAmount: -115000,
      },
      {
        date: '2025-04-13',
        types: {
          'expense-type': 132900,
          'transfer-type': 300000,
        },
        netAmount: -132900,
      },
      {
        date: '2025-04-14',
        types: {
          'expense-type': 26400,
          'transfer-type': 48000,
        },
        netAmount: -26400,
      },
      {
        date: '2025-04-15',
        types: {
          'expense-type': 44000,
        },
        netAmount: -44000,
      },
      {
        date: '2025-04-16',
        types: {
          'expense-type': 98000,
        },
        netAmount: -98000,
      },
      {
        date: '2025-04-17',
        types: {
          'expense-type': 298000,
        },
        netAmount: -298000,
      },
      {
        date: '2025-04-18',
        types: {
          'expense-type': 182000,
          'transfer-type': 108500,
        },
        netAmount: -182000,
      },
      {
        date: '2025-04-19',
        types: {
          'expense-type': 284640,
          'income-type': 2000000,
        },
        netAmount: 1715360,
      },
      {
        date: '2025-04-20',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-21',
        types: {
          'expense-type': 130000,
        },
        netAmount: -130000,
      },
      {
        date: '2025-04-22',
        types: {
          'expense-type': 1232846,
          'transfer-type': 74100,
        },
        netAmount: -1232846,
      },
      {
        date: '2025-04-23',
        types: {
          'expense-type': 43800,
        },
        netAmount: -43800,
      },
      {
        date: '2025-04-24',
        types: {
          'expense-type': 52000,
        },
        netAmount: -52000,
      },
      {
        date: '2025-04-25',
        types: {
          'expense-type': 200020,
          'transfer-type': 82300,
        },
        netAmount: -200020,
      },
      {
        date: '2025-04-26',
        types: {
          'expense-type': 49500,
        },
        netAmount: -49500,
      },
      {
        date: '2025-04-27',
        types: {
          'expense-type': 49000,
          'transfer-type': 36500,
        },
        netAmount: -49000,
      },
      {
        date: '2025-04-28',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-29',
        types: {},
        netAmount: 0,
      },
      {
        date: '2025-04-30',
        types: {},
        netAmount: 0,
      },
    ];

    setCalendarData(dummyData);
  };

  useEffect(() => {
    fetchCalendarData();
  }, [selectedMonth, selectedYear]);

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
    const data = calendarData.find((item) => new Date(item.date).getDate() === date);
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

  return (
    <div className="w-full minw-[400px] max-w-3xl mx-auto p-4 mb-16">
      <h1 className="text-2xl font-semibold mb-4">Calendar View</h1>

      <div className="flex justify-between mb-4">
        <div>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="p-2 border rounded-md"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border rounded-md"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
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
              <div className={`w-full text-[10px] text-center p-1 truncate ${amountColor}`}>
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
              className={`flex justify-between items-center p-4 mb-2 rounded-lg border ${amountColor} shadow-md`} // Memberikan warna dan shadow untuk kartu
            >
              <div>
                <div className="text-lg font-medium">
                  {date} {months[selectedMonth]}
                </div>{' '}
                {/* Tanggal dan bulan */}
                <div className="text-sm text-gray-600">{dayName}</div> {/* Nama hari */}
              </div>
              <div className="text-sm font-medium">
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
