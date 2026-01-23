export type CartItem = {
  id: string;        // product id or slug
  slug: string;
  title: string;
  price: number;     // XCG amount (for now)
  qty: number;
  image?: string;
  variantLabel?: string;
  personalization?: string;
};

export type CartState = {
  items: CartItem[];
};
