'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { useDeleteTransactionType, useTransactionTypes } from '@/modules/transactionTypes/hooks/useTransactionTypes'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import { getBadgeColor } from '@/utils/format-color'


export default function TransactionTypeList() {
  const { data, isLoading, isError, error } = useTransactionTypes()
  const deleteMutation = useDeleteTransactionType()

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Jenis transaksi berhasil dihapus!')
      }
    })
  }
  
  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center py-10">Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  if (!data?.data.length) return <div>Tidak ada jenis transaksi.</div>

  return (
    <div className="grid gap-3">
      {data.data.map((type) => (
        <Card key={type.id} className={`flex items-center justify-between p-4 ${getBadgeColor(type.name)}`}>
          <div className="font-medium">{type.name}</div>
          {type.userId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(type.id)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </Card>
      ))}
    </div>
  )
}
