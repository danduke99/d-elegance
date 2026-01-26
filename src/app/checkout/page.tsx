"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/cart/cartStore";
import { formatXCG } from "../../lib/money";
import { loadCheckoutDraft, saveCheckoutDraft } from "../../lib/checkout/checkoutStore";
import type { DeliveryMethod } from "../../lib/checkout/checkoutStore";
import { CheckoutSuccessButton } from "../../components/ui/CheckoutSuccessButton";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<DeliveryMethod>("pickup");

  const deliveryAllowed = subtotal >= 25;

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17215241234";
  const sentooLink = process.env.NEXT_PUBLIC_SENTOO_PAYMENT_LINK ?? "";

  // Load draft once
  useEffect(() => {
    const draft = loadCheckoutDraft();
    if (!draft) return;
    setName(draft.name ?? "");
    setNotes(draft.notes ?? "");
    setMethod((draft.method ?? "pickup") as DeliveryMethod);
  }, []);

  // Autosave draft
  useEffect(() => {
    saveCheckoutDraft({ name, notes, method });
  }, [name, notes, method]);

  const cartSummary = useMemo(() => {
    return items
      .map((it) => {
        const extras = [
          it.variantLabel ? `Variant: ${it.variantLabel}` : null,
          it.personalization ? `Personalization: ${it.personalization}` : null,
        ].filter(Boolean);

        return `- ${it.title} x${it.qty} (${formatXCG(it.price * it.qty)})${
          extras.length ? `\n  ${extras.join(" | ")}` : ""
        }`;
      })
      .join("\n");
  }, [items]);

  const whatsappMessage = useMemo(() => {
    return encodeURIComponent(
      `Hi D’Elegance! I have paid and would like to confirm my order:\n\nName: ${
        name || "(add name)"
      }\nMethod: ${method}\nSubtotal: ${formatXCG(subtotal)}\n\nItems:\n${cartSummary}\n\nNotes: ${
        notes || "(none)"
      }`
    );
  }, [name, method, subtotal, cartSummary, notes]);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const onPayWithSentoo = () => {
    if (!sentooLink) {
      alert("Sentoo payment link is not configured yet.");
      return;
    }
    window.location.href = sentooLink;
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-zinc-950">Checkout</h1>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-700">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-zinc-950">Checkout</h1>
        <Link href="/cart" className="text-sm text-zinc-600 hover:text-zinc-950">
          Back to cart
        </Link>
      </div>

      <p className="mt-2 text-sm text-zinc-600">
        Pay first with Sentoo, then confirm your order on WhatsApp.
      </p>

      <div className="mt-6 grid gap-6">
        {/* Customer details */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-zinc-950">Customer</h2>

          <label className="mt-4 block text-xs text-zinc-600">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm"
            placeholder="Your name"
          />

          <label className="mt-4 block text-xs text-zinc-600">
            Order notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 min-h-22.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm"
            placeholder="Personalization, colors, special instructions..."
          />
        </section>

        {/* Delivery method */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-zinc-950">
            Pickup or Delivery
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("pickup")}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                method === "pickup"
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white hover:bg-zinc-50"
              }`}
            >
              <div className="font-semibold">Pickup</div>
              <div className="mt-1 text-xs opacity-80">Always available</div>
            </button>

            <button
              type="button"
              onClick={() => deliveryAllowed && setMethod("delivery")}
              disabled={!deliveryAllowed}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                method === "delivery"
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white hover:bg-zinc-50"
              } ${!deliveryAllowed ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <div className="font-semibold">Delivery</div>
              <div className="mt-1 text-xs opacity-80">
                Available for orders over 25 XCG
              </div>
            </button>
          </div>

          {!deliveryAllowed ? (
            <p className="mt-3 text-xs text-zinc-600">
              Add more items to reach 25 XCG to unlock delivery.
            </p>
          ) : null}
        </section>

        {/* Summary + actions */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-zinc-950">Order summary</h2>

          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            {items.map((it) => (
              <div key={it.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate">
                    {it.title} × {it.qty}
                  </div>
                </div>
                <div className="shrink-0">{formatXCG(it.price * it.qty)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatXCG(subtotal)}</span>
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={onPayWithSentoo}
              className="inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95 active:scale-[0.99] gold-shadow gold-ring"
            >
              Pay with Sentoo
            </button>

            {/* Animated “I’ve paid” button */}
            <CheckoutSuccessButton />

            <a
              href={whatsappHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95 active:scale-[0.99] gold-shadow gold-ring"
            >
              Confirm on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => {
                clear();
                window.location.href = "/shop";
              }}
              className="text-center text-xs text-zinc-500 hover:text-zinc-700"
            >
              Clear cart
            </button>
          </div>

          {!sentooLink ? (
            <p className="mt-3 text-xs text-red-600">
              Sentoo payment link not configured. Add{" "}
              <span className="font-medium">NEXT_PUBLIC_SENTOO_PAYMENT_LINK</span>{" "}
              to <span className="font-medium">.env.local</span>.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
