'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getCollections } from '@/lib/data/collections'
import { formatDate, generateSlug } from '@/lib/utils/format'
import { toast } from 'sonner'

/**
 * Admin Collections Page
 * 
 * TODO: Connect to Supabase for CRUD operations
 */

export default function AdminCollectionsPage() {
  const collections = getCollections()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [newCollectionDescription, setNewCollectionDescription] = useState('')
  const [editingCollection, setEditingCollection] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleAdd = () => {
    // TODO: Save to Supabase
    console.log('Add collection:', { 
      name: newCollectionName, 
      slug: generateSlug(newCollectionName),
      description: newCollectionDescription 
    })
    toast.success('Collection created (demo only)')
    setNewCollectionName('')
    setNewCollectionDescription('')
    setShowAddDialog(false)
  }

  const handleEdit = (id: string) => {
    // TODO: Update in Supabase
    console.log('Edit collection:', id, editName)
    toast.success('Collection updated (demo only)')
    setEditingCollection(null)
    setEditName('')
  }

  const handleDelete = (id: string) => {
    // TODO: Delete from Supabase
    console.log('Delete collection:', id)
    toast.success('Collection deleted (demo only)')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
          <p className="text-muted-foreground mt-1">Organize products into curated collections</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Collection</DialogTitle>
              <DialogDescription>
                Create a new product collection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g., Best Sellers"
                  className="mt-1.5 rounded-xl"
                />
              </div>
              <div>
                <Label>Slug (auto-generated)</Label>
                <Input
                  value={generateSlug(newCollectionName)}
                  disabled
                  className="mt-1.5 rounded-xl bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="Describe this collection..."
                  className="mt-1.5 rounded-xl"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!newCollectionName.trim()}>
                Add Collection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Collections Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>
                    {editingCollection === collection.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8 rounded-lg"
                          autoFocus
                        />
                        <Button size="sm" onClick={() => handleEdit(collection.id)}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingCollection(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <span className="font-medium">{collection.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{collection.slug}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {collection.description || '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(collection.created_at)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setEditingCollection(collection.id)
                          setEditName(collection.name)
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(collection.id)}
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
