"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setupReveal() {
  const reduced = isReducedMotion();
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal], .reveal")
  ) as HTMLElement[];

  if (reduced) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return () => {};
  }

  elements.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (isReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const scrollToHash = (hash: string) => {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) lenis.scrollTo(target, { offset: -108 });
    };

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;
      const raw = anchor.getAttribute("href") || "";
      const hashIndex = raw.indexOf("#");
      if (hashIndex === -1) return;
      const hash = raw.slice(hashIndex);
      const linkPath = raw.slice(0, hashIndex) || "/";
      const currentPath = location.pathname.replace(/\/$/, "") || "/";
      const targetPath = linkPath.replace(/\/$/, "") || "/";
      if (targetPath === currentPath || targetPath === "/") {
        event.preventDefault();
        scrollToHash(hash);
      }
    };
    document.addEventListener("click", onAnchorClick);

    const onHashChange = () => scrollToHash(location.hash);
    window.addEventListener("hashchange", onHashChange);

    const bodyObserver = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      bodyObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setupReveal();
  }, [pathname]);

  return null;
}