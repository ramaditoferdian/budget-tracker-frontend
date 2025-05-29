'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import TransactionList from './TransactionList';
import TransactionsHeader from '@/modules/transactions/components/TransactionHeader';
import { useTransactions } from '@/modules/transactions/hooks/useTransactions';
import { useTransactionFilters } from '@/modules/transactions/hooks/useTransactionFilters';
import { TransactionQueryParams } from '@/types';
import TablePagination from '@/components/TablePagination';
import TransactionsPageSkeleton from './TransactionPageSkeleton';
import TransactionRecap from './TransactionRecap';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import LoadingOverlay from '@/components/LoadingOverlay';

const TransactionsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { typeIds, categoryIds, sourceIds, startDate, endDate } = useTransactionFilters();

  const params: TransactionQueryParams = useMemo(
    () => ({
      page: currentPage,
      limit: itemsPerPage,
      typeIds,
      categoryIds,
      sourceIds,
      startDate,
      endDate,
      sortBy: 'date',
      order: 'desc',
    }),
    [currentPage, itemsPerPage, typeIds, categoryIds, sourceIds, startDate, endDate]
  );

  const { data, isLoading, isError, error, isFetching, isFetched } = useTransactions(params);

  const transactions = data?.data.transactions || [];
  const pagination = data?.data.pagination;
  const totalPages = pagination?.pageCount || 1;
  const totalItems = pagination?.rowsCount || 0;
  const recap = data?.data.recap;

  if (isLoading) return <TransactionsPageSkeleton />;

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-4 h-full">
      {/* Header */}
      <TransactionsHeader />
      <TransactionRecap data={recap} filters={params} />

      {/* Scrollable List */}
      <ScrollArea className="flex-1 mt-4 overflow-y-auto min-h-[300px] h-full pr-5 relative">
        <TransactionList transactions={transactions} isFetching={isFetching || !isFetched} />
        <ScrollBar orientation="vertical" className="transition-all duration-300" />
      </ScrollArea>

      {/* Pagination */}
      <div className="pt-4">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsCount={totalItems}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
