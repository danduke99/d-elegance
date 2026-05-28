'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, variants?: Record<string, string>, personalization?: Record<string, string>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isDeliveryEligible: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'delegance-cart'
const DELIVERY_THRESHOLD = 25 // XCG

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    }
  }, [items, isLoaded])

  const addItem = useCallback((
    product: Product,
    quantity: number = 1,
    variants?: Record<string, string>,
    personalization?: Record<string, string>
  ) => {
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.product.id === product.id
      )

      if (existingIndex > -1) {
        // Update existing item quantity
        const updated = [...currentItems]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          selected_variants: variants || updated[existingIndex].selected_variants,
          personalization: personalization || updated[existingIndex].personalization,
        }
        return updated
      }

      // Add new item
      return [
        ...currentItems,
        {
          product,
          quantity,
          selected_variants: variants,
          personalization,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    )
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => {
    const price = item.product.sale_price || item.product.price
    return total + price * item.quantity
  }, 0)

  const isDeliveryEligible = subtotal >= DELIVERY_THRESHOLD

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDeliveryEligible,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
