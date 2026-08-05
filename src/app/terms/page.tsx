import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms of Service", description: "Read the Nexcore Terms of Service.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <main id="main-content" className="legal-page section-dark"><div className="section-container legal-container"><header className="legal-header"><span>Legal</span><h1>Terms of Service</h1><p>Last updated: June 6, 2026</p></header><div className="legal-layout"><aside><strong>On this page</strong><a href="#acceptance">Acceptance</a><a href="#use">Use of Service</a><a href="#accounts">Accounts</a><a href="#ip">Intellectual property</a><a href="#liability">Limitation of liability</a><a href="#contact">Contact</a></aside><article className="legal-content"><p className="legal-lead">These Terms of Service govern your use of the Nexcore application, website, and related services provided by Nexcore LLC.</p>
  <section id="acceptance"><h2>1. Acceptance of terms</h2><p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p></section>
  <section id="use"><h2>2. Use of the Service</h2><p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to misuse, reverse-engineer, or interfere with the Service.</p></section>
  <section id="accounts"><h2>3. Accounts</h2><p>You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.</p></section>
  <section id="ip"><h2>4. Intellectual property</h2><p>The Service, including its design, features, code, and content, is owned by Nexcore LLC and protected by intellectual property laws.</p></section>
  <section id="liability"><h2>5. Limitation of liability</h2><p>To the maximum extent permitted by law, Nexcore LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p></section>
  <section id="contact"><h2>6. Contact</h2><p>For questions about these Terms, email <a href="mailto:contact@nexcore-app.com">contact@nexcore-app.com</a> or use our <Link href="/contact">contact form</Link>.</p></section></article></div></div></main>;
}
