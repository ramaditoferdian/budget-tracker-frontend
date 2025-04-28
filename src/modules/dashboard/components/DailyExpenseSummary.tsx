'use client';

import { useState, useEffect } from 'react';

interface DailyExpense {
  date: string;
  netAmount: number;
}

const DailyExpenseSummary = () => {
  const [dailyExpenses, setDailyExpenses] = useState<DailyExpense[]>([]);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { date: '2025-04-01', netAmount: 150000 },
        { date: '2025-04-02', netAmount: -50000 },
        { date: '2025-04-03', netAmount: 0 },
        { date: '2025-04-04', netAmount: 250000 },
        // More dummy data
      ];
      setDailyExpenses(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pengeluaran Harian</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dailyExpenses.map((expense) => (
          <div
            key={expense.date}
            className={`p-4 rounded-lg shadow-lg ${
              expense.netAmount < 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-medium">
                {new Date(expense.date).toLocaleDateString()}
              </span>
              <span
                className={`text-xl font-bold ${
                  expense.netAmount < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                Rp {Math.abs(expense.netAmount).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm">
                {expense.netAmount > 0 ? 'Pengeluaran normal' : 'Pengeluaran tinggi'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyExpenseSummary;
