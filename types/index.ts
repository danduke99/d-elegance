// D'Elegance - Supabase-ready data types
// TODO: When connecting to Supabase, these types should match your database schema

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  sale_price: number | null
  currency: string // Default: XCG
  stock: number
  active: boolean
  category_id: string
  created_at: string
  updated_at: string
  // Relations (joined data)
  category?: Category
  media?: ProductMedia[]
  variants?: ProductVariant[]
  personalization_fields?: PersonalizationField[]
  collections?: Collection[]
}

export interface ProductMedia {
  id: string
  product_id: string
  url: string
  public_id: string | null // Cloudinary public_id for transformations
  resource_type: 'image' | 'video'
  position: number
  created_at: string
  updated_at: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

export interface ProductCollection {
  product_id: string
  collection_id: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string // e.g., "Size", "Color"
  value: string // e.g., "Large", "Gold"
  price: number | null // Optional price adjustment
  stock: number
}

export interface PersonalizationField {
  id: string
  product_id: string
  label: string
  required: boolean
  max_length: number | null
}

export interface CartItem {
  product: Product
  quantity: number
  selected_variants?: Record<string, string> // { "Size": "Large", "Color": "Gold" }
  personalization?: Record<string, string> // { "Engraving": "Happy Birthday!" }
}

export interface OrderDraft {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_method: 'pickup' | 'delivery'
  delivery_address?: string
  notes?: string
  items: CartItem[]
  subtotal: number
  delivery_fee: number
  total: number
  status: 'draft' | 'pending_payment' | 'paid' | 'confirmed' | 'completed'
  created_at: string
  updated_at: string
}

// Sentoo payment types
export interface SentooPaymentRequest {
  amount: number
  currency: string
  reference: string
  description: string
  return_url: string
  webhook_url?: string
}

export interface SentooPaymentResponse {
  payment_id: string
  payment_url: string
  status: 'pending' | 'completed' | 'failed'
}

// Admin dashboard stats
export interface DashboardStats {
  total_products: number
  active_products: number
  low_stock: number
  collections_count: number
}
