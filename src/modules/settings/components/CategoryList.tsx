'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategories, useDeleteCategory } from '@/modules/categories/hooks/useCategories';
import { toast } from 'sonner';
import { getBadgeColor } from '@/utils/format-color';
import Loading from '@/components/Loading';

export default function CategoryList() {
  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = async (id: string) => {
    try {
      // Call the deleteCategory function to remove the category
      await deleteCategory(id);

      // Show success toast if deletion is successful
      toast.success('Category successfully deleted!');
    } catch (error) {
      // Show error toast if deletion fails
      toast.error('Failed to delete category!');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-sm text-red-500">Failed to load categories.</div>;
  }

  return (
    <div className="grid gap-3">
      {categories?.data.map((cat) => (
        <Card
          key={cat.id}
          className={`flex items-center justify-between p-4 ${getBadgeColor(cat.transactionType?.name)}`}
        >
          <div>
            <div className="font-medium">{cat.name}</div>
            <Badge
              variant="outline"
              className={`mt-1 text-xs ${getBadgeColor(cat.transactionType?.name)} border border-black/50 shadow-lg`}
            >
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
  );
}
