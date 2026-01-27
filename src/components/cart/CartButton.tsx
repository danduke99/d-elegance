"use client";

import { useState } from "react";
import { useCart } from "../../lib/cart/cartStore";
import { MiniCartDrawer } from "../../components/cart/MiniCartDrawer";

type Props = {
  className?: string;
};

export function CartButton({ className }: Props) {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "relative inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
        }
        aria-label="Open cart"
      >
        Cart
        {itemCount > 0 ? (
          <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">
            {itemCount}
          </span>
        ) : null}
      </button>

      {/* If JS is off, still have a fallback link nearby if you want.
          Drawer is the main UX; you can remove this if you prefer. */}
      <MiniCartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
