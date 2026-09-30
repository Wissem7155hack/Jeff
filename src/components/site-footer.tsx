"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { industryNav, solutionNav } from "@/lib/site-data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link href="/" className="brand brand-light" aria-label="Nexcore home">
            <span className="brand-mark" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                <rect width="32" height="32" rx="8" fill="#141419" />
                <g stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="10.8" y1="9.5" x2="10.8" y2="22.5" />
                  <line x1="21.2" y1="9.5" x2="21.2" y2="22.5" />
                  <line x1="10.8" y1="9.8" x2="21.2" y2="22.2" />
                </g>
              </svg>
            </span>
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
            <Link href="/login">Client login</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Nexcore Solutions LLC. All rights reserved.</p>
        <p>Designed for better patient relationships.</p>
      </div>
    </footer>
  );
}
