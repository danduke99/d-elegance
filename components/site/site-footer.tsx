import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Gift Boxes', href: '/shop?category=gift-boxes' },
    { name: 'Under 25 XCG', href: '/shop?category=under-25' },
    { name: 'Seasonal', href: '/shop?category=seasonal' },
    { name: 'Accessories', href: '/shop?category=accessories' },
  ],
  support: [
    { name: 'Contact Us', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-[family-name:var(--font-italianno)] text-4xl text-background">
              {"D'Elegance"}
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Curated luxury gifts for every occasion. We believe in the art of giving, 
              crafting memorable moments through thoughtfully selected presents.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a 
                href="#" 
                className="text-background/70 hover:text-[#efbf05] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-background/70 hover:text-[#efbf05] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-background uppercase tracking-wider">
                Shop
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-[#efbf05] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-background uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-[#efbf05] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-background uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-[#efbf05] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-background uppercase tracking-wider">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#efbf05] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/70">
                  123 Gift Avenue, Kingstown, St. Vincent
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#efbf05] flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="text-sm text-background/70 hover:text-[#efbf05] transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#efbf05] flex-shrink-0" />
                <a 
                  href="mailto:hello@delegance.shop" 
                  className="text-sm text-background/70 hover:text-[#efbf05] transition-colors"
                >
                  hello@delegance.shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} {"D'Elegance"}. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            Crafted with care in the Caribbean
          </p>
        </div>
      </div>
    </footer>
  )
}
