import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SeasonalSpotlight() {
  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1 text-xs font-semibold text-[#efbf05] bg-[#efbf05]/10 rounded-full uppercase tracking-wider mb-4">
              Summer Collection
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground text-balance">
              Celebrate the Season with Thoughtful Gifts
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover our handpicked selection of summer-inspired gifts. From beach-ready 
              accessories to refreshing spa sets, find the perfect present for sunny days ahead.
            </p>
            <div className="mt-8">
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/shop?category=seasonal">
                  Shop Seasonal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-[#efbf05]/10 flex items-center justify-center overflow-hidden">
                  <span className="font-[family-name:var(--font-italianno)] text-4xl text-[#efbf05]/50">
                    Summer
                  </span>
                </div>
                <div className="aspect-square rounded-2xl bg-foreground/5 flex items-center justify-center">
                  <span className="text-6xl font-bold text-foreground/10">25+</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-foreground/5 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">New</span>
                </div>
                <div className="aspect-[4/5] rounded-2xl bg-[#efbf05]/10 flex items-center justify-center overflow-hidden">
                  <span className="font-[family-name:var(--font-italianno)] text-4xl text-[#efbf05]/50">
                    Gifts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
