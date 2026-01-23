"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartState } from "./types";
import { round2 } from "../../lib/money";

const STORAGE_KEY = "delegance_cart_v1";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items?.length) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

function saveCart(state: CartState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  useEffect(() => {
    setState(loadCart());
  }, []);

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = round2(
      state.items.reduce((sum, it) => sum + it.price * it.qty, 0)
    );
    const itemCount = state.items.reduce((sum, it) => sum + it.qty, 0);

    return {
      items: state.items,
      addItem: (item, qty = 1) => {
        setState((prev) => {
          const existing = prev.items.find((x) => x.id === item.id);
          if (existing) {
            return {
              items: prev.items.map((x) =>
                x.id === item.id ? { ...x, qty: x.qty + qty } : x
              ),
            };
          }
          return { items: [...prev.items, { ...item, qty }] };
        });
      },
      removeItem: (id) => {
        setState((prev) => ({ items: prev.items.filter((x) => x.id !== id) }));
      },
      setQty: (id, qty) => {
        setState((prev) => ({
          items: prev.items
            .map((x) => (x.id === id ? { ...x, qty } : x))
            .filter((x) => x.qty > 0),
        }));
      },
      clear: () => setState({ items: [] }),
      subtotal,
      itemCount,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
