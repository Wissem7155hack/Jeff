import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy", description: "Read the Nexcore Privacy Policy.", alternates: { canonical: "/privacy" }, robots: { index: true, follow: true } };

export default function PrivacyPage() {
  return <main id="main-content" className="legal-page section-dark"><div className="section-container legal-container"><header className="legal-header"><span>Legal</span><h1>Privacy Policy</h1><p>Last updated: June 6, 2026</p></header><div className="legal-layout"><aside><strong>On this page</strong><a href="#definitions">Definitions</a><a href="#data">Data collected</a><a href="#use">How data is used</a><a href="#sharing">Data sharing</a><a href="#rights">Your rights</a><a href="#security">Security</a><a href="#contact">Contact</a></aside><article className="legal-content"><p className="legal-lead">This Privacy Policy describes how Nexcore LLC collects, uses, and discloses information when you use our application, website, and related services.</p>
  <section id="definitions"><h2>1. Interpretation and definitions</h2><p>Capitalized words have the meanings defined below.</p><ul><li><strong>Account</strong> means a unique account created to access the Service.</li><li><strong>Company</strong> refers to Nexcore LLC.</li><li><strong>Personal Data</strong> means information relating to an identified or identifiable individual.</li><li><strong>Service</strong> means the Application, Website, and related services.</li></ul></section>
  <section id="data"><h2>2. Information we collect</h2><p>When you use the Service, we may collect your name, email address, phone number, practice name, and usage data including browser type, pages visited, and device identifiers.</p></section>
  <section id="use"><h2>3. How we use personal data</h2><p>We use personal data to provide, maintain, and improve the Service, manage accounts, respond to requests, and send service communications where permitted by law.</p></section>
  <section id="sharing"><h2>4. How information may be shared</h2><p>We may share information with service providers, in business transfers, with affiliates, and where required by law.</p></section>
  <section id="rights"><h2>5. Your choices and rights</h2><p>Depending on your location, you may have rights to access, correct, or delete personal data. Contact us to make a request.</p></section>
  <section id="security"><h2>6. Data security</h2><p>We use commercially reasonable measures to protect personal data. No method is completely secure.</p></section>
  <section id="contact"><h2>7. Contact us</h2><p>Email <a href="mailto:contact@nexcore-app.com">contact@nexcore-app.com</a> or use our <Link href="/contact">contact form</Link>.</p></section></article></div></div></main>;
}
