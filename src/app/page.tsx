import { AnnouncementBar } from "../components/site/AnnouncementBar";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { Container } from "../components/site/Container";
import { Button } from "../components/ui/Button";
import { ProductGrid } from "../components/shop/ProductGrid";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          {/* Hero */}
          <section className="py-10 sm:py-14">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                  Thoughtful gifts for every moment.
                </h1>
                <p className="mt-3 text-sm text-zinc-600 sm:text-base">
                  Curated gift boxes, seasonal picks, accessories, and apparel — clean, modern, and made to delight.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/shop" variant="primary">Shop all</Button>
                  <Button href="/shop?c=gift-boxes" variant="gold">Gift boxes</Button>
                  <Button href="/shop?c=under-25" variant="outline">Under $25</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured collections */}
          <section className="py-6">
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold">Featured</h2>
              <a className="text-sm text-zinc-600 hover:text-zinc-950" href="/shop">View all</a>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Gift Boxes", href: "/shop?c=gift-boxes" },
                { label: "Seasonal", href: "/shop?c=seasonal" },
                { label: "For Couples", href: "/shop?c=couples" },
                { label: "For Kids", href: "/shop?c=kids" },
                { label: "Accessories", href: "/shop?c=accessories" },
                { label: "Under $25", href: "/shop?c=under-25" },
              ].map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-zinc-950">{x.label}</div>
                  <div className="mt-1 text-sm text-zinc-600">Explore</div>
                </a>
              ))}
            </div>
          </section>

          {/* Best sellers */}
          <section className="py-10">
            <h2 className="text-xl font-semibold">Best sellers</h2>
            <div className="mt-4">
              <ProductGrid />
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
