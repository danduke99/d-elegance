import Link from 'next/link'
import { ArrowRight, Gift, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#efbf05] mb-4">
              <Sparkles className="h-4 w-4" />
              Premium Gift Shop
            </p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
              The Art of{' '}
              <span className="text-[#efbf05]">Thoughtful</span>{' '}
              Giving
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover curated luxury gifts for every occasion. From elegant gift boxes to 
              personalized treasures, we help you create moments that matter.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-foreground hover:bg-foreground hover:text-background">
                <Link href="/shop?category=gift-boxes">
                  Gift Boxes
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#efbf05]" />
                <span>Premium Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#efbf05]" />
                <span>Personalization Available</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-2 border-[#efbf05]/20 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-[#efbf05]/10" />
              </div>
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-[family-name:var(--font-italianno)] text-6xl text-foreground">
                    {"D'Elegance"}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                    Est. 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
