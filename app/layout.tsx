import type { Metadata, Viewport } from 'next'
import { DM_Sans, Italianno } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/lib/cart/cart-context'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const italianno = Italianno({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italianno',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "D'Elegance | Premium Gift Shop",
    template: "%s | D'Elegance",
  },
  description: 'Discover curated luxury gifts for every occasion. Premium gift boxes, accessories, and personalized presents crafted with elegance.',
  keywords: ['gift shop', 'luxury gifts', 'gift boxes', 'personalized gifts', 'premium presents'],
  authors: [{ name: "D'Elegance" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "D'Elegance",
    title: "D'Elegance | Premium Gift Shop",
    description: 'Discover curated luxury gifts for every occasion.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Elegance | Premium Gift Shop",
    description: 'Discover curated luxury gifts for every occasion.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${italianno.variable}`}>
      <body className="font-sans antialiased bg-background">
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
