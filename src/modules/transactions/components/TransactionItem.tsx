import React from 'react';
import { Transaction } from '@/types';
import { formatCurrency } from '@/utils/format';

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const typeName = transaction.type.id.toLowerCase();

  const isIncome = typeName === 'income-type';
  const isExpense = typeName === 'expense-type';
  const isTransfer = typeName === 'transfer-type';

  const isPositive = isIncome;
  const isNegative = isExpense;
  const isNetral = isTransfer;

  const amountColor = isPositive
    ? 'text-green-600'
    : isNegative
    ? 'text-red-600'
    : isNetral
    ? transaction.category.id.includes('in-trans') 
      ? 'text-blue-600'  // Transfer Masuk (Biru)
      : transaction.category.id.includes('out-trans')
      ? 'text-yellow-500' // Transfer Keluar (Kuning)
      : 'text-neutral-800' // Default
    : 'text-neutral-800';

  const amountSign = isPositive ? '+' : isNegative ? '-' : '';

  const secondaryText = isTransfer
    ? `Transfer • ${transaction.source.name}${transaction.targetSource ? ` → ${transaction.targetSource.name}` : ''}`
    : `${transaction.type.name}`;

  // Ikon transfer masuk dan keluar
  const transferIcon = transaction.category.id.includes('in-trans') ? (
    <span className="text-blue-600">⬆️</span> // Transfer Masuk
  ) : transaction.category.id.includes('out-trans') ? (
    <span className="text-yellow-500">⬇️</span> // Transfer Keluar
  ) : null;

  return (
    <div className="py-3 border-b border-neutral-100 text-sm">
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="truncate font-medium">
          {transaction.description || transaction.category.name}
        </div>
        <div className="text-neutral-500 truncate">
          {transaction.category.name}
        </div>
        <div className={`text-right font-semibold ${amountColor}`}>
          {amountSign}
          {formatCurrency(transaction.amount)}
        </div>
      </div>
      <div className="mt-1 text-xs text-neutral-400">
        {isTransfer ? (
          <div className="flex items-center space-x-1">
            {/* Ikon Transfer */}
            {transferIcon}
            <span>{secondaryText}</span>
          </div>
        ) : (
          secondaryText
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
