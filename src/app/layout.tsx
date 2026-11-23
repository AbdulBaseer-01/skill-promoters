import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skillpromoters.co";
const TITLE = "Skill Promoters — Construction & Real Estate Development, Hyderabad";
const DESCRIPTION =
  "Since 1994, Skill Promoters has developed 100+ residential, commercial and housing projects across Hyderabad — including Sarath City Capital Mall, Fern Heights and Asian Suncity.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Skill Promoters" },
  description: DESCRIPTION,
  applicationName: "Skill Promoters",
  keywords: [
    "Skill Promoters",
    "Skill Group",
    "real estate developer Hyderabad",
    "construction company Telangana",
    "Sarath City Capital Mall",
    "Fern Heights Lakdikapul",
    "Asian Suncity Kondapur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Skill Promoters",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Fern Heights, Lakdikapul — a Skill Group residential development at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@skill_promoters",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#171816",
  colorScheme: "light",
};

/* Hides the hero copy before hydration so the entrance can play without a flash.
   Skipped under reduced motion; removed after 4s if scripts fail to run. */
const bootScript = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-boot');setTimeout(function(){if(!window.__heroDone)d.classList.remove('motion-boot')},4000)}catch(e){}})();`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skill Promoters Pvt. Ltd.",
  url: SITE_URL,
  foundingDate: "1994",
  email: "info@skillpromoters.co",
  address: {
    "@type": "PostalAddress",
    streetAddress: "City Center Mall, Level 6, Road No. 1 & 10, Banjara Hills",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500034",
    addressCountry: "IN",
  },
  sameAs: ["https://www.facebook.com/SkillPromoters/", "https://twitter.com/skill_promoters"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
