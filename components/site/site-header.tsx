'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useCart } from '@/lib/cart/cart-context'
import { MiniCart } from '@/components/cart/mini-cart'

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Gift Boxes', href: '/shop?category=gift-boxes' },
  { name: 'Under 25 XCG', href: '/shop?category=under-25' },
  { name: 'Collections', href: '/shop?category=all' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="bg-foreground text-background text-center py-2 text-sm overflow-hidden">
        <div className="flex animate-slide whitespace-nowrap">
          <span className="px-8">Free pickup on all orders</span>
          <span className="px-8 text-[#efbf05]">|</span>
          <span className="px-8">Delivery available on orders over 25 XCG</span>
          <span className="px-8 text-[#efbf05]">|</span>
          <span className="px-8">Personalized gifts available</span>
          <span className="px-8 text-[#efbf05]">|</span>
          <span className="px-8">Free pickup on all orders</span>
          <span className="px-8 text-[#efbf05]">|</span>
          <span className="px-8">Delivery available on orders over 25 XCG</span>
          <span className="px-8 text-[#efbf05]">|</span>
          <span className="px-8">Personalized gifts available</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-m-2.5">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between mb-8">
                  <Link 
                    href="/" 
                    className="font-[family-name:var(--font-italianno)] text-3xl text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {"D'Elegance"}
                  </Link>
                </div>
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-foreground hover:text-[#efbf05] transition-colors border-b border-border"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-[#efbf05] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-[family-name:var(--font-italianno)] text-3xl lg:text-4xl text-foreground tracking-wide">
              {"D'Elegance"}
            </span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Mini Cart */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#efbf05] text-foreground text-xs font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
                <MiniCart onClose={() => setCartOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
