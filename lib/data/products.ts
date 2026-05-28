import type { Product, ProductMedia, ProductVariant, PersonalizationField } from '@/types'
import { categories } from './categories'
import { collections } from './collections'

// Mock products data
// TODO: Replace with Supabase queries when connected
export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'Luxury Gift Box - Classic',
    slug: 'luxury-gift-box-classic',
    description: 'An elegantly curated gift box featuring premium chocolates, aromatic candles, and a silk ribbon bow. Perfect for any special occasion.',
    price: 89.99,
    sale_price: null,
    currency: 'XCG',
    stock: 15,
    active: true,
    category_id: 'cat-1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    category: categories[0],
    collections: [collections[0], collections[2]],
    media: [
      { id: 'media-1', product_id: 'prod-1', url: '/images/products/gift-box-classic.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-01-15T00:00:00Z', updated_at: '2024-01-15T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [
      { id: 'pf-1', product_id: 'prod-1', label: 'Gift Message', required: false, max_length: 150 },
    ],
  },
  {
    id: 'prod-2',
    title: 'Rose Gold Bracelet',
    slug: 'rose-gold-bracelet',
    description: 'Delicate rose gold plated bracelet with adjustable chain. A timeless piece that adds elegance to any outfit.',
    price: 45.00,
    sale_price: 38.00,
    currency: 'XCG',
    stock: 25,
    active: true,
    category_id: 'cat-5',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
    category: categories[4],
    collections: [collections[0], collections[2]],
    media: [
      { id: 'media-2', product_id: 'prod-2', url: '/images/products/rose-gold-bracelet.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-01-20T00:00:00Z', updated_at: '2024-01-20T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [
      { id: 'pf-2', product_id: 'prod-2', label: 'Engraving Text', required: false, max_length: 20 },
    ],
  },
  {
    id: 'prod-3',
    title: 'Scented Candle Set',
    slug: 'scented-candle-set',
    description: 'Set of three hand-poured soy candles in lavender, vanilla, and ocean breeze scents. Burns for up to 40 hours each.',
    price: 32.00,
    sale_price: null,
    currency: 'XCG',
    stock: 40,
    active: true,
    category_id: 'cat-1',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
    category: categories[0],
    collections: [collections[1], collections[2], collections[3]],
    media: [
      { id: 'media-3', product_id: 'prod-3', url: '/images/products/candle-set.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-02-01T00:00:00Z', updated_at: '2024-02-01T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [],
  },
  {
    id: 'prod-4',
    title: 'Silk Pocket Square',
    slug: 'silk-pocket-square',
    description: 'Premium Italian silk pocket square with hand-rolled edges. Available in multiple patterns.',
    price: 24.00,
    sale_price: null,
    currency: 'XCG',
    stock: 30,
    active: true,
    category_id: 'cat-5',
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z',
    category: categories[4],
    collections: [collections[3]],
    media: [
      { id: 'media-4', product_id: 'prod-4', url: '/images/products/pocket-square.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-02-05T00:00:00Z', updated_at: '2024-02-05T00:00:00Z' },
    ],
    variants: [
      { id: 'var-1', product_id: 'prod-4', name: 'Pattern', value: 'Classic Navy', price: null, stock: 10 },
      { id: 'var-2', product_id: 'prod-4', name: 'Pattern', value: 'Burgundy Paisley', price: null, stock: 10 },
      { id: 'var-3', product_id: 'prod-4', name: 'Pattern', value: 'Gold Geometric', price: null, stock: 10 },
    ],
    personalization_fields: [],
  },
  {
    id: 'prod-5',
    title: 'Personalized Leather Keychain',
    slug: 'personalized-leather-keychain',
    description: 'Handcrafted genuine leather keychain with custom engraving. A thoughtful everyday accessory.',
    price: 18.00,
    sale_price: null,
    currency: 'XCG',
    stock: 50,
    active: true,
    category_id: 'cat-3',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
    category: categories[2],
    collections: [collections[0], collections[3]],
    media: [
      { id: 'media-5', product_id: 'prod-5', url: '/images/products/leather-keychain.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-02-10T00:00:00Z', updated_at: '2024-02-10T00:00:00Z' },
    ],
    variants: [
      { id: 'var-4', product_id: 'prod-5', name: 'Color', value: 'Tan', price: null, stock: 25 },
      { id: 'var-5', product_id: 'prod-5', name: 'Color', value: 'Dark Brown', price: null, stock: 25 },
    ],
    personalization_fields: [
      { id: 'pf-3', product_id: 'prod-5', label: 'Initials (max 3)', required: true, max_length: 3 },
    ],
  },
  {
    id: 'prod-6',
    title: 'Summer Beach Tote',
    slug: 'summer-beach-tote',
    description: 'Spacious woven tote bag perfect for beach days and summer outings. Features internal pocket and magnetic closure.',
    price: 42.00,
    sale_price: 35.00,
    currency: 'XCG',
    stock: 20,
    active: true,
    category_id: 'cat-5',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z',
    category: categories[4],
    collections: [collections[6], collections[2]],
    media: [
      { id: 'media-6', product_id: 'prod-6', url: '/images/products/beach-tote.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-01T00:00:00Z', updated_at: '2024-03-01T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [],
  },
  {
    id: 'prod-7',
    title: 'Couples Mug Set',
    slug: 'couples-mug-set',
    description: 'Matching ceramic mug set for couples. Features gold accents and comes in an elegant gift box.',
    price: 28.00,
    sale_price: null,
    currency: 'XCG',
    stock: 35,
    active: true,
    category_id: 'cat-1',
    created_at: '2024-03-05T00:00:00Z',
    updated_at: '2024-03-05T00:00:00Z',
    category: categories[0],
    collections: [collections[4], collections[0]],
    media: [
      { id: 'media-7', product_id: 'prod-7', url: '/images/products/couples-mugs.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-05T00:00:00Z', updated_at: '2024-03-05T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [
      { id: 'pf-4', product_id: 'prod-7', label: 'Name 1', required: false, max_length: 15 },
      { id: 'pf-5', product_id: 'prod-7', label: 'Name 2', required: false, max_length: 15 },
    ],
  },
  {
    id: 'prod-8',
    title: 'Kids Activity Gift Box',
    slug: 'kids-activity-gift-box',
    description: 'Fun-filled activity box for children ages 4-10. Includes coloring books, crayons, stickers, and small toys.',
    price: 22.00,
    sale_price: null,
    currency: 'XCG',
    stock: 25,
    active: true,
    category_id: 'cat-1',
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z',
    category: categories[0],
    collections: [collections[5]],
    media: [
      { id: 'media-8', product_id: 'prod-8', url: '/images/products/kids-activity-box.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-10T00:00:00Z', updated_at: '2024-03-10T00:00:00Z' },
    ],
    variants: [
      { id: 'var-6', product_id: 'prod-8', name: 'Theme', value: 'Princess', price: null, stock: 12 },
      { id: 'var-7', product_id: 'prod-8', name: 'Theme', value: 'Dinosaur', price: null, stock: 13 },
    ],
    personalization_fields: [
      { id: 'pf-6', product_id: 'prod-8', label: 'Child Name', required: false, max_length: 20 },
    ],
  },
  {
    id: 'prod-9',
    title: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with minimalist design. Perfect for everyday elegance.',
    price: 35.00,
    sale_price: null,
    currency: 'XCG',
    stock: 3,
    active: true,
    category_id: 'cat-4',
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-03-15T00:00:00Z',
    category: categories[3],
    collections: [collections[1]],
    media: [
      { id: 'media-9', product_id: 'prod-9', url: '/images/products/cotton-tshirt.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-15T00:00:00Z', updated_at: '2024-03-15T00:00:00Z' },
    ],
    variants: [
      { id: 'var-8', product_id: 'prod-9', name: 'Size', value: 'S', price: null, stock: 1 },
      { id: 'var-9', product_id: 'prod-9', name: 'Size', value: 'M', price: null, stock: 1 },
      { id: 'var-10', product_id: 'prod-9', name: 'Size', value: 'L', price: null, stock: 1 },
      { id: 'var-11', product_id: 'prod-9', name: 'Color', value: 'White', price: null, stock: 2 },
      { id: 'var-12', product_id: 'prod-9', name: 'Color', value: 'Black', price: null, stock: 1 },
    ],
    personalization_fields: [],
  },
  {
    id: 'prod-10',
    title: 'Mini Spa Set',
    slug: 'mini-spa-set',
    description: 'Compact self-care set with bath bomb, body lotion, and lip balm. Great for a quick pampering session.',
    price: 19.00,
    sale_price: 15.00,
    currency: 'XCG',
    stock: 45,
    active: true,
    category_id: 'cat-3',
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z',
    category: categories[2],
    collections: [collections[0], collections[2]],
    media: [
      { id: 'media-10', product_id: 'prod-10', url: '/images/products/mini-spa-set.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-20T00:00:00Z', updated_at: '2024-03-20T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [],
  },
  {
    id: 'prod-11',
    title: 'Elegant Watch Box',
    slug: 'elegant-watch-box',
    description: 'Sophisticated watch storage box with velvet interior. Holds up to 6 watches.',
    price: 65.00,
    sale_price: null,
    currency: 'XCG',
    stock: 10,
    active: true,
    category_id: 'cat-5',
    created_at: '2024-03-25T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z',
    category: categories[4],
    collections: [collections[3]],
    media: [
      { id: 'media-11', product_id: 'prod-11', url: '/images/products/watch-box.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-03-25T00:00:00Z', updated_at: '2024-03-25T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [
      { id: 'pf-7', product_id: 'prod-11', label: 'Engraved Name', required: false, max_length: 25 },
    ],
  },
  {
    id: 'prod-12',
    title: 'Greeting Card Bundle',
    slug: 'greeting-card-bundle',
    description: 'Set of 12 premium greeting cards for various occasions. Includes envelopes.',
    price: 12.00,
    sale_price: null,
    currency: 'XCG',
    stock: 60,
    active: true,
    category_id: 'cat-3',
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z',
    category: categories[2],
    collections: [collections[1]],
    media: [
      { id: 'media-12', product_id: 'prod-12', url: '/images/products/greeting-cards.jpg', public_id: null, resource_type: 'image', position: 0, created_at: '2024-04-01T00:00:00Z', updated_at: '2024-04-01T00:00:00Z' },
    ],
    variants: [],
    personalization_fields: [],
  },
]

// Data access functions
// TODO: Replace with Supabase queries when connected

export function getProducts(): Product[] {
  return products.filter(p => p.active)
}

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((prod) => prod.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((prod) => prod.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'all') return getProducts()
  if (categorySlug === 'under-25') {
    return getProducts().filter(p => (p.sale_price || p.price) < 25)
  }
  return getProducts().filter((prod) => prod.category?.slug === categorySlug)
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return getProducts().filter((prod) => 
    prod.collections?.some((col) => col.slug === collectionSlug)
  )
}

export function getBestSellers(): Product[] {
  return getProductsByCollection('best-sellers').slice(0, 4)
}

export function getNewArrivals(): Product[] {
  return getProductsByCollection('new-arrivals').slice(0, 4)
}

export function getUnder25(): Product[] {
  return getProducts().filter(p => (p.sale_price || p.price) < 25).slice(0, 4)
}

export function getFeaturedProducts(): Product[] {
  return getProducts().slice(0, 8)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return getProducts().filter(
    (prod) =>
      prod.title.toLowerCase().includes(lowerQuery) ||
      prod.description.toLowerCase().includes(lowerQuery)
  )
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products]
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
    case 'price-high':
      return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
}

// Admin functions
export function getLowStockProducts(threshold: number = 5): Product[] {
  return products.filter((prod) => prod.stock <= threshold)
}

export function getInactiveProducts(): Product[] {
  return products.filter((prod) => !prod.active)
}
