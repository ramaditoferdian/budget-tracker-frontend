'use client';

import React, { useState } from 'react';
import { TransactionQueryParams } from '@/types';
import TransactionList from './TransactionList';
import { useTransactions } from '@/modules/transactions/hooks/useTransactions';
import Pagination from '@/components/Pagination';

const TransactionsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const params: TransactionQueryParams = {
    page: currentPage,
    limit: 10,
    // typeId: '123',         // optional
    // categoryId: 'abc',     // optional
    startDate: '2025-04-01', // optional
    endDate: '2025-04-30',   // optional
    sortBy: 'date',
    order: 'desc',
  };

  const { data, isLoading, isError, error } = useTransactions(params);

  const transactions = data?.data.transactions || [];
  const totalPages = data?.data.pagination.pageCount || 1;

  return (
    <div className="transactions-page">
      {/* Loading state */}
      {isLoading && <div>Loading...</div>}

      {/* Error handling */}
      {isError && <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>}

      {/* Transaction List */}
      <TransactionList transactions={transactions} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionsPage;
