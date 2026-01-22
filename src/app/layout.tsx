import type { Metadata } from "next";
import { DM_Sans, Italianno } from "next/font/google";
import "./globals.css";

const inter = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D’Elegance | Gift Shop",
  description: "Your #1 online store for accessories...!!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
