import type { Category } from '@/types'

// Mock categories data
// TODO: Replace with Supabase queries when connected
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Gift Boxes',
    slug: 'gift-boxes',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Seasonal',
    slug: 'seasonal',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Under 25',
    slug: 'under-25',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Apparel',
    slug: 'apparel',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    slug: 'accessories',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

export function getCategories(): Category[] {
  return categories
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}
