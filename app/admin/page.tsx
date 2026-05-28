import Link from 'next/link'
import { Package, CheckCircle, AlertTriangle, FolderOpen, ArrowRight, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllProducts, getLowStockProducts } from '@/lib/data/products'
import { getCollections } from '@/lib/data/collections'
import { formatXCG, formatDate } from '@/lib/utils/format'

export default function AdminDashboardPage() {
  const allProducts = getAllProducts()
  const activeProducts = allProducts.filter(p => p.active)
  const lowStockProducts = getLowStockProducts(5)
  const collections = getCollections()

  // Recent products (last 5)
  const recentProducts = [...allProducts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const stats = [
    {
      name: 'Total Products',
      value: allProducts.length,
      icon: Package,
      href: '/admin/products',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Active Products',
      value: activeProducts.length,
      icon: CheckCircle,
      href: '/admin/products?filter=active',
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Low Stock',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      href: '/admin/products?filter=low-stock',
      color: 'text-amber-600 bg-amber-100',
    },
    {
      name: 'Collections',
      value: collections.length,
      icon: FolderOpen,
      href: '/admin/collections',
      color: 'text-purple-600 bg-purple-100',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! {"Here's"} an overview of your store.</p>
        </div>
        <Button asChild className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <Card className="rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start rounded-xl">
                <Link href="/admin/products/new">Add New Product</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start rounded-xl">
                <Link href="/admin/categories">Manage Categories</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start rounded-xl">
                <Link href="/admin/collections">Manage Collections</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Card className="rounded-2xl border-amber-200 bg-amber-50/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
              </div>
              <p className="text-sm text-amber-700 mb-3">
                {lowStockProducts.length} {lowStockProducts.length === 1 ? 'product is' : 'products are'} running low on stock.
              </p>
              <Button asChild variant="outline" size="sm" className="rounded-xl border-amber-300 text-amber-700 hover:bg-amber-100">
                <Link href="/admin/products?filter=low-stock">
                  View Low Stock
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Products Table */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Products</CardTitle>
          <Button asChild variant="link" className="text-muted-foreground p-0">
            <Link href="/admin/products">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link 
                      href={`/admin/products/${product.id}/edit`}
                      className="font-medium hover:text-[#efbf05] transition-colors"
                    >
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {product.sale_price ? (
                      <div>
                        <span className="font-medium">{formatXCG(product.sale_price)}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formatXCG(product.price)}
                        </span>
                      </div>
                    ) : (
                      formatXCG(product.price)
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.stock <= 5 ? 'destructive' : 'secondary'}
                      className="rounded-full"
                    >
                      {product.stock} in stock
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.active ? 'default' : 'secondary'}
                      className={`rounded-full ${product.active ? 'bg-green-100 text-green-800' : ''}`}
                    >
                      {product.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(product.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
