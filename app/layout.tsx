import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { auth } from "@/lib/auth";
import { SiteHeader } from "@/components/SiteHeader";
import { ConditionalPageTabs } from "@/components/ConditionalPageTabs";
import { lv } from "@/lib/i18n/lv";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: lv.meta.title,
  description: lv.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const signedIn = Boolean(session?.user);

  return (
    <html
      lang="lv"
      className={`${outfit.variable} ${dmSans.variable} antialiased ${signedIn ? "min-h-dvh" : "min-h-dvh lg:h-dvh lg:overflow-hidden"}`}
    >
      <body
        className={`flex min-h-dvh flex-col overflow-x-hidden text-forest ${signedIn ? "" : "lg:h-dvh lg:overflow-hidden"}`}
      >
        <SiteHeader />
        <main
          className={`flex flex-1 flex-col pt-24 sm:pt-28 ${
            signedIn
              ? "pb-[max(3rem,env(safe-area-inset-bottom))]"
              : "pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:min-h-0 lg:overflow-hidden lg:pb-0"
          }`}
        >
          <div
            className={`mx-auto flex w-full max-w-6xl flex-1 flex-col px-[max(1rem,env(safe-area-inset-right))] sm:px-6 ${
              signedIn ? "" : "lg:min-h-0 lg:overflow-hidden"
            }`}
          >
            <ConditionalPageTabs />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
