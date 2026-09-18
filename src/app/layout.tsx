import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Sandy } from "@/components/Sandy";
import { SiteMotion } from "@/components/SiteMotion";
import { SmoothScroll } from "@/components/SmoothScroll";

/**
 * Arms the reveal animation before the first paint, so content is hidden from
 * the very first frame rather than flashing in and then fading. The failsafe
 * un-hides everything if hydration never happens — a broken bundle must never
 * leave a blank page.
 */
const MOTION_BOOT = `
document.documentElement.classList.add('motion-ready');
window.__motionFailsafe = window.setTimeout(function () {
  document.documentElement.classList.remove('motion-ready');
}, 2500);
`;
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
    /* suppressHydrationWarning: the boot script and Lenis both add classes to
       <html> before React hydrates, so the server and client markup differ by
       design. Scoped to this element only. */
    <html
      lang="en-ZA"
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="motion-boot" strategy="beforeInteractive">
          {MOTION_BOOT}
        </Script>
        <JsonLd data={organisationSchema} />
        <SmoothScroll />
        <SiteMotion />
        <Header />
        <main>{children}</main>
        <Footer />
        <Sandy />
      </body>
    </html>
  );
}
