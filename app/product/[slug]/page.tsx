'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, ArrowLeft, Check, MessageCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { ProductSection } from '@/components/shop/product-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getProductBySlug, getProducts } from '@/lib/data/products'
import { formatXCG } from '@/lib/utils/format'
import { useCart } from '@/lib/cart/cart-context'
import { toast } from 'sonner'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [personalization, setPersonalization] = useState<Record<string, string>>({})
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const hasDiscount = product.sale_price !== null && product.sale_price < product.price
  const displayPrice = product.sale_price || product.price
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isOutOfStock = product.stock === 0

  // Group variants by name (e.g., "Size", "Color")
  const variantGroups = product.variants?.reduce((acc, variant) => {
    if (!acc[variant.name]) acc[variant.name] = []
    acc[variant.name].push(variant)
    return acc
  }, {} as Record<string, typeof product.variants>) || {}

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addItem(product, quantity, selectedVariants, personalization)
    toast.success(`${product.title} added to cart`)
  }

  const handleWhatsAppOrder = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n` +
      `Product: ${product.title}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ${formatXCG(displayPrice * quantity)}\n` +
      (Object.keys(selectedVariants).length > 0 
        ? `Options: ${Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')}\n` 
        : '') +
      (Object.keys(personalization).length > 0 
        ? `Personalization: ${Object.entries(personalization).map(([k, v]) => `${k}: ${v}`).join(', ')}\n` 
        : '')
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  // Get related products
  const relatedProducts = getProducts()
    .filter(p => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>

        {/* Product Details */}
        <section className="mx-auto max-w-7xl px-4 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
                {product.media?.[selectedImageIndex]?.url ? (
                  <Image
                    src={product.media[selectedImageIndex].url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground/30" />
                  </div>
                )}
                {hasDiscount && (
                  <Badge className="absolute top-4 left-4 bg-[#efbf05] text-foreground hover:bg-[#efbf05]">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.media && product.media.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.media.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-[#efbf05]' 
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <Image
                        src={media.url}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.category?.name || 'Gift'}
              </p>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-semibold text-foreground text-balance">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-foreground">
                  {formatXCG(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatXCG(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                    Out of Stock
                  </Badge>
                ) : isLowStock ? (
                  <Badge variant="secondary" className="bg-[#efbf05]/10 text-[#efbf05]">
                    Only {product.stock} left
                  </Badge>
                ) : (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    In Stock
                  </div>
                )}
              </div>

              <Separator />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selectors */}
              {Object.keys(variantGroups).length > 0 && (
                <div className="space-y-4">
                  {Object.entries(variantGroups).map(([name, variants]) => (
                    <div key={name}>
                      <Label className="text-sm font-medium mb-2 block">{name}</Label>
                      <div className="flex flex-wrap gap-2">
                        {variants?.map((variant) => (
                          <Button
                            key={variant.id}
                            variant={selectedVariants[name] === variant.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedVariants({ ...selectedVariants, [name]: variant.value })}
                            className={selectedVariants[name] === variant.value 
                              ? 'bg-foreground text-background' 
                              : ''
                            }
                          >
                            {variant.value}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Personalization Fields */}
              {product.personalization_fields && product.personalization_fields.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Personalization</h3>
                  {product.personalization_fields.map((field) => (
                    <div key={field.id}>
                      <Label htmlFor={field.id} className="text-sm mb-2 block">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id={field.id}
                        value={personalization[field.label] || ''}
                        onChange={(e) => setPersonalization({ 
                          ...personalization, 
                          [field.label]: e.target.value 
                        })}
                        maxLength={field.max_length || undefined}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="rounded-xl"
                      />
                      {field.max_length && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {personalization[field.label]?.length || 0}/{field.max_length} characters
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="rounded-xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  size="lg"
                  className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button 
                  onClick={handleWhatsAppOrder}
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl border-green-500 text-green-600 hover:bg-green-50"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductSection
            title="You May Also Like"
            products={relatedProducts}
            viewAllHref="/shop"
            viewAllText="View All"
          />
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
