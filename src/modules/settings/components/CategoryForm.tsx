'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
// import { getTransactionTypes } from '@/modules/categories/services/categoryService'
import { useTransactionTypes } from '@/modules/transactionTypes/hooks/useTransactionTypes'
import { useCreateCategory } from '@/modules/categories/hooks/useCategories'
import { toast } from 'sonner'

export default function CategoryForm() {
  const [name, setName] = useState('')
  const [typeId, setTypeId] = useState('')
  const [iconName, setIconName] = useState('')


  const { data: transactionTypes, isError, isLoading } = useTransactionTypes()

  const createMutation = useCreateCategory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    const payload = { name: name.trim(), transactionTypeId: typeId }

    // TODO: Call POST /categories API
    console.log('Creating category:', payload)

    createMutation.mutate(
      { name: name.trim(), transactionTypeId: typeId },
      {
        onSuccess: () => {
          setName('')
          toast.success('Jenis kategori berhasil ditambahkan.')
        },
        onError: (err: any) => {
          const message = err?.response?.data?.errors?.message || 'Gagal menambahkan jenis kategori'
          // toast.error(message);
          console.log(message)
        },
      }
    )
  }

  if (isLoading) return <div>Loading transaction types...</div>
  if (isError) return <div>Error loading transaction types.</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="grid gap-2">
        <Input
          placeholder="Category name (e.g., Food)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select value={typeId} onValueChange={setTypeId}>
          <SelectTrigger>
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes?.data.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


      </div>
      <Button type="submit">Add Category</Button>
    </form>
  )
}
