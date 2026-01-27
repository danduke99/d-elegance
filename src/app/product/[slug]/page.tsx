import Image from "next/image";
import { AnnouncementBar } from "../../../components/site/AnnouncementBar";
import { Header } from "../../../components/site/Header";
import { Footer } from "../../../components/site/Footer";
import { Container } from "../../../components/site/Container";
import { getProductBySlug } from "../../../lib/data/productBySlug";
import { ProductActions } from "./ProductActions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main>
          <Container>
            <section className="py-16">
              <h1 className="text-2xl font-semibold text-zinc-950">
                Product not found
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                This product may be unavailable.
              </p>
            </section>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          <section className="grid gap-8 py-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400">
                  No image
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-semibold capitalize tracking-tight text-zinc-950 sm:text-3xl">
                {product.title}
              </h1>

              <ProductActions
                id={product.id}
                slug={product.slug}
                title={product.title}
                price={product.price}
                image={product.image}
              />

              <div className="mt-8 space-y-4 text-sm text-zinc-600">
                <p>{product.description ?? "Mejuri-style description goes here."}</p>
                <p>
                  Delivery is available for orders over 25 XCG. Pickup is always
                  available.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
