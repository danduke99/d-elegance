import { ProductCard } from "./ProductCard";

const demo = [
  { slug: "gift-box-rose", title: "Gift Box (Rose)", price: "$22.00", image: "/delegance.jpg", badge: "Best Seller" },
  { slug: "summer-set", title: "Summer Set", price: "$18.00", image: "/delegance.jpg" },
  { slug: "couples-pack", title: "Couples Pack", price: "$25.00", image: "/delegance.jpg", badge: "New" },
  { slug: "kids-surprise", title: "Kids Surprise", price: "$12.00", image: "/delegance.jpg" },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {demo.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
