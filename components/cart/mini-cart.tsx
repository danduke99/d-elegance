'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart/cart-context'
import { formatXCG } from '@/lib/utils/format'

interface MiniCartProps {
  onClose?: () => void
}

export function MiniCart({ onClose }: MiniCartProps) {
  const { items, updateQuantity, removeItem, subtotal, isDeliveryEligible } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button asChild onClick={onClose}>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Your Cart ({items.length})</h2>
      
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="relative w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                {item.product.media?.[0]?.url ? (
                  <Image
                    src={item.product.media[0].url}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{item.product.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatXCG(item.product.sale_price || item.product.price)}
                </p>
                
                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-4 mt-auto">
        <Separator className="mb-4" />
        
        {/* Delivery eligibility banner */}
        <div className={`p-3 rounded-xl mb-4 text-sm ${
          isDeliveryEligible 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {isDeliveryEligible 
            ? 'You qualify for delivery!' 
            : `Add ${formatXCG(25 - subtotal)} more for delivery`}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-lg">{formatXCG(subtotal)}</span>
        </div>
        
        <div className="space-y-2">
          <Button asChild className="w-full" size="lg" onClick={onClose}>
            <Link href="/checkout">Checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" onClick={onClose}>
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
