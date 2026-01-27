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
  price: number;
  image: string | null;
  badge?: string | null;
};

export function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-200
hover:-translate-y-1 hover:shadow-lg hover:border-(--accent)
hover:ring-2 hover:ring-(--accent)/25 active:translate-y-0 active:shadow-md"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-(--accent)/15 to-transparent opacity-0 transition-all duration-500 group-hover:left-full group-hover:opacity-100" />
      </div>

      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.05] group-hover:brightness-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="truncate text-sm font-semibold text-zinc-950">
          {p.title}
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="mt-1 text-sm text-zinc-700">{formatXCG(p.price)}</div>

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
                  image: p.image ?? undefined,
                },
                1,
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
