'use client';
import React, { useState } from 'react';
import { Transaction } from '@/types';
import TransactionItem from './TransactionItem';
import { formatToGroupLabel } from '@/utils/format';
import { useDeleteTransaction } from '../hooks/useTransactions';
import TransactionFormDialog from './TransactionFormDialog';
import { useDialog } from '@/hooks/useDialog';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import { toast } from 'sonner';
import { getConfirmationMessage } from '@/utils/helpers/confirmation';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const editDialog = useDialog('transaction-form:edit');
  const deleteDialog = useDialog('delete-transaction');

  const [transactionEdit, setTransactionEdit] = useState<Transaction>();
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();

  const deleteTransaction = useDeleteTransaction();

  const deleteConfirmationMessage = getConfirmationMessage('delete', 'transaction');

  const handleEdit = (transaction: Transaction) => {
    setTransactionEdit(transaction);
    editDialog.setOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    deleteDialog.setOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction.mutate(transactionToDelete.id, {
        onSuccess: () => {
          toast.success('Transaction deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete transaction');
        },
      });
    }
  };

  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const label = formatToGroupLabel(tx.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(tx);
    return acc;
  }, {});

  if (Object.keys(grouped).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-sm text-neutral-500">No transactions found</span>
      </div>
    );
  }

  return (
    <>
      {/* EDIT TRANSACTION MODAL */}
      <TransactionFormDialog
        mode="edit"
        open={editDialog.open}
        setOpen={editDialog.setOpen}
        transaction={transactionEdit}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationDialog
        name="delete-transaction"
        title={deleteConfirmationMessage.title}
        description={deleteConfirmationMessage.description}
        confirmText={deleteConfirmationMessage.confirmText}
        cancelText={deleteConfirmationMessage.cancelText}
        open={deleteDialog.open}
        setOpen={deleteDialog.setOpen}
        onConfirm={confirmDelete}
      />

      {/* TRANSACTION LIST */}
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
                  onDelete={() => handleDelete(tx)}
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
