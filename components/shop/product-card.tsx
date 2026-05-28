'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types'
import { formatXCG } from '@/lib/utils/format'
import { useCart } from '@/lib/cart/cart-context'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price
  const displayPrice = product.sale_price || product.price
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isOutOfStock = product.stock === 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock) return
    
    addItem(product, 1)
    toast.success(`${product.title} added to cart`)
  }

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-sm product-card-hover gold-glow bg-card">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.media?.[0]?.url ? (
            <Image
              src={product.media[0].url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-[#efbf05] text-foreground hover:bg-[#efbf05] font-medium">
                Sale
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="secondary" className="font-medium">
                Low Stock
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="bg-foreground text-background font-medium">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
              size="sm"
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category?.name || 'Gift'}
          </p>
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-[#efbf05] transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatXCG(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatXCG(product.price)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
