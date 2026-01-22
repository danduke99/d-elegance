import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../components/ui/Badge";

type Product = {
  slug: string;
  title: string;
  price: string;
  image: string;
  badge?: string;
};

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
        <Image src={p.image} alt={p.title} fill className="object-cover transition group-hover:scale-[1.03]" />
        {p.badge ? (
          <div className="absolute left-3 top-3">
            <Badge tone="gold">{p.badge}</Badge>
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="truncate text-sm font-semibold text-zinc-950">{p.title}</div>
        <div className="mt-1 text-sm text-zinc-700">{p.price}</div>
      </div>
    </Link>
  );
}
