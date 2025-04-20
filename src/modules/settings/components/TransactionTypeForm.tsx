'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateTransactionType } from '@/modules/transactionTypes/hooks/useTransactionTypes'
import { toast } from 'sonner'

export default function TransactionTypeForm() {
  const [name, setName] = useState('')

  const createMutation = useCreateTransactionType()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    createMutation.mutate(
      { name: trimmed },
      {
        onSuccess: () => {
          setName('')
          toast.success('Jenis transaksi berhasil ditambahkan.')
        },
        onError: (err: any) => {
          const message = err?.response?.data?.errors?.message || 'Gagal menambahkan jenis transaksi'
          // toast.error(message);
          console.log(message)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Tambah jenis transaksi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={createMutation.isPending}
      />
      <Button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Menambahkan...' : 'Tambah'}
      </Button>
    </form>
  )
}
