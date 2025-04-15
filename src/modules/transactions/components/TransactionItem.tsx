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

  // const isMutasiMasuk = isTransfer && transaction.category.id.includes('in-trans-cat');
  // const isMutasiKeluar = isTransfer && transaction.category.id.includes('out-trans-cat');

  const isPositive = isIncome;
  const isNegative = isExpense;
  const isNetral = isTransfer

  const amountColor = isPositive
    ? 'text-green-600'
    : isNegative
    ? 'text-red-600'
    : isNetral ? 'text-blue-500' : 'text-neutral-800';

  const amountSign = isPositive ? '+' : isNegative ? '-' : '';

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {/* Icon Placeholder */}
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm">
          🧾
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {transaction.description || transaction.category.name}
          </span>
          <span className="text-xs text-neutral-500">
            {transaction.category.name}
          </span>
        </div>
      </div>

      <div className={`text-sm font-semibold ${amountColor}`}>
        {amountSign}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
