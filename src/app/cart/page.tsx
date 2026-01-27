"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../lib/cart/cartStore";
import { formatXCG } from "../../lib/money";
import { QtyStepper } from "../../components/cart/QtyStepper";
import { useAnimatedNumber } from "@/src/lib/ui/useAnimatedNumber";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem, itemCount } = useCart();

  const deliveryMin = 25;
  const deliveryAllowed = subtotal >= deliveryMin;
  const remaining = Math.max(0, deliveryMin - subtotal);
  const animatedSubtotal = useAnimatedNumber(subtotal, { durationMs: 420 });

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Link
            href="/shop"
            className="text-sm text-zinc-600 hover:text-zinc-950 transition"
          >
            ← Back to shop
          </Link>

          <h1 className="text-2xl font-semibold text-zinc-950">Cart</h1>
        </div>

        {items.length > 0 ? (
          <Link
            href="/shop"
            className="text-sm text-zinc-600 hover:text-zinc-950"
          >
            Continue shopping
          </Link>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-700">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 active:scale-[0.99]"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Delivery banner */}
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm ${
              deliveryAllowed
                ? "border-[rgba(231,199,38,0.45)] bg-[rgba(231,199,38,0.16)] text-zinc-900"
                : "border-zinc-200 bg-zinc-50 text-zinc-700"
            }`}
          >
            {deliveryAllowed ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">
                  Delivery unlocked for this order.
                </span>
                <span className="text-xs opacity-80">
                  Delivery available for orders over XCG {deliveryMin}
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  Add{" "}
                  <span className="font-semibold">{formatXCG(remaining)}</span>{" "}
                  more to unlock delivery.
                </span>
                <span className="text-xs opacity-80">
                  Delivery available for orders over XCG {deliveryMin}
                </span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mt-4 space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 transition hover:shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                    {it.image ? (
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-zinc-950">
                          {it.title}
                        </div>
                        <div className="text-sm text-zinc-600">
                          {formatXCG(it.price)}
                        </div>

                        {it.variantLabel ? (
                          <div className="mt-1 text-xs text-zinc-500">
                            Variant: {it.variantLabel}
                          </div>
                        ) : null}

                        {it.personalization ? (
                          <div className="mt-1 text-xs text-zinc-500">
                            Personalization: {it.personalization}
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-sm text-zinc-600 hover:text-zinc-950 hover:cursor-pointer transition active:scale-[0.98]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className="text-xs text-zinc-600">Qty</label>

                      <QtyStepper
                        value={it.qty}
                        min={1}
                        max={99}
                        onChange={(next) => setQty(it.id, next)}
                      />

                      <div className="ml-auto text-sm font-medium text-zinc-900">
                        {formatXCG(it.price * it.qty)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Items</span>
              <span className="text-zinc-900">{itemCount}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatXCG(animatedSubtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-95 active:scale-[0.99] gold-shadow"
            >
              Continue to checkout
            </Link>

            <p className="mt-3 text-xs text-zinc-500 w-full flex justify-center">
              Taxes and delivery fees (if any) are handled after confirmation.
            </p>
          </div>
        </>
      )}
    </main>
  );
}
