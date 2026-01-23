import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { Container } from "../../components/site/Container";
import { ProductGrid } from "../../components/shop/ProductGrid";
import { demoCatalog } from "../../lib/catalog/demoCatalog";

type Props = {
  searchParams?: { c?: string; q?: string; tag?: string; sort?: string };
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function ShopPage({ searchParams }: Props) {
  const c = searchParams?.c ? normalize(searchParams.c) : "";
  const q = searchParams?.q ? normalize(searchParams.q) : "";
  const tag = searchParams?.tag ? normalize(searchParams.tag) : "";
  const sort = searchParams?.sort ? normalize(searchParams.sort) : ""; // later

  let products = demoCatalog.filter((p) => {
    const matchCategory = c ? p.category === c : true;
    const matchQuery = q
      ? normalize(p.title).includes(q) || normalize(p.slug).includes(q)
      : true;
    const matchTag = tag ? (p.tags ?? []).map(normalize).includes(tag) : true;

    return matchCategory && matchQuery && matchTag;
  });

  // Sorting (basic, safe now)
  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  const heading = tag
    ? tag.replaceAll("-", " ")
    : c
      ? c.replaceAll("-", " ")
      : "Shop";

  const title = heading.charAt(0).toUpperCase() + heading.slice(1);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          <section className="py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Browse gifts, accessories, seasonal sets, and more.
            </p>

            {/* Search + quick filters */}
            <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <form className="flex w-full gap-2 lg:max-w-md" action="/shop" method="get">
                {/* Preserve filters when searching */}
                {c ? <input type="hidden" name="c" value={c} /> : null}
                {tag ? <input type="hidden" name="tag" value={tag} /> : null}
                {sort ? <input type="hidden" name="sort" value={sort} /> : null}

                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search products..."
                  className="h-11 w-full rounded-full border border-zinc-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
                />
                <button
                  type="submit"
                  className="rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
                >
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href="/shop">
                  All
                </a>
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href="/shop?c=gift-boxes">
                  Gift Boxes
                </a>
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href="/shop?c=seasonal">
                  Seasonal
                </a>
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href="/shop?tag=under-25">
                  Under 25
                </a>
              </div>

              <div className="flex gap-2">
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href={`/shop?${new URLSearchParams({ ...(c ? { c } : {}), ...(q ? { q } : {}), ...(tag ? { tag } : {}), sort: "price-asc" }).toString()}`}>
                  Price ↑
                </a>
                <a className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50" href={`/shop?${new URLSearchParams({ ...(c ? { c } : {}), ...(q ? { q } : {}), ...(tag ? { tag } : {}), sort: "price-desc" }).toString()}`}>
                  Price ↓
                </a>
              </div>
            </div>

            <div className="mt-6">
              <ProductGrid products={products} />
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
