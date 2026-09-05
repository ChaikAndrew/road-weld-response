import type { Metadata } from "next";
import { Audiowide, Play } from "next/font/google";
import "./globals.css";
import FloatingCallButton from "@/components/FloatingCallButton";
import FloatingTikTokButton from "@/components/FloatingTikTokButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
  offeredServices,
  serviceAreaCities,
  serviceAreaCounties,
} from "@/lib/seoContent";

// Industrial, bold fonts for heavy-duty branding
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
});

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play",
});

export const metadata: Metadata = {
  title: "Labida LLC | 24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication",
  description: "24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service. Expert heavy-duty truck repair and fleet services.",
  keywords: "mobile welding, heavy equipment repair, truck repair, emergency mobile welding, fleet services, welding services, mobile welding rochester ny, 24/7 mobile welding rochester, on-site welding rochester ny, heavy equipment welding rochester",
  authors: [{ name: "Labida LLC" }],
  alternates: {
    canonical: "https://www.labidallc.com/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/redketchup/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/redketchup/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/redketchup/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/redketchup/site.webmanifest",
  openGraph: {
    title: "Labida LLC | 24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication",
    description: "24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service.",
    type: "website",
    locale: "en_US",
    url: "https://www.labidallc.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labida LLC | 24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication",
    description: "24/7 Mobile Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Schema.org JSON-LD for LocalBusiness
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Labida LLC",
  "description": "24/7 mobile welding, on-site welding, heavy equipment repair and metal fabrication.",
  "image": "https://www.labidallc.com/redketchup/android-chrome-512x512.png",
  "@id": "https://www.labidallc.com",
  "url": "https://www.labidallc.com",
  "telephone": "+15853157599",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "143 NY 104",
    "addressLocality": "Ontario",
    "addressRegion": "NY",
    "postalCode": "14519",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.2246369,
    "longitude": -77.3715936
  },
  "hasMap": "https://www.google.com/maps/place/Labida+LLC/@43.2246369,-77.3715936,17z/data=!3m1!4b1!4m6!3m5!1s0x452cd65d9ab6a67f:0xccf34007362d0954!8m2!3d43.2246369!4d-77.3715936!16s%2Fg%2F11z29fw2z2",
  "areaServed": [
    ...serviceAreaCounties.map((county) => ({
      "@type": "AdministrativeArea",
      "name": county,
      "containedIn": {
        "@type": "State",
        "name": "New York",
      },
    })),
    ...serviceAreaCities.map((city) => ({
      "@type": "City",
      "name": city,
      "containedIn": {
        "@type": "State",
        "name": "New York",
      },
    })),
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Welding Services",
    "itemListElement": offeredServices.map((service) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "areaServed": {
          "@type": "State",
          "name": "New York"
        },
        "provider": {
          "@type": "HomeAndConstructionBusiness",
          "name": "Labida LLC"
        }
      }
    }))
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-979662197" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-979662197');
            `,
          }}
        />
      </head>
      <body className={`${audiowide.variable} ${play.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <FloatingCallButton />
        <FloatingTikTokButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
