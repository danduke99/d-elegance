import type { Metadata } from "next";
import { DM_Sans, Italianno } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../lib/cart/cartStore";

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D’Elegance | Gift Shop",
  description: "Your #1 online store for accessories...!!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${italianno.variable} ${dmSans.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
