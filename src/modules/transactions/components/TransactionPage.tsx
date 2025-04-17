'use client';

import React, { useMemo, useState } from 'react';
import TransactionList from './TransactionList';
import TransactionsHeader from '@/modules/transactions/components/TransactionHeader';
import Loading from '@/components/Loading';
import { useTransactions } from '@/modules/transactions/hooks/useTransactions';
import { useTransactionFilters } from '@/modules/transactions/hooks/useTransactionFilters';
import { TransactionQueryParams } from '@/types';
import TablePagination from '@/components/TablePagination';

const TransactionsPage: React.FC = () => {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Ambil filter dari store
  const { typeId, categoryId, startDate, endDate } = useTransactionFilters();

  // Generate params dengan useMemo agar efisien
  const params: TransactionQueryParams = useMemo(() => ({
    page: currentPage,
    limit: itemsPerPage,
    typeId,
    categoryId,
    startDate,
    endDate,
    sortBy: 'date',
    order: 'desc',
  }), [currentPage, itemsPerPage, typeId, categoryId, startDate, endDate]);

  // Ambil data transaksi
  const { data, isLoading, isError, error } = useTransactions(params);

  // Extract data dari response
  const transactions = data?.data.transactions || [];
  const pagination = data?.data.pagination;
  const totalPages = pagination?.pageCount || 1;
  const totalItems = pagination?.rowsCount || 0;

  // Handle UI State
  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center py-10">Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <>
      <TransactionsHeader onAddClick={() => console.log('Add clicked')} />

      <TransactionList transactions={transactions} />

      <TablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        rowsCount={totalItems}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
      />
    </>
  );
};

export default TransactionsPage;
