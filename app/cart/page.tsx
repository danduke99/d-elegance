'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Truck, Store } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart/cart-context'
import { formatXCG } from '@/lib/utils/format'

const DELIVERY_THRESHOLD = 25

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, isDeliveryEligible, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              {"Looks like you haven't added any gifts yet. Start shopping to find something special!"}
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/shop">Browse Gifts</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const amountToDelivery = DELIVERY_THRESHOLD - subtotal

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground mb-6">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>

          <h1 className="text-3xl font-semibold text-foreground mb-8">Your Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const price = item.product.sale_price || item.product.price
                return (
                  <Card key={item.product.id} className="overflow-hidden rounded-2xl">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex gap-4 lg:gap-6">
                        {/* Image */}
                        <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                          {item.product.media?.[0]?.url ? (
                            <Image
                              src={item.product.media[0].url}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4">
                            <div>
                              <Link 
                                href={`/product/${item.product.slug}`}
                                className="font-medium text-foreground hover:text-[#efbf05] transition-colors line-clamp-2"
                              >
                                {item.product.title}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.product.category?.name}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Variants & Personalization */}
                          {item.selected_variants && Object.keys(item.selected_variants).length > 0 && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {Object.entries(item.selected_variants).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                            </p>
                          )}
                          {item.personalization && Object.keys(item.personalization).length > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(item.personalization).map(([k, v]) => `${k}: "${v}"`).join(' | ')}
                            </p>
                          )}

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-semibold text-foreground">
                              {formatXCG(price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="rounded-2xl sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  {/* Delivery Eligibility Banner */}
                  <div className={`p-4 rounded-xl mb-6 ${
                    isDeliveryEligible 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-muted'
                  }`}>
                    {isDeliveryEligible ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">Delivery Unlocked!</p>
                          <p className="text-sm text-green-600">You qualify for delivery</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                          <Store className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Pickup Only</p>
                          <p className="text-sm text-muted-foreground">
                            Add {formatXCG(amountToDelivery)} more for delivery
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="mb-4" />

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatXCG(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">
                        {isDeliveryEligible ? 'Calculated at checkout' : 'Not available'}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-foreground">{formatXCG(subtotal)}</span>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
                    >
                      <Link href="/checkout">Continue to Checkout</Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-muted-foreground"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
