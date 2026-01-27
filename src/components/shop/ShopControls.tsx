import Link from "next/link";

type Props = {
  currentCategory: string | null;
  currentSort: string;
};

const sorts = [
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
] as const;

const cats = [
  { key: null, label: "All", href: "/shop" },
  { key: "gift-boxes", label: "Gift Boxes", href: "/shop?c=gift-boxes" },
  { key: "seasonal", label: "Seasonal", href: "/shop?c=seasonal" },
  { key: "under-25", label: "Under 25", href: "/shop?c=under-25" },
  { key: "apparel", label: "Apparel", href: "/shop?c=apparel" },
];

function withSort(href: string, sort: string) {
  const url = new URL(href, "http://local");
  if (sort && sort !== "new") url.searchParams.set("sort", sort);
  else url.searchParams.delete("sort");
  return url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "");
}

export function ShopControls({ currentCategory, currentSort }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => {
          const active = c.key === currentCategory;
          const href = withSort(c.href, currentSort);

          return (
            <Link
              key={c.label}
              href={href}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                active
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-600">Sort:</span>
        <div className="flex flex-wrap gap-2">
          {sorts.map((s) => {
            const active = s.key === currentSort;
            const base = currentCategory ? `/shop?c=${currentCategory}` : "/shop";
            const href = withSort(base, s.key);

            return (
              <Link
                key={s.key}
                href={href}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? "border-(--accent) bg-(--accent) text-zinc-950"
                    : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
