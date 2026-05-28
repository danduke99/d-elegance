'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getProducts, getProductsByCategory, sortProducts } from '@/lib/data/products'
import { getCategories } from '@/lib/data/categories'

const categoryChips = [
  { name: 'All', slug: 'all' },
  { name: 'Gift Boxes', slug: 'gift-boxes' },
  { name: 'Seasonal', slug: 'seasonal' },
  { name: 'Under 25', slug: 'under-25' },
  { name: 'Apparel', slug: 'apparel' },
  { name: 'Accessories', slug: 'accessories' },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('newest')

  const filteredProducts = useMemo(() => {
    const products = getProductsByCategory(selectedCategory)
    return sortProducts(products, sortBy)
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-foreground text-center">
              Shop All Gifts
            </h1>
            <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
              Discover our complete collection of curated gifts, from elegant boxes to personalized treasures.
            </p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Filters & Controls */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Category Chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categoryChips.map((cat) => (
                  <Button
                    key={cat.slug}
                    variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`rounded-full px-4 ${
                      selectedCategory === cat.slug 
                        ? 'bg-foreground text-background hover:bg-foreground/90' 
                        : 'border-border hover:bg-secondary'
                    }`}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>

              {/* Sort & Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gold Divider */}
              <div className="gold-divider" />
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found in this category.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedCategory('all')}
                >
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
