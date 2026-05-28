import type { Collection } from '@/types'

// Mock collections data
// TODO: Replace with Supabase queries when connected
export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most loved gifts',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-2',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh additions to our collection',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-3',
    name: 'For Her',
    slug: 'for-her',
    description: 'Thoughtful gifts for the special women in your life',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-4',
    name: 'For Him',
    slug: 'for-him',
    description: 'Curated gifts for the gentlemen',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-5',
    name: 'For Couples',
    slug: 'for-couples',
    description: 'Perfect pairs for perfect pairs',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-6',
    name: 'For Kids',
    slug: 'for-kids',
    description: 'Delightful gifts for little ones',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col-7',
    name: 'Summer Specials',
    slug: 'summer-specials',
    description: 'Seasonal favorites',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

export function getCollections(): Collection[] {
  return collections
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((col) => col.id === id)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((col) => col.slug === slug)
}
