import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industryNav, solutionNav } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link href="/" className="brand brand-light" aria-label="Nexcore home">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>Nexcore</span>
          </Link>
          <p>The branded mobile app and growth dashboard for modern aesthetic and wellness practices.</p>
          <Link href="/book-demo" className="footer-demo-link">See Nexcore in action <ArrowUpRight size={17} /></Link>
        </div>
        <div className="footer-nav-grid">
          <div>
            <h2>Product</h2>
            <Link href="/product">Overview</Link>
            {solutionNav.map((item) => <Link href={item.href} key={item.href}>{item.title}</Link>)}
          </div>
          <div>
            <h2>Who we serve</h2>
            {industryNav.map((item) => <Link href={item.href} key={item.href}>{item.title}</Link>)}
          </div>
          <div>
            <h2>Resources</h2>
            <Link href="/resources/blog">Insights</Link>
            <Link href="/resources/guides">Growth guides</Link>
            <Link href="/product#how-it-works">How it works</Link>
            <Link href="/book-demo">Book a demo</Link>
          </div>
          <div>
            <h2>Company</h2>
            <Link href="/about">About Nexcore</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://login.nexcore-app.com/">Client login</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Nexcore LLC. All rights reserved.</p>
        <p>Designed for better patient relationships.</p>
      </div>
    </footer>
  );
}
