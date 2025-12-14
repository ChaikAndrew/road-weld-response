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
  keywords: "roadside welding, mobile welding, heavy equipment repair, truck repair, emergency roadside assistance, fleet services, welding services",
  authors: [{ name: "Labida LLC" }],
  icons: {
    icon: [
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} ${play.variable} font-sans antialiased`}>
        {children}
        <FloatingCallButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
