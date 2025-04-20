// src/modules/transactions/components/TransactionTypePanel.tsx
import TransactionTypeForm from './TransactionTypeForm'
import TransactionTypeList from './TransactionTypeList'


export default function TransactionTypePanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">📂 Manage Transaction Types</h2>
      <p className="text-muted-foreground">Create and organize your transaction types.</p>
      <TransactionTypeForm />
      <TransactionTypeList />
    </div>
  )
}
