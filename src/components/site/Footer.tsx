import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-sm font-semibold">D’Elegance</div>
            <p className="mt-2 text-sm text-zinc-600">
              Your #1 online store for accessories...!!
            </p>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Shop</div>
            <ul className="mt-3 space-y-2 text-zinc-600">
              <li>Gift Boxes</li>
              <li>Seasonal</li>
              <li>Accessories</li>
              <li>Apparel</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Help</div>
            <ul className="mt-3 space-y-2 text-zinc-600">
              <li>Contact</li>
              <li>FAQ</li>
              <li>Shipping & Delivery</li>
              <li>Returns</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Ordering</div>
            <p className="mt-3 text-zinc-600">
              WhatsApp ordering available. Delivery for orders over $25.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} D’Elegance
        </div>
      </Container>
    </footer>
  );
}
