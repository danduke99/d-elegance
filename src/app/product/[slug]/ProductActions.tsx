"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/src/lib/cart/cartStore";
import { formatXCG } from "@/src/lib/money";
import { Button } from "@/src/components/ui/Button";

export function ProductActions({
  id,
  slug,
  title,
  price,
  image,
}: {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string | null;
}) {
  const { addItem } = useCart();
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17215241234";

  const [qty, setQty] = useState(1);
  const [personalization, setPersonalization] = useState("");

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\nProduct: ${title}\nPrice: ${formatXCG(
        price
      )}\nQty: ${qty}` +
        (personalization ? `\nPersonalization: ${personalization}` : "") +
        `\n\nDelivery or pickup?\n(Delivery available for orders over 25 XCG)\n\nName:\nAddress (if delivery):\nNotes:`
    );
    return `https://wa.me/${phone}?text=${message}`;
  }, [phone, title, price, qty, personalization]);

  return (
    <>
      <div className="mt-2 text-lg text-zinc-800">{formatXCG(price)}</div>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <label className="text-xs font-medium text-zinc-700">Quantity</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            className="h-11 w-28 rounded-xl border border-zinc-200 bg-white px-4 text-sm"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium text-zinc-700">
            Personalization (optional)
          </label>
          <input
            value={personalization}
            onChange={(e) => setPersonalization(e.target.value)}
            placeholder="Name, message, color preference..."
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          variant="gold"
          className="w-full"
          onClick={() =>
            addItem(
              {
                id,
                slug,
                title,
                price,
                image: image ?? undefined,
                personalization: personalization || undefined,
              },
              qty
            )
          }
        >
          Add to cart
        </Button>

        <Button href="/cart" variant="primary" className="w-full">
          View cart
        </Button>

        <Button href={whatsappHref} variant="outline" className="w-full">
          Order on WhatsApp
        </Button>

        <Button href="/shop" variant="ghost" className="w-full">
          Back to shop
        </Button>
      </div>
    </>
  );
}
