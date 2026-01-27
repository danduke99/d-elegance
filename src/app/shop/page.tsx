import { AnnouncementBar } from "@/src/components/site/AnnouncementBar";
import { Header } from "@/src/components/site/Header";
import { Footer } from "@/src/components/site/Footer";
import { Container } from "@/src/components/site/Container";
import { ProductGrid } from "@/src/components/shop/ProductGrid";
import { ShopControls } from "@/src/components/shop/ShopControls";
import { getActiveProducts } from "@/src/lib/data/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; sort?: string }>;
}) {
  const sp = await searchParams;

  const category = sp.c ?? null;
  const sort = (sp.sort ?? "new") as any;

  const products = await getActiveProducts({ category, sort });

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          <section className="py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Shop
            </h1>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Browse gifts, accessories, seasonal sets, and more.
            </p>

            <ShopControls
              currentCategory={category}
              currentSort={sp.sort ?? "new"}
            />

            {/* Results + gold divider */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-600">
                <span className="font-medium text-zinc-900">
                  {products.length}
                </span>{" "}
                {products.length === 1 ? "item" : "items"}
                {category ? (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-medium text-zinc-900">
                      {category}
                    </span>
                  </>
                ) : null}
              </p>

              <div className="h-px flex-1 bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-70" />
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
