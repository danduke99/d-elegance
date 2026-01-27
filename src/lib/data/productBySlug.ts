import { supabaseServer } from "@/src/lib/supabase/server";

export type ProductDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
};

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const sb = supabaseServer();

  const { data, error } = await sb
    .from("products")
    .select("id, slug, title, description, price, sale_price")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const { data: media, error: mediaError } = await sb
    .from("product_media")
    .select("url, position")
    .eq("product_id", data.id)
    .order("position", { ascending: true })
    .limit(1);

  if (mediaError) throw new Error(mediaError.message);

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description ?? null,
    price: Number(data.sale_price ?? data.price ?? 0),
    image: media?.[0]?.url ?? null,
  };
}
