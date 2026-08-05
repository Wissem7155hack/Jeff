import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import { ProtopiePhone } from "@/components/product-visuals";
import { industries, industryNav, solutionNav } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) return {};
  return { title: `Nexcore for ${industry.title}`, description: industry.heroDescription, alternates: { canonical: `/who-we-serve/${slug}` } };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const otherIndustries = industryNav.filter((i) => i.href !== `/who-we-serve/${slug}`);

  return (
    <main id="main-content">
      <section className="industry-hero section-light">
        <div className="section-container industry-hero-grid">
          <div className="industry-hero-copy">
            <div className="breadcrumbs breadcrumbs-dark"><Link href="/">Home</Link><ChevronRight size={13} /><span>{industry.title}</span></div>
            <span className="eyebrow eyebrow-pink"><Sparkles size={14} /> {industry.title}</span>
            <h1>{industry.heroTitle}</h1>
            <p>{industry.heroDescription}</p>
            <div className="hero-actions"><Link className="button button-pink" href="/book-demo">Book a demo <ArrowRight size={17} /></Link><Link className="button button-outline-dark" href="/product">Explore the platform <span>↗</span></Link></div>
          </div>
          <div className="industry-hero-image">
            <Image src={industry.image} alt={industry.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="industry-image-note"><span><Sparkles size={18} /></span><div><strong>{industry.imageNote}</strong><small>Nexcore platform</small></div></div>
          </div>
        </div>
      </section>

      <section className="practice-challenges section-dark">
        <div className="section-container">
          <div className="center-heading"><span className="eyebrow eyebrow-light">Common challenges</span><h2>Sound familiar?</h2></div>
          <div className="challenge-grid">
            {industry.challenges.map((c) => <div key={c.label}><span>{c.label}</span><p>{c.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="industry-outcomes section-light">
        <div className="section-container">
          <div className="center-heading narrow"><span className="eyebrow eyebrow-pink">What changes with Nexcore</span><h2>Built for how {industry.title.toLowerCase()} actually grow.</h2></div>
          <div className="industry-outcome-grid">
            {industry.outcomes.map((o) => { const OIcon = o.icon; return <article key={o.title}><span><OIcon size={22} /></span><h3>{o.title}</h3><p>{o.description}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="industry-platform section-soft">
        <div className="section-container industry-platform-grid">
          <div className="industry-platform-copy">
            <span className="eyebrow eyebrow-pink">The Nexcore platform</span>
            <h2>Everything your practice needs in one app.</h2>
            <p>From treatment shopping and loyalty rewards to memberships and business intelligence — Nexcore brings it all together.</p>
            <ul>
              <li><Check size={16} /> Branded patient mobile app</li>
              <li><Check size={16} /> Owner dashboard with live activity</li>
              <li><Check size={16} /> Treatment ecommerce with mobile checkout</li>
              <li><Check size={16} /> Points, rewards, and referral tracking</li>
            </ul>
            <Link className="text-link" href="/product">Explore the full platform <span>↗</span></Link>
          </div>
          <div className="industry-stack">
            <div className="industry-stack-glow" />
            {solutionNav.slice(0, 4).map((s) => { const SIcon = s.icon; return <article key={s.href}><SIcon size={20} /><div><small>Nexcore</small><strong>{s.title}</strong></div></article>; })}
          </div>
        </div>
      </section>

      <section className="other-industries section-light">
        <div className="section-container">
          <div className="center-heading"><span className="eyebrow eyebrow-pink">Also built for</span><h2>Explore Nexcore for other practice types.</h2></div>
          <div className="other-industry-links">
            {otherIndustries.map((o) => <Link href={o.href} key={o.href}>{o.title}<ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">See it for your practice</span><h2>Explore what Nexcore looks like for {industry.title.toLowerCase()}.</h2><p>Book a tailored walkthrough focused on the growth priorities of your {industry.title.toLowerCase()} practice.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
