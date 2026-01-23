"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../components/ui/Badge";
import { useCart } from "../../lib/cart/cartStore";
import { formatXCG } from "../../lib/money";

type Product = {
  id: string;
  slug: string;
  title: string;
  price: number; // XCG number
  image: string;
  badge?: string;
};

export function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition group-hover:scale-[1.03]"
        />
        {p.badge ? (
          <div className="absolute left-2 top-2">
            <Badge tone="gold">{p.badge}</Badge>
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="truncate text-sm font-semibold text-zinc-950">
          {p.title}
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="text-sm text-zinc-700">{formatXCG(p.price)}</div>

          <button
            type="button"
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
            onClick={(e) => {
              e.preventDefault(); // stop link navigation
              e.stopPropagation();

              addItem(
                {
                  id: p.id,
                  slug: p.slug,
                  title: p.title,
                  price: p.price,
                  image: p.image,
                },
                1
              );
            }}
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
