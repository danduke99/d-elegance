import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/shop/product-card'
import type { Product, Collection } from '@/types'

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
  viewAllText?: string
  collection?: Collection
}

export function ProductSection({ 
  title, 
  subtitle,
  products, 
  viewAllHref, 
  viewAllText = 'View All',
}: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-muted-foreground max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Button asChild variant="link" className="text-foreground hover:text-[#efbf05] p-0 group">
              <Link href={viewAllHref} className="flex items-center gap-2">
                {viewAllText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
