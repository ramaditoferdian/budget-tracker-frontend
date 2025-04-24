'use client'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import {
  Wallet,
  Folder,
  Repeat,
} from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategoryPanel from './CategoryPanel'
import TransactionTypePanel from './TransactionTypePanel'
import SourcePanel from './SourcePanel'

// Custom hook untuk cek layar kecil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const panel = searchParams.get('panel') ?? 'sources'
  const isMobile = useIsMobile()

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('panel', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Tabs
        defaultValue={panel}
        value={panel}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="flex md:hidden w-full whitespace-nowrap gap-2 bg-muted p-2 px-0 rounded-xl shadow-sm border">
          <TabsTrigger value="sources" className="w-full text-sm md:text-base rounded-xl">
            {isMobile ? <Wallet size={18} /> : 'Sources'}
          </TabsTrigger>
          <TabsTrigger value="category" className="w-full text-sm md:text-base rounded-xl">
            {isMobile ? <Folder size={18} /> : 'Categories'}
          </TabsTrigger>
          <TabsTrigger value="transaction-type" className="w-full text-sm md:text-base rounded-xl">
            {isMobile ? <Repeat size={18} /> : 'Transaction Types'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sources">
          <SourcePanel />
        </TabsContent>
        <TabsContent value="category">
          <CategoryPanel />
        </TabsContent>
        <TabsContent value="transaction-type">
          <TransactionTypePanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
