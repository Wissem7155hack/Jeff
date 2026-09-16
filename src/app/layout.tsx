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
  keywords: [
    "medical aesthetic practice software",
    "med spa membership app",
    "white label app for med spa",
    "laser clinic membership software",
    "aesthetic clinic mobile app",
    "med spa loyalty program software",
    "med spa rewards app",
    "branded mobile app for med spa",
    "clinic membership management software",
    "medspa patient retention app",
    "skin rejuvenation clinic app",
    "treatment ecommerce platform",
    "clinic management software",
  ],
  authors: [{ name: "Nexcore LLC" }],
  creator: "Nexcore LLC",
  publisher: "Nexcore LLC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nexcore",
    title: "Nexcore — Med Spa Membership & Loyalty App for Aesthetic Practices",
    description: "The white-label mobile app and growth platform for med spas, laser clinics, and aesthetic practices. Memberships, rewards, treatment ecommerce, and practice analytics.",
    images: [
      {
        url: `${siteUrl}/imgs/glass-flower-hero-v3.avif`,
        width: 1200,
        height: 630,
        alt: "Nexcore — Med Spa Membership & Loyalty App Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexcore — Med Spa Membership & Loyalty App",
    description: "The white-label mobile app and growth platform for modern aesthetic practices.",
    images: [`${siteUrl}/imgs/glass-flower-hero-v3.avif`],
    creator: "@NexcoreApp",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808", colorScheme: "light dark" };

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Nexcore",
      legalName: "Nexcore LLC",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      email: "contact@nexcore-app.com",
      description: "A white-label branded mobile app and growth dashboard for med spas, laser clinics, aesthetic skin clinics, cosmetic dermatology, skin rejuvenation centers, plastic surgery, and wellness practices. Features include treatment ecommerce, membership management, loyalty rewards, automated offers, patient financing, and business intelligence.",
      sameAs: [],
      knowsAbout: [
        "medical aesthetic practice software",
        "med spa membership app",
        "laser clinic membership software",
        "aesthetic clinic loyalty program",
        "white label app for med spa",
        "patient retention",
        "treatment ecommerce",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Nexcore Practice Growth Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      description: "A branded patient mobile app and owner dashboard for med spas, laser clinics, aesthetic skin clinics, and wellness practices. Features include treatment ecommerce, loyalty rewards, membership management, automated offers, and business intelligence.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Tailored practice demo and tier-based SaaS subscriptions",
        availability: "https://schema.org/OnlineOnly",
      },
      featureList: [
        "Branded iOS & Android Patient App",
        "24/7 Treatment Ecommerce & Mobile Checkout",
        "Med Spa Membership Management",
        "Patient Loyalty Points & Rewards",
        "Interactive Scratch-Card Offers with Voice Messages",
        "Practice Analytics & Growth Dashboard",
        "Buy Now Pay Later Patient Financing",
      ],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Nexcore",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body>
        <Script id="enable-js-class" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xxmlz12ild");
          `}
        </Script>
        <Script id="whop-pixel" strategy="lazyOnload">
          {`
            !function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");whop.setScope("biz_Z3bXGOeYmEqXW4");whop.track("page");
          `}
        </Script>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }} />
      </body>
    </html>
  );
}
