import Image from "next/image";
import { AnnouncementBar } from "../../../components/site/AnnouncementBar";
import { Header } from "../../../components/site/Header";
import { Footer } from "../../../components/site/Footer";
import { Container } from "../../../components/site/Container";
import { Button } from "../../../components/ui/Button";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const phone = "17215241234";

  const title = params.slug.replaceAll("-", " ");
  const price = "$22.00";

  const message = encodeURIComponent(
    `Hi! I'd like to order:\n\nProduct: ${title}\nPrice: ${price}\nQty: 1\n\nDelivery or pickup?\n(Delivery available for orders over $25)\n\nName:\nAddress (if delivery):\nNotes/Personalization:`,
  );

  const whatsappHref = `https://wa.me/${phone}?text=${message}`;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <Container>
          <section className="grid gap-8 py-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <Image
                src="/delegance.jpg"
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold capitalize tracking-tight text-zinc-950 sm:text-3xl">
                {title}
              </h1>
              <div className="mt-2 text-lg text-zinc-800">{price}</div>

              <div className="mt-6 space-y-3">
                <Button href={whatsappHref} variant="gold" className="w-full">
                  Order on WhatsApp
                </Button>
                <Button href="/shop" variant="outline" className="w-full">
                  Back to shop
                </Button>
              </div>

              <div className="mt-8 space-y-4 text-sm text-zinc-600">
                <p>
                  Product description goes here. Keep it short and clean,
                  Mejuri-style.
                </p>
                <p>
                  Delivery is available for orders over $25. Pickup is always
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
