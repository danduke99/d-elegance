'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Plus, Search, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllProducts, searchProducts, getLowStockProducts } from '@/lib/data/products'
import { formatXCG, formatDate } from '@/lib/utils/format'

export default function AdminProductsPage() {
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'all'
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState(initialFilter)

  const filteredProducts = useMemo(() => {
    let products = getAllProducts()
    
    // Apply filter
    if (filter === 'active') {
      products = products.filter(p => p.active)
    } else if (filter === 'inactive') {
      products = products.filter(p => !p.active)
    } else if (filter === 'low-stock') {
      products = getLowStockProducts(5)
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category?.name.toLowerCase().includes(query)
      )
    }
    
    return products
  }, [filter, searchQuery])

  const handleDelete = (productId: string) => {
    // TODO: Implement delete with Supabase
    console.log('Delete product:', productId)
    alert('Delete functionality will be implemented with Supabase integration')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button asChild className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48 rounded-xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </p>

      {/* Products Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          {filteredProducts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="font-medium hover:text-[#efbf05] transition-colors"
                      >
                        {product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                        {product.slug}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.category?.name || '—'}
                    </TableCell>
                    <TableCell>
                      {product.sale_price ? (
                        <div>
                          <span className="font-medium">{formatXCG(product.sale_price)}</span>
                          <span className="text-xs text-muted-foreground line-through block">
                            {formatXCG(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">{formatXCG(product.price)}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.stock <= 5 ? 'destructive' : product.stock <= 10 ? 'secondary' : 'outline'}
                        className="rounded-full"
                      >
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.active ? 'default' : 'secondary'}
                        className={`rounded-full ${product.active ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}`}
                      >
                        {product.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/product/${product.slug}`} target="_blank">
                              View in Store
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(product.id)}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
              <Button asChild variant="outline" className="mt-4 rounded-xl">
                <Link href="/admin/products/new">Add Your First Product</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
