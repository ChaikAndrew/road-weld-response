import type { Metadata } from "next";
import { Audiowide, Play } from "next/font/google";
import "./globals.css";
import FloatingCallButton from "@/components/FloatingCallButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
  title: "Labida LLC | 24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication",
  description: "24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service. Expert heavy-duty truck repair and fleet services.",
  keywords: "roadside welding, mobile welding, heavy equipment repair, truck repair, emergency roadside assistance, fleet services, welding services, mobile welding rochester ny, 24/7 mobile welding rochester, roadside welding rochester ny, heavy equipment welding rochester",
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
    title: "Labida LLC | 24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication",
    description: "24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service.",
    type: "website",
    locale: "en_US",
    url: "https://www.labidallc.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labida LLC | 24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication",
    description: "24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication. Fast response, qualified welders, 24/7 emergency service.",
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
  "description": "24/7 mobile welding, roadside welding, heavy equipment repair and metal fabrication.",
  "image": "https://www.labidallc.com/redketchup/android-chrome-512x512.png",
  "@id": "https://www.labidallc.com",
  "url": "https://www.labidallc.com",
  "telephone": "+15853157599",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rochester",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.1566,
    "longitude": -77.6088
  },
  "areaServed": {
    "@type": "City",
    "name": "Rochester",
    "containedIn": {
      "@type": "State",
      "name": "New York"
    }
  },
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
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Welding",
          "description": "24/7 mobile welding services for broken frames, cracked components, and structural repairs on-site."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} ${play.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <FloatingCallButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
