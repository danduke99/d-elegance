"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../lib/cart/cartStore";
import { formatXCG } from "../../lib/money";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem, itemCount } = useCart();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950">Cart</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-700">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-zinc-50">
                  {it.image ? (
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-zinc-950">
                        {it.title}
                      </div>
                      <div className="text-sm text-zinc-600">{formatXCG(it.price)}</div>
                      {it.variantLabel ? (
                        <div className="text-xs text-zinc-500">Variant: {it.variantLabel}</div>
                      ) : null}
                      {it.personalization ? (
                        <div className="text-xs text-zinc-500">
                          Personalization: {it.personalization}
                        </div>
                      ) : null}
                    </div>

                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-sm text-zinc-600 hover:text-zinc-950"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-xs text-zinc-600">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => setQty(it.id, Number(e.target.value || 1))}
                      className="h-9 w-20 rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                    />
                    <div className="ml-auto text-sm text-zinc-800">
                      {formatXCG(it.price * it.qty)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Items</span>
              <span className="text-zinc-900">{itemCount}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatXCG(subtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
