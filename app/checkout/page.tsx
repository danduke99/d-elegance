'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingBag, Truck, Store, MessageCircle, ExternalLink } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCart } from '@/lib/cart/cart-context'
import { formatXCG } from '@/lib/utils/format'
import { getSentooPaymentLink, getWhatsAppOrderLink } from '@/lib/payments/sentoo'

const DELIVERY_THRESHOLD = 25
const DELIVERY_FEE = 5

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, isDeliveryEligible, clearCart } = useCart()
  
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">No Items to Checkout</h1>
            <p className="text-muted-foreground mb-6">
              Add some gifts to your cart before checking out.
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

  const deliveryFee = deliveryMethod === 'delivery' && isDeliveryEligible ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee
  const sentooPaymentLink = getSentooPaymentLink()

  const generateOrderSummary = () => {
    let summary = items.map(item => 
      `- ${item.quantity}x ${item.product.title} (${formatXCG((item.product.sale_price || item.product.price) * item.quantity)})`
    ).join('\n')
    
    summary += `\n\nSubtotal: ${formatXCG(subtotal)}`
    if (deliveryMethod === 'delivery' && isDeliveryEligible) {
      summary += `\nDelivery: ${formatXCG(deliveryFee)}`
    }
    summary += `\nTotal: ${formatXCG(total)}`
    summary += `\n\nDelivery Method: ${deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}`
    if (deliveryMethod === 'delivery' && deliveryAddress) {
      summary += `\nAddress: ${deliveryAddress}`
    }
    if (notes) {
      summary += `\nNotes: ${notes}`
    }
    
    return summary
  }

  const handleSentooPayment = () => {
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and phone number')
      return
    }
    
    if (sentooPaymentLink) {
      // Store order info in sessionStorage for success page
      sessionStorage.setItem('delegance_order', JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        deliveryMethod,
        deliveryAddress,
        notes,
        items: items.map(i => ({
          title: i.product.title,
          quantity: i.quantity,
          price: i.product.sale_price || i.product.price
        })),
        subtotal,
        deliveryFee,
        total
      }))
      
      window.open(sentooPaymentLink, '_blank')
    }
  }

  const handlePaymentConfirmed = () => {
    setIsProcessing(true)
    // In production, this would verify payment with Sentoo API
    setTimeout(() => {
      router.push('/checkout/success')
    }, 1000)
  }

  const handleWhatsAppOrder = () => {
    const orderSummary = generateOrderSummary()
    const whatsAppUrl = getWhatsAppOrderLink(orderSummary, customerName || 'Customer')
    window.open(whatsAppUrl, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground mb-6">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>

          <h1 className="text-3xl font-semibold text-foreground mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1.5 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (234) 567-890"
                        className="mt-1.5 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Delivery Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={deliveryMethod} 
                    onValueChange={(v) => setDeliveryMethod(v as 'pickup' | 'delivery')}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-4 rounded-xl border border-border hover:border-[#efbf05] transition-colors cursor-pointer">
                      <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4" />
                          <span className="font-medium">Pickup</span>
                          <span className="text-sm text-muted-foreground ml-auto">Free</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pick up your order at our store
                        </p>
                      </Label>
                    </div>

                    <div className={`flex items-start space-x-3 p-4 rounded-xl border transition-colors ${
                      isDeliveryEligible 
                        ? 'border-border hover:border-[#efbf05] cursor-pointer' 
                        : 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                    }`}>
                      <RadioGroupItem 
                        value="delivery" 
                        id="delivery" 
                        className="mt-1" 
                        disabled={!isDeliveryEligible}
                      />
                      <Label htmlFor="delivery" className={`flex-1 ${isDeliveryEligible ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span className="font-medium">Delivery</span>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {formatXCG(DELIVERY_FEE)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isDeliveryEligible 
                            ? 'Delivered to your address' 
                            : `Requires minimum order of ${formatXCG(DELIVERY_THRESHOLD)}`}
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryMethod === 'delivery' && isDeliveryEligible && (
                    <div className="mt-4">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your full delivery address"
                        className="mt-1.5 rounded-xl"
                        rows={3}
                        required
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions or personalization details..."
                    className="rounded-xl"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="rounded-2xl sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.media?.[0]?.url ? (
                            <Image
                              src={item.product.media[0].url}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatXCG((item.product.sale_price || item.product.price) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatXCG(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>{deliveryFee > 0 ? formatXCG(deliveryFee) : 'Free'}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">{formatXCG(total)}</span>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-3 pt-4">
                    {/* Sentoo Payment */}
                    {sentooPaymentLink && (
                      <Button
                        onClick={handleSentooPayment}
                        size="lg"
                        className="w-full rounded-xl text-white sentoo-gradient hover:opacity-90"
                        disabled={!customerName || !customerPhone}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Pay with Sentoo
                      </Button>
                    )}

                    {/* "I've Paid" Button */}
                    <Button
                      onClick={handlePaymentConfirmed}
                      variant="outline"
                      size="lg"
                      className="w-full rounded-xl"
                      disabled={isProcessing || !customerName || !customerPhone}
                    >
                      {isProcessing ? 'Processing...' : "I've Paid, Continue"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">or</span>
                      </div>
                    </div>

                    {/* WhatsApp Fallback */}
                    <Button
                      onClick={handleWhatsAppOrder}
                      variant="outline"
                      size="lg"
                      className="w-full rounded-xl border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Order via WhatsApp
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this order, you agree to our terms and conditions.
                  </p>
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
