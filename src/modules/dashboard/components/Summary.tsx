'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, DollarSign, LineChart, PiggyBank, Wallet } from 'lucide-react';
import { format, subMonths, addMonths } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactionSummary } from '@/modules/transactions/hooks/useTransactions';
import { useDashboardFilters } from '../hooks/useDashboardFilters';
import { formatCurrency } from '@/utils/format';

export default function Summary() {
  const {
    month: selectedMonth,
    year: selectedYear,
    setMonth: setSelectedMonth,
    setYear: setSelectedYear,
  } = useDashboardFilters();

  const currentMonth = useMemo(() => selectedMonth + 1, [selectedMonth]);
  const currentYear = useMemo(() => selectedYear, [selectedYear]);

  const { data, isLoading } = useTransactionSummary({
    month: `${currentYear}-${currentMonth.toString().padStart(2, '0')}`,
  });

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 mt-4">
        <div className="flex items-center gap-2 font-semibold">
          <Wallet className="h-5 w-5" />
          <span className="text-sm lg:text-lg">Finance Tracker</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-xs sm:text-sm font-medium">
            {format(new Date(selectedYear, selectedMonth, 1), 'MMMM yyyy')}
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Summary</h1>
            <p className="text-muted-foreground">Summary of your finances</p>
          </div>
        </div>
        <Separator />

        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            <Card className="min-w-[240px] w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    <div className="text-2xl sm:text-xl lg:text-2xl 2xl:text-xl font-bold">
                      {data?.data ? formatCurrency(data.data.totalPemasukan) : 'N/A'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="min-w-[240px] w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-rose-500" />
                    <div className="text-2xl sm:text-xl lg:text-2xl 2xl:text-xl font-bold">
                      {data?.data ? formatCurrency(data.data.totalPengeluaran) : 'N/A'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="min-w-[240px] w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                    <div className="text-2xl sm:text-xl lg:text-2xl 2xl:text-xl font-bold">
                      {data?.data ? formatCurrency(data.data.totalTabungan) : 'N/A'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="min-w-[240px] w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-36" />
                ) : (
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-violet-500" />
                    <div className="text-2xl sm:text-xl lg:text-2xl 2xl:text-xl font-bold">
                      {data?.data ? formatCurrency(data.data.netAmount) : 'N/A'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Financial summary for </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span>Income</span>
                      </div>
                      <span className="font-medium">
                        {data?.data ? formatCurrency(data.data.totalPemasukan) : 'N/A'}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width:
                            data?.data &&
                            data.data.totalPemasukan > 0 &&
                            data.data.totalPengeluaran > 0
                              ? `${(data.data.totalPemasukan / (data.data.totalPemasukan + data.data.totalPengeluaran)) * 100}%`
                              : '0%',
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span>Expenses</span>
                      </div>
                      <span className="font-medium">
                        {data?.data ? formatCurrency(data.data.totalPengeluaran) : 'N/A'}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-rose-500"
                        style={{
                          width:
                            data?.data &&
                            data.data.totalPemasukan > 0 &&
                            data.data.totalPengeluaran > 0
                              ? `${(data.data.totalPengeluaran / (data.data.totalPemasukan + data.data.totalPengeluaran)) * 100}%`
                              : '0%',
                        }}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Net Balance</span>
                    <span className="text-xl font-bold">
                      {data?.data ? formatCurrency(data.data.netAmount) : 'N/A'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
