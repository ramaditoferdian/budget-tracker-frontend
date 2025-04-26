// src/modules/transactions/components/TransactionFormDialog.tsx
'use client';

import { Transaction } from '@/types';
import TransactionForm from '@/modules/transactions/components/TransactionForm';
import DialogDrawer from '@/components/shared/DialogDrawer';

type Mode = 'create' | 'edit';

interface TransactionFormDialogProps {
  mode: Mode;
  transaction?: Transaction;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TransactionFormDialog({
  mode = 'create',
  transaction,
  open,
  setOpen,
}: TransactionFormDialogProps) {
  return (
    <DialogDrawer
      name={`transaction-form-${mode}${mode === 'edit' && transaction ? `-[${transaction.id}]` : ''}`}
      title={mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
      open={open}
      setOpen={setOpen}
    >
      <TransactionForm mode={mode} transaction={transaction} />
    </DialogDrawer>
  );
}
