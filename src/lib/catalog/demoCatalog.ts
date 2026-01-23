export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  price: number; // XCG
  image: string;
  badge?: "Best Seller" | "New" | "Seasonal";
  category?: string; // later: categoryId
  tags?: string[];   // e.g. ["under-25", "gift-box"]
};

export const demoCatalog: CatalogProduct[] = [
  {
    id: "p1",
    slug: "gift-box-rose",
    title: "Gift Box (Rose)",
    price: 22,
    image: "/images/placeholder.jpg",
    badge: "Best Seller",
    category: "gift-boxes",
    tags: ["under-25", "gift-box"],
  },
  {
    id: "p2",
    slug: "summer-set",
    title: "Summer Set",
    price: 18,
    image: "/images/placeholder.jpg",
    badge: "Seasonal",
    category: "seasonal",
    tags: ["under-25"],
  },
  {
    id: "p3",
    slug: "couples-pack",
    title: "Couples Pack",
    price: 25,
    image: "/images/placeholder.jpg",
    badge: "New",
    category: "couples",
    tags: [],
  },
  {
    id: "p4",
    slug: "kids-surprise",
    title: "Kids Surprise",
    price: 12,
    image: "/images/placeholder.jpg",
    category: "kids",
    tags: ["under-25"],
  },
];
