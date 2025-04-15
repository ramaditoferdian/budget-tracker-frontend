import React from 'react';
import { Transaction } from '@/types';
import TransactionItem from './TransactionItem';
import { formatToGroupLabel } from '@/utils/format';


interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const label = formatToGroupLabel(tx.date); // e.g. Today, Yesterday, Apr 12
    if (!acc[label]) acc[label] = [];
    acc[label].push(tx);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([label, group]) => (
        <div key={label}>
          <h3 className="text-sm font-semibold text-neutral-500 mb-2">{label}</h3>
          <div className="flex flex-col gap-4">
            {group.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
