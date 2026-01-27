import { supabaseServer } from "@/src/lib/supabase/server";

export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string | null;
  badge?: string | null;
  category?: string | null;
};

export type SortKey = "new" | "price-asc" | "price-desc";

export async function getActiveProducts(opts?: {
  category?: string | null;
  sort?: SortKey | null;
}) {
  const sb = supabaseServer();

  const category = opts?.category ?? null;
  const sort: SortKey = (opts?.sort ?? "new") as SortKey;
  const isUnder25 = category === "under-25";

  // Resolve category slug -> id (skip for under-25 because under-25 is a RULE not a category)
  let categoryId: string | null = null;

  if (category && !isUnder25) {
    const { data: cat, error: catErr } = await sb
      .from("categories")
      .select("id")
      .eq("slug", category)
      .maybeSingle();

    if (catErr) throw new Error(`categories: ${catErr.message}`);
    categoryId = cat?.id ?? null;
    if (!categoryId) return [];
  }

  // Base query
  let q = sb
    .from("products")
    .select("id, slug, title, price, sale_price, active, category_id, created_at")
    .eq("active", true);

  if (categoryId) q = q.eq("category_id", categoryId);

  // Sorting (DB-side where possible)
  if (sort === "new") q = q.order("created_at", { ascending: false });
  if (sort === "price-asc") q = q.order("price", { ascending: true });
  if (sort === "price-desc") q = q.order("price", { ascending: false });

  const { data: products, error: productsError } = await q;
  if (productsError) throw new Error(`products: ${productsError.message}`);

  // Under-25 rule enforced by effective price (sale_price ?? price)
  let filtered = products ?? [];
  if (isUnder25) {
    filtered = filtered.filter(
      (p: any) => Number(p.sale_price ?? p.price ?? 0) <= 25
    );
  }

  // If sorting by price, we should sort by *effective* price in code too,
  // so sale items behave correctly.
  if (sort === "price-asc") {
    filtered = [...filtered].sort(
      (a: any, b: any) =>
        Number(a.sale_price ?? a.price ?? 0) - Number(b.sale_price ?? b.price ?? 0)
    );
  }
  if (sort === "price-desc") {
    filtered = [...filtered].sort(
      (a: any, b: any) =>
        Number(b.sale_price ?? b.price ?? 0) - Number(a.sale_price ?? a.price ?? 0)
    );
  }

  const ids = filtered.map((p: any) => p.id);
  if (ids.length === 0) return [];

  // Media: fetch first image per product
  const { data: mediaRows, error: mediaError } = await sb
    .from("product_media")
    .select("product_id, url, position")
    .in("product_id", ids)
    .order("position", { ascending: true });

  if (mediaError) throw new Error(`product_media: ${mediaError.message}`);

  const firstImageByProduct = new Map<string, string>();
  for (const m of mediaRows ?? []) {
    if (!firstImageByProduct.has(m.product_id)) {
      firstImageByProduct.set(m.product_id, m.url);
    }
  }

  return filtered.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: Number(p.sale_price ?? p.price ?? 0),
    image: firstImageByProduct.get(p.id) ?? null,
    badge: p.sale_price ? "Sale" : null,
    category,
  })) satisfies CatalogProduct[];
}

