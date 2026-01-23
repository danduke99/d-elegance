"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnnouncementBar } from "../../../components/site/AnnouncementBar";
import { Header } from "../../../components/site/Header";
import { Footer } from "../../../components/site/Footer";
import { Container } from "../../../components/site/Container";
import { Button } from "../../../components/ui/Button";
import { useCart } from "../../../lib/cart/cartStore";
import { formatXCG } from "../../../lib/money";
import { demoCatalog } from "../../../lib/catalog/demoCatalog";
import { ProductGrid } from "../../../components/shop/ProductGrid";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCart();

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17215241234";

  const product = useMemo(() => {
    return (
      demoCatalog.find((p: { slug: string }) => p.slug === params.slug) ?? null
    );
  }, [params.slug]);

  // Not found state
  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main>
          <Container>
            <section className="py-14">
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center">
                <h1 className="text-2xl font-semibold text-zinc-950">
                  Product not found
                </h1>
                <p className="mt-2 text-sm text-zinc-600">
                  This product may have been removed or the link is incorrect.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/shop"
                    className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-50"
                  >
                    Back to shop
                  </Link>
                </div>
              </div>
            </section>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const [qty, setQty] = useState(1);
  const [personalization, setPersonalization] = useState("");

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\nProduct: ${product.title}\nPrice: ${formatXCG(
        product.price,
      )}\nQty: ${qty}` +
        (personalization ? `\nPersonalization: ${personalization}` : "") +
        `\n\nDelivery or pickup?\n(Delivery available for orders over 25 XCG)\n\nName:\nAddress (if delivery):\nNotes:`,
    );

    return `https://wa.me/${phone}?text=${message}`;
  }, [phone, product.title, product.price, qty, personalization]);

  // "You may also like": same category first, fallback to other products
  const recommendations = useMemo(() => {
    const cat = product.category; // cat can be undefined

    const sameCategory = cat
      ? demoCatalog.filter((p) => p.slug !== product.slug && p.category === cat)
      : [];

    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);

    const others = demoCatalog.filter((p) => p.slug !== product.slug);

    // Merge by id to avoid object-identity issues with includes()
    const seen = new Set<string>();
    const merged: typeof others = [];

    for (const p of [...sameCategory, ...others]) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      merged.push(p);
      if (merged.length === 4) break;
    }

    return merged;
  }, [product.slug, product.category]);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          <section className="grid gap-8 py-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-2 text-lg text-zinc-800">
                {formatXCG(product.price)}
              </div>

              {/* Controls */}
              <div className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-zinc-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) =>
                      setQty(Math.max(1, Number(e.target.value || 1)))
                    }
                    className="h-11 w-28 rounded-xl border border-zinc-200 bg-white px-4 text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-medium text-zinc-700">
                    Personalization (optional)
                  </label>
                  <input
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    placeholder="Name, message, color preference..."
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={() =>
                    addItem(
                      {
                        id: product.id,
                        slug: product.slug,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        personalization: personalization || undefined,
                      },
                      qty,
                    )
                  }
                >
                  Add to cart
                </Button>

                <Button href="/cart" variant="primary" className="w-full">
                  View cart
                </Button>

                <Button
                  href={whatsappHref}
                  variant="outline"
                  className="w-full"
                >
                  Order on WhatsApp
                </Button>

                <Button href="/shop" variant="ghost" className="w-full">
                  Back to shop
                </Button>
              </div>

              <div className="mt-8 space-y-4 text-sm text-zinc-600">
                <p>
                  Product description goes here. Keep it short and clean,
                  Mejuri-style.
                </p>
                <p>
                  Delivery is available for orders over 25 XCG. Pickup is always
                  available.
                </p>
              </div>
            </div>
          </section>

          {/* You may also like */}
          <section className="pb-14">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-semibold text-zinc-950 sm:text-xl">
                You may also like
              </h2>
              <Link
                className="text-sm text-zinc-600 hover:text-zinc-950"
                href="/shop"
              >
                View all
              </Link>
            </div>

            <div className="mt-4">
              <ProductGrid products={recommendations} />
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
