import React from 'react';
import { Transaction } from '@/types';
import { formatCurrency } from '@/utils/format';

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const typeName = transaction.type.name.toLowerCase();

  const isIncome = typeName === 'pemasukan';
  const isExpense = typeName === 'pengeluaran';
  const isTransfer = typeName === 'transfer' || typeName === 'tabungan';

  const amountColor = isIncome
    ? 'text-green-600'
    : isExpense
    ? 'text-red-600'
    : isTransfer
    ? 'text-blue-600'
    : 'text-neutral-800';

  const amountSign = isIncome ? '+' : isExpense ? '-' : '';

  const categoryName = transaction.category?.name || (isTransfer ? 'Transfer' : 'Tanpa Kategori');
  const sourceName = transaction.source?.name || 'Sumber tidak dikenal';
  const targetName = transaction.targetSource?.name || '';

  const secondaryText = isTransfer
    ? `Transfer • ${sourceName}${targetName ? ` → ${targetName}` : ''}`
    : transaction.type.name;

  const transferIcon = isTransfer ? (
    <span className="text-blue-500 mr-1">🔁</span>
  ) : null;

  return (
    <div className="py-3 border-b border-neutral-100 text-sm flex flex-col gap-y-2 sm:gap-y-0">
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-2 sm:items-center">
        {/* Row 1 - Left Side Info */}
        <div className="flex flex-col max-w-full space-y-2">
          <span className="font-medium line-clamp-2 break-words">{transaction.description || categoryName}</span>
          <span className="text-neutral-500 text-xs sm:hidden break-words">{categoryName}</span>
        </div>

        {/* Row 1 - Center (hidden on mobile, shown on sm+) */}
        <div className="hidden sm:block text-neutral-500 truncate text-center">
          {categoryName}
        </div>

        {/* Row 1 - Amount */}
        <div className={`font-semibold ${amountColor} text-left sm:text-right`}>
          {amountSign}
          {formatCurrency(transaction.amount)}
        </div>
      </div>

      {/* Row 2 - Detail */}
      <div className="mt-1 text-xs text-neutral-400">
        {/* Mobile layout: stack detail info */}
        <div className="flex flex-col sm:hidden">
          <div className="flex items-center space-x-1">
            {transferIcon}
            <span>{transaction.type.name}</span> {/* <- Tidak hardcode lagi */}
          </div>
          {isTransfer && (
            <span>
              {sourceName}
              {targetName ? ` → ${targetName}` : ''}
            </span>
          )}
        </div>

        {/* Desktop layout: inline */}
        <div className="hidden sm:flex items-center space-x-1">
          {transferIcon}
          <span>{secondaryText}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
