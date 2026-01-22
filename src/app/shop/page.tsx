import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { Container } from "../../components/site/Container";
import { ProductGrid } from "../../components/shop/ProductGrid";

export default function ShopPage() {
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

            <div className="mt-6">
              <ProductGrid />
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
