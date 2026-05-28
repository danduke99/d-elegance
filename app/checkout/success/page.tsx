'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, MessageCircle, ShoppingBag } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart/cart-context'
import { formatXCG } from '@/lib/utils/format'

interface OrderInfo {
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryMethod: 'pickup' | 'delivery'
  deliveryAddress?: string
  notes?: string
  items: Array<{
    title: string
    quantity: number
    price: number
  }>
  subtotal: number
  deliveryFee: number
  total: number
}

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)

  useEffect(() => {
    // Get order info from sessionStorage
    const storedOrder = sessionStorage.getItem('delegance_order')
    if (storedOrder) {
      setOrderInfo(JSON.parse(storedOrder))
    }
  }, [])

  const handleDone = () => {
    clearCart()
    sessionStorage.removeItem('delegance_order')
  }

  const handleWhatsAppConfirm = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    let message = `Hi! I just completed payment for my order.\n\n`
    message += `Name: ${orderInfo?.customerName}\n`
    message += `Phone: ${orderInfo?.customerPhone}\n`
    message += `Delivery: ${orderInfo?.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}\n`
    if (orderInfo?.deliveryAddress) {
      message += `Address: ${orderInfo.deliveryAddress}\n`
    }
    message += `\nTotal: ${formatXCG(orderInfo?.total || 0)}`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-lg w-full rounded-3xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Payment Complete!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. {"We'll"} prepare your gifts with care.
            </p>

            {/* Order Recap */}
            {orderInfo && (
              <div className="text-left bg-muted/50 rounded-2xl p-6 mb-6">
                <h2 className="font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  {orderInfo.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.title}
                      </span>
                      <span>{formatXCG(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatXCG(orderInfo.subtotal)}</span>
                  </div>
                  {orderInfo.deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>{formatXCG(orderInfo.deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatXCG(orderInfo.total)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Name:</span> {orderInfo.customerName}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {orderInfo.customerPhone}</p>
                  <p>
                    <span className="text-muted-foreground">Delivery:</span>{' '}
                    {orderInfo.deliveryMethod === 'pickup' ? 'Pickup at store' : 'Delivery'}
                  </p>
                  {orderInfo.deliveryAddress && (
                    <p><span className="text-muted-foreground">Address:</span> {orderInfo.deliveryAddress}</p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppConfirm}
                size="lg"
                className="w-full rounded-xl border-green-500 text-green-600 hover:bg-green-50"
                variant="outline"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Confirm on WhatsApp
              </Button>

              <Button
                asChild
                size="lg"
                className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
                onClick={handleDone}
              >
                <Link href="/">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Done
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              {"You'll"} receive a confirmation message shortly. Questions? Contact us on WhatsApp.
            </p>
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </div>
  )
}
