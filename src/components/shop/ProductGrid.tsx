import { ProductCard } from "./ProductCard";
import type { CatalogProduct } from "../../lib/catalog/demoCatalog";

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
