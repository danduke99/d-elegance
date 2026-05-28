import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Hero } from '@/components/site/hero'
import { FeaturedCollections } from '@/components/site/featured-collections'
import { ProductSection } from '@/components/shop/product-section'
import { SeasonalSpotlight } from '@/components/site/seasonal-spotlight'
import { CTASection } from '@/components/site/cta-section'
import { ProductCard } from '@/components/shop/product-card'
import { getBestSellers, getNewArrivals, getUnder25 } from '@/lib/data/products'

export default function HomePage() {
  const bestSellers = getBestSellers()
  const newArrivals = getNewArrivals()
  const under25 = getUnder25()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Collections */}
        <FeaturedCollections />

        {/* Best Sellers */}
        <ProductSection
          title="Best Sellers"
          subtitle="Our most loved gifts, chosen by customers like you"
          products={bestSellers}
          viewAllHref="/shop?collection=best-sellers"
        />

        {/* Gold Divider */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="gold-divider" />
        </div>

        {/* Seasonal Spotlight */}
        <SeasonalSpotlight />

        {/* New Arrivals */}
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh additions to our collection"
          products={newArrivals}
          viewAllHref="/shop?collection=new-arrivals"
        />

        {/* Under 25 XCG Section */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 text-xs font-semibold text-foreground bg-[#efbf05] rounded-full uppercase tracking-wider mb-4">
                Budget Friendly
              </span>
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                Gifts Under 25 XCG
              </h2>
              <p className="mt-2 text-muted-foreground">
                Thoughtful presents that {"won't"} break the bank
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {under25.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <SiteFooter />
    </div>
  )
}
