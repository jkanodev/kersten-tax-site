import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domainUrl),
  title: {
    default: `${site.name} | Tax Preparation`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline} Personal, discreet tax preparation and planning in Oklahoma.`,
  openGraph: {
    title: `${site.name} — Tax Preparation`,
    description: site.tagline,
    url: site.domainUrl,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-plum">
        <SiteHeader />
        {/* Bottom padding on small screens so the sticky CTA never covers content */}
        <div className="flex flex-1 flex-col pb-24 lg:pb-0">{children}</div>
        <SiteFooter />
        <StickyMobileCta />
      </body>
    </html>
  );
}
