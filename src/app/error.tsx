"use client";

import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="main-content" className="error-page section-dark"><div className="error-orb" /><div><span className="error-code">N/C</span><RefreshCcw size={28} /><h1>Something needs a quick reset.</h1><p>The page could not be completed. Try again, or return to the Nexcore homepage.</p><div><button className="button button-white" type="button" onClick={reset}><RefreshCcw size={16} /> Try again</button><Link className="button button-ghost" href="/">Back to home <span>↗</span></Link></div></div></main>;
}
