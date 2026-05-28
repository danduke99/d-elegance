'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getCategories } from '@/lib/data/categories'
import { formatDate, generateSlug } from '@/lib/utils/format'
import { toast } from 'sonner'

/**
 * Admin Categories Page
 * 
 * TODO: Connect to Supabase for CRUD operations
 */

export default function AdminCategoriesPage() {
  const categories = getCategories()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleAdd = () => {
    // TODO: Save to Supabase
    console.log('Add category:', { name: newCategoryName, slug: generateSlug(newCategoryName) })
    toast.success('Category created (demo only)')
    setNewCategoryName('')
    setShowAddDialog(false)
  }

  const handleEdit = (id: string) => {
    // TODO: Update in Supabase
    console.log('Edit category:', id, editName)
    toast.success('Category updated (demo only)')
    setEditingCategory(null)
    setEditName('')
  }

  const handleDelete = (id: string) => {
    // TODO: Delete from Supabase
    console.log('Delete category:', id)
    toast.success('Category deleted (demo only)')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Create a new product category.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Gift Boxes"
                  className="mt-1.5 rounded-xl"
                />
              </div>
              <div>
                <Label>Slug (auto-generated)</Label>
                <Input
                  value={generateSlug(newCategoryName)}
                  disabled
                  className="mt-1.5 rounded-xl bg-muted"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!newCategoryName.trim()}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {editingCategory === category.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8 rounded-lg"
                          autoFocus
                        />
                        <Button size="sm" onClick={() => handleEdit(category.id)}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingCategory(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(category.created_at)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setEditingCategory(category.id)
                          setEditName(category.name)
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Note: Changes are not persisted in this demo. Connect to Supabase to enable full CRUD functionality.
      </p>
    </div>
  )
}
