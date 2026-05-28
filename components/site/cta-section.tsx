import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#efbf05]/20 to-transparent p-8 lg:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#efbf05]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#efbf05]/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-semibold text-background text-balance">
              Looking for the{' '}
              <span className="text-[#efbf05]">Perfect Gift</span>?
            </h2>
            <p className="mt-4 text-lg text-background/80 leading-relaxed">
              {"Let us help you find something special. Browse our curated collections or reach out for personalized recommendations. We're here to make gifting effortless."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 bg-[#efbf05] text-foreground hover:bg-[#efbf05]/90"
              >
                <Link href="/shop">
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 border-background/30 text-background hover:bg-background hover:text-foreground"
              >
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
