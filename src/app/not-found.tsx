import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="error-page section-dark"><div className="error-orb" /><div><span className="error-code">404</span><Search size={28} /><h1>This page stepped out.</h1><p>The route may have changed, but the Nexcore platform is still right where you left it.</p><div><Link className="button button-white" href="/"><ArrowLeft size={16} /> Back to home</Link><Link className="button button-ghost" href="/product">Explore product <span>↗</span></Link></div></div></main>;
}
