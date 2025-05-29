'use client';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  FilterIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/format';
import { useState } from 'react';

interface RecapData {
  totalIncome: number;
  totalExpense: number;
}

interface FilterInfo {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  categoryName?: string | null;
  typeName?: string | null;
  sourceName?: string | null;
}

interface TransactionRecapProps {
  data?: RecapData;
  filters?: FilterInfo;
  className?: string;
  showNet?: boolean;
}

const TransactionRecap = ({
  data = {
    totalIncome: 0,
    totalExpense: 0,
  },
  filters,
  className = '',
}: TransactionRecapProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const formattedStartDate = filters?.startDate
    ? format(new Date(filters.startDate), 'd MMM yyyy')
    : null;

  const formattedEndDate = filters?.endDate
    ? format(new Date(filters.endDate), 'd MMM yyyy')
    : null;

  const hasFilters = !!(formattedStartDate || formattedEndDate);

  return (
    <Card className={`border shadow-sm ${className} lg:max-w-[340px] rounded-md`}>
      <CardHeader className="p-0 flex flex-col gap-3">
        {/* Trigger Button */}
        <Button variant="ghost" size="sm" onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? (
            <>
              <EyeOffIcon className="h-4 w-4 mr-1" />
              Hide Summary
            </>
          ) : (
            <>
              <EyeIcon className="h-4 w-4 mr-1" />
              Show Summary
            </>
          )}
        </Button>
      </CardHeader>

      {isVisible && (
        <CardContent className={`${hasFilters ? 'p-5 pt-4' : 'p-5'} space-y-4`}>
          <div className="space-y-4">
            {/* Income */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ArrowUpIcon className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium">Income</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(data.totalIncome)}</div>
                {data.totalIncome > 0 && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUpIcon className="h-3 w-3" />
                    <span>Income</span>
                  </div>
                )}
              </div>
            </div>

            {/* Expense */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                  <ArrowDownIcon className="h-4 w-4 text-rose-600" />
                </div>
                <span className="text-sm font-medium">Expense</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(data.totalExpense)}</div>
                {data.totalExpense > 0 && (
                  <div className="flex items-center gap-1 text-xs text-rose-600">
                    <TrendingDownIcon className="h-3 w-3" />
                    <span>Expense</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default TransactionRecap;
