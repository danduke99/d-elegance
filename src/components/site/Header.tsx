"use client";

import Link from "next/link";
import { Container } from "./Container";
import Image from "next/image";
import { useCart } from "../../lib/cart/cartStore";
import { useEffect, useRef, useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-zinc-900 transition ${
          open ? "translate-y-1.75 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-1.75 h-0.5 w-5 rounded-full bg-zinc-900 transition ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-3.5 h-0.5 w-5 rounded-full bg-zinc-900 transition ${
          open ? "-translate-y-1.75 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" onClick={close}>
            <Image
              className="rounded-full"
              src="/images/logo.png"
              alt="D’Elegance logo"
              height={44}
              width={44}
              priority
            />

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
              href="/shop?tag=under-25"
            >
              Under 25
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Desktop browse */}
            <Link
              href="/shop"
              className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99] md:inline-flex"
            >
              Browse
            </Link>

            {/* Cart (all sizes) */}
            <Link
              href="/cart"
              className="relative inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
              onClick={close}
            >
              Cart
              {itemCount > 0 ? (
                <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:bg-zinc-50 active:scale-[0.99] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          ref={panelRef}
          className={`md:hidden ${
            open ? "block" : "hidden"
          } pb-4`}
        >
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <div className="grid gap-2">
              <Link
                href="/shop"
                onClick={close}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Shop
              </Link>
              <Link
                href="/shop?c=gift-boxes"
                onClick={close}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Gift Boxes
              </Link>
              <Link
                href="/shop?c=seasonal"
                onClick={close}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Seasonal
              </Link>
              <Link
                href="/shop?tag=under-25"
                onClick={close}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Under 25
              </Link>

              <div className="mt-2 border-t border-zinc-200 pt-2">
                <Link
                  href="/shop"
                  onClick={close}
                  className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
                >
                  Browse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
