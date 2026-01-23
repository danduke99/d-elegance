"use client";

import Link from "next/link";
import { Container } from "./Container";
import Image from "next/image";
import { useCart } from "../../lib/cart/cartStore";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              className="rounded-full"
              src="/images/logo.png"
              alt="D’Elegance logo"
              height={44}
              width={44}
              priority
            />

            {/* Wordmark in Italianno */}
            <span className="brand-font hidden text-3xl leading-none text-zinc-950 sm:inline">
              D&apos;Elegance
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
            <Link
              className="nav-underline transition-colors hover:font-semibold hover:text-zinc-950"
              href="/shop"
            >
              Shop
            </Link>

            <Link
              className="nav-underline transition-colors hover:font-semibold hover:text-zinc-950"
              href="/shop?c=gift-boxes"
            >
              Gift Boxes
            </Link>

            <Link
              className="nav-underline transition-colors hover:font-semibold hover:text-zinc-950"
              href="/shop?c=seasonal"
            >
              Seasonal
            </Link>

            <Link
              className="nav-underline transition-colors hover:font-semibold hover:text-zinc-950"
              href="/shop?c=under-25"
            >
              Under $25
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
            >
              Browse
            </Link>

            <Link
              href="/cart"
              className="relative rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
            >
              Cart
              {itemCount > 0 ? (
                <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
