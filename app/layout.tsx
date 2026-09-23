import type { Metadata } from "next";
import { Instrument_Sans, Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BootstrapClient } from "@/components/layout/BootstrapClient";
import { CookieConsentBanner } from "@/components/cookie/CookieConsentBanner";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageTransition } from "@/components/ui/PageTransition";
import { LiveChatWidget } from "@/components/chat/LiveChatWidget";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo/site";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Mortgage Broker in Ontario | ${SITE_NAME}`,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Mortgage Advisory & Business Funding` }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${outfit.variable}`}>
      <body>
        <LanguageProvider>
          <BootstrapClient />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CookieConsentBanner />
          <BackToTop />
          <LiveChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
