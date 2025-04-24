'use client'

import CategoryForm from "./CategoryForm"
import CategoryList from "./CategoryList"

export default function CategoryPanel() {
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-semibold">📂 Manage Categories</h2>
      <p className="text-muted-foreground">Create and organize your categories by transaction type.</p>
      <CategoryForm />
      <CategoryList />
    </div>
  )
}
