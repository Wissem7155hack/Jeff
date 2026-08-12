import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "@fontsource-variable/manrope";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const siteUrl = "https://nexcore-app.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Nexcore — Med Spa Membership & Loyalty App for Aesthetic Practices", template: "%s — Nexcore" },
  description: "The branded mobile app for med spas, laser clinics, and aesthetic skin clinics. Memberships, loyalty rewards, treatment ecommerce, automated offers, and business intelligence in one white-label platform.",
  applicationName: "Nexcore",
  keywords: ["med spa membership app", "white label app for med spa", "laser clinic membership software", "aesthetic clinic mobile app", "med spa loyalty program software", "med spa rewards app", "branded mobile app for med spa", "clinic membership management software", "medspa patient retention app", "skin rejuvenation clinic app"],
  authors: [{ name: "Nexcore LLC" }],
  creator: "Nexcore LLC",
  publisher: "Nexcore LLC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nexcore",
    title: "Nexcore — Med Spa Membership & Loyalty App",
    description: "The white-label mobile app for med spas, laser clinics, and aesthetic practices. Memberships, rewards, ecommerce, and business intelligence in one platform.",
  },
  twitter: { card: "summary_large_image", title: "Nexcore", description: "The branded mobile app and growth dashboard for modern practices." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808", colorScheme: "light dark" };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexcore",
  legalName: "Nexcore LLC",
  url: siteUrl,
  email: "contact@nexcore-app.com",
  description: "A white-label branded mobile app and growth dashboard for med spas, laser clinics, aesthetic skin clinics, cosmetic dermatology, skin rejuvenation centers, plastic surgery, and wellness practices. Features include treatment ecommerce, membership management, loyalty rewards, automated offers, patient financing, and business intelligence.",
  sameAs: [],
  knowsAbout: ["med spa membership app", "laser clinic membership software", "aesthetic clinic loyalty program", "white label app for med spa", "patient retention", "treatment ecommerce"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="enable-js-class" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xxmlz12ild");
          `}
        </Script>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
