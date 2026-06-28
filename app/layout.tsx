import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dinozauri Beach — Tournament Dates",
  description: "Pick your availability for the beach volleyball tournament.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full text-forest">
        <SiteHeader />
        <main className="pt-24 pb-12">{children}</main>
      </body>
    </html>
  );
}
