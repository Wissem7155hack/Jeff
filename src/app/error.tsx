"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  return (
    <main id="main-content" className="error-page section-dark">
      <div className="error-orb" />
      <div>
        <span className="error-code">500</span>
        <AlertTriangle size={28} />
        <h1>Something went wrong.</h1>
        <p>An unexpected error occurred. Please try refreshing the page or return to the homepage.</p>
        <div>
          <Link className="button button-white" href="/"><ArrowLeft size={16} /> Back to home</Link>
          <Link className="button button-ghost" href="/product">Explore product <span>↗</span></Link>
        </div>
      </div>
    </main>
  );
}
