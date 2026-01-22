import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            D’Elegance
          </Link>

          <nav className="brand-font hidden items-center gap-6 text-base text-zinc-700 md:flex">
            <Link
              className="nav-underline transition-colors hover:text-zinc-950"
              href="/shop"
            >
              Shop
            </Link>

            <Link
              className="nav-underline transition-colors hover:text-zinc-950"
              href="/shop?c=gift-boxes"
            >
              Gift Boxes
            </Link>

            <Link
              className="nav-underline transition-colors hover:text-zinc-950"
              href="/shop?c=seasonal"
            >
              Seasonal
            </Link>

            <Link
              className="nav-underline transition-colors hover:text-zinc-950"
              href="/shop?c=under-25"
            >
              Under $25
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"
            >
              Browse
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
