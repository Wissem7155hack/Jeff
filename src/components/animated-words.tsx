"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedWords({
  text,
  className = "",
  as = "span",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`aw ${visible ? "is-visible" : ""} ${className}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="aw-word" aria-hidden="true" key={`${word}-${index}`}>
          <span className="aw-inner" style={{ transitionDelay: `${index * 55}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}