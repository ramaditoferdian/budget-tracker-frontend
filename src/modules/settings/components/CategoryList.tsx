'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCategories, useDeleteCategory } from '@/modules/categories/hooks/useCategories'
import { toast } from 'sonner'

export default function CategoryList() {
  const { data: categories, isLoading, isError } = useCategories()
  const { mutate: deleteCategory } = useDeleteCategory()

  const handleDelete = async (id: string) => {
    try {
      // Panggil fungsi deleteCategory untuk menghapus kategori
      await deleteCategory(id)

      // Tampilkan toast sukses jika berhasil
      toast.success('Kategori berhasil dihapus!')
    } catch (error) {
      // Tampilkan toast error jika gagal
      toast.error('Gagal menghapus kategori!')
    }
  }

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading categories...</div>
  }

  if (isError) {
    return <div className="text-sm text-red-500">Failed to load categories.</div>
  }

  return (
    <div className="grid gap-3">
      {categories?.data.map((cat) => (
        <Card key={cat.id} className="flex items-center justify-between p-4">
          <div>
            <div className="font-medium">{cat.name}</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {cat.transactionType?.name}
            </Badge>
          </div>
          {cat.userId && (
            <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </Card>
      ))}
    </div>
  )
}
