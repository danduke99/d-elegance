import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Shirt, Watch, PartyPopper, Heart, Baby } from 'lucide-react'

const collections = [
  {
    name: 'Gift Boxes',
    slug: 'gift-boxes',
    icon: Gift,
    description: 'Curated luxury boxes',
  },
  {
    name: 'Apparel',
    slug: 'apparel',
    icon: Shirt,
    description: 'Premium clothing',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    icon: Watch,
    description: 'Elegant accessories',
  },
  {
    name: 'Seasonal',
    slug: 'seasonal',
    icon: PartyPopper,
    description: 'Festive specials',
  },
  {
    name: 'For Couples',
    slug: 'all',
    icon: Heart,
    description: 'Perfect pairs',
  },
  {
    name: 'For Kids',
    slug: 'all',
    icon: Baby,
    description: 'Little treasures',
  },
]

export function FeaturedCollections() {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Find the perfect gift for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((collection) => {
            const Icon = collection.icon
            return (
              <Link key={collection.name} href={`/shop?category=${collection.slug}`}>
                <Card className="group h-full border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-secondary hover:bg-secondary/80">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4 group-hover:bg-[#efbf05]/10 transition-colors">
                      <Icon className="h-6 w-6 text-foreground group-hover:text-[#efbf05] transition-colors" />
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-[#efbf05] transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {collection.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
