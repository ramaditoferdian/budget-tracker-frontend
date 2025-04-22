"use client";

import React, { useMemo, useState } from "react";
import TransactionList from "./TransactionList";
import TransactionsHeader from "@/modules/transactions/components/TransactionHeader";
import Loading from "@/components/Loading";
import { useTransactions } from "@/modules/transactions/hooks/useTransactions";
import { useTransactionFilters } from "@/modules/transactions/hooks/useTransactionFilters";
import { TransactionQueryParams } from "@/types";
import TablePagination from "@/components/TablePagination";

const TransactionsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { typeId, categoryId, startDate, endDate } = useTransactionFilters();

  const params: TransactionQueryParams = useMemo(
    () => ({
      page: currentPage,
      limit: itemsPerPage,
      typeId,
      categoryId,
      startDate,
      endDate,
      sortBy: "date",
      order: "desc",
    }),
    [currentPage, itemsPerPage, typeId, categoryId, startDate, endDate]
  );

  const { data, isLoading, isError, error } = useTransactions(params);

  const transactions = data?.data.transactions || [];
  const pagination = data?.data.pagination;
  const totalPages = pagination?.pageCount || 1;
  const totalItems = pagination?.rowsCount || 0;

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-4 h-full">
      {/* Header */}
      <TransactionsHeader />

      {/* Scrollable List */}
      <div className="flex-1 mt-4 overflow-y-auto min-h-[300px] h-full pr-5">
        <TransactionList transactions={transactions} />
      </div>

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
