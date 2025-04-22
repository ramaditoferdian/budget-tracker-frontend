'use client'

import { useSearchParams } from 'next/navigation'
import CategoryPanel from './CategoryPanel'
import TransactionTypePanel from './TransactionTypePanel'
import SourcePanel from './SourcePanel'


export default function SettingsPage() {
  const searchParams = useSearchParams()
  const panel = searchParams.get('panel')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {panel === 'sources' && <SourcePanel />}
      {panel === 'category' && <CategoryPanel />}
      {panel === 'transaction-type' && <TransactionTypePanel />}
    </div>
  )
}
