"use client";

import { useEffect, useState } from "react";

export function TypeWriter({
  phrases,
  className = "",
  typeSpeed = 55,
  deleteSpeed = 26,
  holdTime = 2400,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}) {
  const [text, setText] = useState(phrases[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = phrases[index] ?? "";
    let timer: number | undefined;

    if (!deleting && text.length < current.length) {
      timer = window.setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting) {
      timer = window.setTimeout(() => setDeleting(true), holdTime);
    } else if (text.length > 0) {
      timer = window.setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else {
      timer = window.setTimeout(() => {
        setIndex((index + 1) % phrases.length);
        setDeleting(false);
      }, 220);
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={`typewriter ${className}`}>
      <span className="tw-text">{text}</span>
      <span className="tw-caret" aria-hidden="true" />
    </span>
  );
}