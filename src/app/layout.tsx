import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/manrope";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = "https://nexcore-app.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Nexcore — The Branded App for Aesthetic Practices", template: "%s — Nexcore" },
  description: "Nexcore brings mobile rewards, treatment ecommerce, memberships, patient engagement, financing, and practice insights into one branded app.",
  applicationName: "Nexcore",
  keywords: ["aesthetic practice app", "medical spa app", "clinic loyalty program", "patient memberships", "treatment ecommerce", "practice growth platform"],
  authors: [{ name: "Nexcore LLC" }],
  creator: "Nexcore LLC",
  publisher: "Nexcore LLC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nexcore",
    title: "Nexcore — The Branded App for Aesthetic Practices",
    description: "Make your practice available on every patient’s phone with rewards, shopping, memberships, engagement, and business insights.",
  },
  twitter: { card: "summary_large_image", title: "Nexcore", description: "The branded mobile app and growth dashboard for modern practices." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808", colorScheme: "light dark" };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexcore",
  legalName: "Nexcore LLC",
  url: siteUrl,
  email: "contact@nexcore-app.com",
  description: "A branded mobile app and dashboard for aesthetic and wellness practices.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
