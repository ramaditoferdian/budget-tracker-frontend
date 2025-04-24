'use client';
import React, { useState } from 'react';
import { Transaction } from '@/types';
import TransactionItem from './TransactionItem';
import { formatToGroupLabel } from '@/utils/format';
import { useDeleteTransaction } from '../hooks/useTransactions';
import TransactionFormDialog from './TransactionFormDialog';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {

  const [open, setOpen] = useState(false);
  const [transactionEdit, setTransactionEdit] = useState<Transaction>();

  const { mutate: deleteTx } = useDeleteTransaction();

  const handleEdit = (transaction: Transaction) => {
    // Tergantung modal/form edit kamu gimana, ini contoh placeholder
    console.log('Edit transaction:', transaction);

    setTransactionEdit(transaction);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this transaction?');
    if (confirmed) {
      deleteTx(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-neutral-400 py-8">
        <p>No transactions to show</p>
      </div>
    );
  }

  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const label = formatToGroupLabel(tx.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(tx);
    return acc;
  }, {});

  return (
    <>

      {/* MODAL */}
      <TransactionFormDialog
        mode="edit"
        open={open}
        setOpen={setOpen}
        transaction={transactionEdit}
      />

      <div className="space-y-8">
        {Object.entries(grouped).map(([label, group]) => (
          <div key={label}>
            <h3 className="text-sm font-semibold text-neutral-500 mb-2">{label}</h3>
            <div className="flex flex-col">
              {group.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  onEdit={() => handleEdit(tx)}
                  onDelete={() => handleDelete(tx.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionList;
