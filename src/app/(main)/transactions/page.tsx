import TransactionsPage from '@/modules/transactions/components/TransactionPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Manage your income and expense transactions efficiently.',
};

const Transactions = () => {
  return <TransactionsPage />;
};

export default Transactions;
