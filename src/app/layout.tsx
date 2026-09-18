import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Sandy } from "@/components/Sandy";
import { organisationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Accountants in Amanzimtoti | South Coast Advisory",
    template: "%s | South Coast Advisory",
  },
  description: site.description,
  icons: { icon: "/brand/favicon-192.png", apple: "/brand/favicon-512.png" },
  openGraph: { siteName: site.name, locale: "en_ZA", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <JsonLd data={organisationSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Sandy />
      </body>
    </html>
  );
}
