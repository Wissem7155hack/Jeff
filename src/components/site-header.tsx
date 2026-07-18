"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { industryNav, solutionNav } from "@/lib/site-data";

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Nexcore home">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span>Nexcore</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link className={pathname === "/product" ? "active" : ""} href="/product">Product</Link>
            <div className="nav-dropdown">
              <button className={pathname.startsWith("/solutions") ? "active" : ""} type="button" aria-haspopup="true">
                Solutions <ChevronDown size={14} />
              </button>
              <div className="mega-menu solutions-menu">
                <div className="mega-kicker">Grow with Nexcore</div>
                <div className="mega-grid">
                  {solutionNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link href={item.href} key={item.href}>
                        <span className="mega-icon"><Icon size={18} /></span>
                        <span><strong>{item.title}</strong><small>{item.blurb}</small></span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="nav-dropdown">
              <button className={pathname.startsWith("/who-we-serve") ? "active" : ""} type="button" aria-haspopup="true">
                Who We Serve <ChevronDown size={14} />
              </button>
              <div className="mega-menu compact-menu">
                <div className="mega-kicker">Built for modern practices</div>
                {industryNav.map((item) => <Link href={item.href} key={item.href}>{item.title}<span>↗</span></Link>)}
              </div>
            </div>
            <div className="nav-dropdown">
              <button className={pathname.startsWith("/resources") ? "active" : ""} type="button" aria-haspopup="true">
                Resources <ChevronDown size={14} />
              </button>
              <div className="mega-menu compact-menu">
                <div className="mega-kicker">Explore Nexcore</div>
                <Link href="/resources/blog">Insights <span>↗</span></Link>
                <Link href="/resources/guides">Growth guides <span>↗</span></Link>
                <Link href="/product#how-it-works">How it works <span>↗</span></Link>
              </div>
            </div>
            <Link className={pathname === "/about" ? "active" : ""} href="/about">Company</Link>
          </nav>
          <div className="header-actions">
            <a className="login-link" href="https://login.nexcore-app.com/">Log in</a>
            <Link className="button button-dark button-small" href="/book-demo">Book a demo <span>↗</span></Link>
          </div>
          <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <Link href="/product">Product <span>↗</span></Link>
          <p>Solutions</p>
          {solutionNav.map((item) => <Link className="mobile-sub" href={item.href} key={item.href}>{item.title}</Link>)}
          <p>Who we serve</p>
          {industryNav.map((item) => <Link className="mobile-sub" href={item.href} key={item.href}>{item.title}</Link>)}
          <Link href="/resources/blog">Resources <span>↗</span></Link>
          <Link href="/about">Company <span>↗</span></Link>
          <Link href="/contact">Contact <span>↗</span></Link>
          <div className="mobile-menu-actions">
            <a className="button button-outline-dark" href="https://login.nexcore-app.com/">Log in</a>
            <Link className="button button-pink" href="/book-demo">Book a demo <span>↗</span></Link>
          </div>
        </nav>
      </div>
    </>
  );
}
