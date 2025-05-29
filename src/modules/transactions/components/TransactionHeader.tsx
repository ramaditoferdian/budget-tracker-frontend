'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import TransactionFormDialog from './TransactionFormDialog';
import { useDialog } from '@/hooks/useDialog';
import { useTransactionFilters } from '@/modules/transactions/hooks/useTransactionFilters';
import TransactionFilters2 from './TransactionFilters2';

const TransactionsHeader = () => {
  const { open, setOpen } = useDialog('transaction-form:create');
  const { resetFilters, setTypeIds, setCategoryIds, setSourceIds, setStartDate, setEndDate } =
    useTransactionFilters();

  return (
    <>
      <TransactionFormDialog mode="create" open={open} setOpen={setOpen} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <TransactionFilters2
          onSubmit={(filters) => {
            setTypeIds(filters.typeIds);
            setCategoryIds(filters.categoryIds);
            setSourceIds(filters.sourceIds);
            setStartDate(filters.startDate || undefined);
            setEndDate(filters.endDate || undefined);
          }}
          onReset={resetFilters}
        />

        <Button onClick={() => setOpen(true)} variant="default">
          Add Transaction
        </Button>
      </div>
    </>
  );
};

export default TransactionsHeader;
