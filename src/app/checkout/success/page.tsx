"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../../../lib/cart/cartStore";
import { formatXCG } from "../../../lib/money";

export default function CheckoutSuccessPage() {
  const { items, subtotal } = useCart();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17215241234";

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
      `Hi D’Elegance! I just paid with Sentoo and would like to confirm my order:\n\nSubtotal: ${formatXCG(
        subtotal
      )}\n\nItems:\n${lines.join("\n")}\n\nName:\nPickup or Delivery:\n(Delivery available for orders over 25 XCG)\n\nNotes:`
    );
  }, [items, subtotal]);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`;

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

        <div className="mt-6 grid gap-3">
          <a
            href={whatsappHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-zinc-950 hover:brightness-95"
          >
            Confirm on WhatsApp
          </a>

          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
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
