import type { Metadata } from "next";
import { Audiowide, Play } from "next/font/google";
import "./globals.css";

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
  title: "Road Weld Response | Mobile Roadside Welding & Heavy Equipment Assistance",
  description: "Professional mobile roadside welding and heavy equipment assistance. Fast response, certified welders, 24/7 emergency service. Expert heavy-duty truck repair and fleet services.",
  keywords: "roadside welding, mobile welding, heavy equipment repair, truck repair, emergency roadside assistance, fleet services, welding services",
  authors: [{ name: "Road Weld Response" }],
  openGraph: {
    title: "Road Weld Response | Mobile Roadside Welding & Heavy Equipment Assistance",
    description: "Professional mobile roadside welding and heavy equipment assistance. Fast response, certified welders, 24/7 emergency service.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road Weld Response | Mobile Roadside Welding & Heavy Equipment Assistance",
    description: "Professional mobile roadside welding and heavy equipment assistance. Fast response, certified welders, 24/7 emergency service.",
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
      </body>
    </html>
  );
}
