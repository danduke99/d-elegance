"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../../../lib/cart/cartStore";
import { formatXCG } from "../../../lib/money";
import {
  loadCheckoutDraft,
  clearCheckoutDraft,
} from "../../../lib/checkout/checkoutStore";

export default function CheckoutSuccessPage() {
  const { items, subtotal, clear } = useCart();

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17215241234";

  const draft = loadCheckoutDraft();
  const name = draft?.name?.trim() || "";
  const notes = draft?.notes?.trim() || "";
  const method = draft?.method || "";

  const message = useMemo(() => {
    const lines = items.map((it) => {
      const extras = [
        it.variantLabel ? `Variant: ${it.variantLabel}` : null,
        it.personalization ? `Personalization: ${it.personalization}` : null,
      ].filter(Boolean);

      return `- ${it.title} x${it.qty} (${formatXCG(it.price * it.qty)})${
        extras.length ? `\n  ${extras.join(" | ")}` : ""
      }`;
    });

    return encodeURIComponent(
      `Hi D’Elegance! I just paid with Sentoo and would like to confirm my order:\n\n` +
        `Name: ${name || "(add name)"}\n` +
        `Method: ${method || "(pickup or delivery)"}\n` +
        `Subtotal: ${formatXCG(subtotal)}\n\n` +
        `Items:\n${lines.join("\n")}\n\n` +
        `Notes: ${notes || "(none)"}\n\n` +
        `(Delivery available for orders over 25 XCG)`,
    );
  }, [items, subtotal, name, method, notes]);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`;

  const onFinish = () => {
    clear();
    clearCheckoutDraft();
    window.location.href = "/shop";
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold text-zinc-950 sm:text-3xl">
          Payment complete
        </h1>

        <p className="mt-3 text-sm text-zinc-600 sm:text-base">
          Thank you. Please confirm your order details on WhatsApp so we can
          prepare your items.
        </p>

        {/* Small recap (optional but helpful) */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left text-sm text-zinc-700">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-900">Subtotal</span>
            <span className="font-semibold text-zinc-900">
              {formatXCG(subtotal)}
            </span>
          </div>

          <div className="mt-2 space-y-1">
            {items.slice(0, 4).map((it) => (
              <div key={it.id} className="flex justify-between gap-3">
                <span className="truncate">
                  {it.title} × {it.qty}
                </span>
                <span className="shrink-0">{formatXCG(it.price * it.qty)}</span>
              </div>
            ))}
            {items.length > 4 ? (
              <div className="text-xs text-zinc-500">
                + {items.length - 4} more item(s)
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <a
            href={whatsappHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95 active:scale-[0.99]"
          >
            Confirm on WhatsApp
          </a>

          <button
            type="button"
            onClick={onFinish}
            className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
          >
            Done (clear cart)
          </button>

          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-950"
          >
            Back to shop
          </Link>
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          Delivery is available for orders over 25 XCG.
        </p>
      </div>
    </main>
  );
}
