"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useCart } from "@/src/lib/cart/cartStore";
import { formatXCG } from "@/src/lib/money";
import { QtyStepper } from "@/src/components/cart/QtyStepper";
import { useAnimatedNumber } from "@/src/lib/ui/useAnimatedNumber";
import { Portal } from "@/src/components/ui/Portal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MiniCartDrawer({ open, onClose }: Props) {
  const { items, subtotal, setQty, removeItem, itemCount } = useCart();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const animatedSubtotal = useAnimatedNumber(subtotal, { durationMs: 420 });

  const deliveryMin = 25;
  const deliveryAllowed = subtotal >= deliveryMin;
  const remaining = Math.max(0, deliveryMin - subtotal);

  const hasItems = items.length > 0;

  const headerLabel = useMemo(() => {
    if (itemCount === 0) return "Cart";
    if (itemCount === 1) return "Cart (1 item)";
    return `Cart (${itemCount} items)`;
  }, [itemCount]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus panel on open
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <Portal>
      <div
        className={`fixed inset-0 z-60 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Mini cart"
          className={`absolute right-0 rounded-l-2xl top-0 h-dvh w-[92vw] max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* IMPORTANT: h-full + flex-col + min-h-0 children */}
          <div className="flex h-full min-h-0 flex-col">
            {/* Header */}
            <div className="shrink-0 border-b border-zinc-200 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-zinc-950">
                    {headerLabel}
                  </div>
                  {itemCount > 0 ? (
                    <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">
                      {itemCount}
                    </span>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 active:scale-[0.99]"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              {!hasItems ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center">
                  <div className="text-sm font-semibold text-zinc-950">
                    Your cart is empty
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Add something you love.
                  </div>

                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95 active:scale-[0.99] gold-shadow gold-ring"
                  >
                    Browse shop
                  </Link>
                </div>
              ) : (
                <>
                  {/* Delivery banner */}
                  <div
                    className={`rounded-2xl border p-4 text-sm ${
                      deliveryAllowed
                        ? "border-[rgba(231,199,38,0.45)] bg-[rgba(231,199,38,0.16)] text-zinc-900"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    {deliveryAllowed ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">
                          Delivery unlocked.
                        </span>
                        <span className="text-xs opacity-80">Min 25 XCG</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span>
                          Add{" "}
                          <span className="font-semibold">
                            {formatXCG(remaining)}
                          </span>{" "}
                          for delivery.
                        </span>
                        <span className="text-xs opacity-80">Min 25 XCG</span>
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
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
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
                                className="text-sm text-zinc-600 transition hover:text-zinc-950 active:scale-[0.98]"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              <span className="text-xs text-zinc-600">Qty</span>

                              <QtyStepper
                                value={it.qty}
                                min={1}
                                max={99}
                                onChange={(next) => setQty(it.id, next)}
                              />

                              <div className="ml-auto text-sm font-semibold text-zinc-900">
                                {formatXCG(it.price * it.qty)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer (always visible) */}
            <div className="shrink-0 border-t border-zinc-200 px-5 py-4">
              {hasItems ? (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">Subtotal</span>
                    <span className="font-semibold text-zinc-950">
                      {formatXCG(animatedSubtotal)}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2">
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95 active:scale-[0.99] gold-shadow gold-ring"
                    >
                      Checkout
                    </Link>

                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
                    >
                      View cart
                    </Link>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
