'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyExpense {
  date: string;
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

const ExpenseAnalysis = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [dailyExpenses, setDailyExpenses] = useState<DailyExpense[]>([]);

  const fetchDailyExpenses = async (month: number, year: number) => {
    // Dummy data
    const data = [
      { date: '2025-04-01', netAmount: 150000 },
      { date: '2025-04-02', netAmount: -50000 },
      { date: '2025-04-03', netAmount: 0 },
      { date: '2025-04-04', netAmount: 250000 },
      { date: '2025-04-05', netAmount: -120000 },
      { date: '2025-04-06', netAmount: 0 },
      { date: '2025-04-07', netAmount: -30000 },
      { date: '2025-04-08', netAmount: 50000 },
      { date: '2025-04-09', netAmount: -40000 },
      { date: '2025-04-10', netAmount: 100000 },
      { date: '2025-04-11', netAmount: 0 },
      { date: '2025-04-12', netAmount: -150000 },
      { date: '2025-04-13', netAmount: 80000 },
      { date: '2025-04-14', netAmount: 0 },
      { date: '2025-04-15', netAmount: -200000 },
      { date: '2025-04-16', netAmount: 120000 },
      { date: '2025-04-17', netAmount: 0 },
      { date: '2025-04-18', netAmount: -50000 },
      { date: '2025-04-19', netAmount: 200000 },
      { date: '2025-04-20', netAmount: 0 },
      { date: '2025-04-21', netAmount: -70000 },
      { date: '2025-04-22', netAmount: 0 },
      { date: '2025-04-23', netAmount: 40000 },
      { date: '2025-04-24', netAmount: -30000 },
      { date: '2025-04-25', netAmount: 0 },
      { date: '2025-04-26', netAmount: 100000 },
      { date: '2025-04-27', netAmount: -100000 },
      { date: '2025-04-28', netAmount: 50000 },
      { date: '2025-04-29', netAmount: 0 },
      { date: '2025-04-30', netAmount: -120000 },
    ];

    setDailyExpenses(data);
  };

  useEffect(() => {
    fetchDailyExpenses(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  // Prepare chart data
  const chartData = {
    labels: dailyExpenses.map((expense) => new Date(expense.date).getDate().toString()),
    datasets: [
      {
        label: 'Pengeluaran Harian',
        data: dailyExpenses.map((expense) => expense.netAmount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
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
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border rounded-md"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            {/* Add more years if necessary */}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <Bar data={chartData} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Tanggal</th>
              <th className="px-4 py-2 border">Pengeluaran (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {dailyExpenses.map((expense) => (
              <tr key={expense.date}>
                <td className="px-4 py-2 border text-center">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">
                  {expense.netAmount !== 0
                    ? `Rp ${expense.netAmount.toLocaleString('id-ID')}`
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseAnalysis;
