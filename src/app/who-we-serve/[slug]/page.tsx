import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Gift, RefreshCcw, ShoppingBag, Smartphone } from "lucide-react";
import { industries, industryNav } from "@/lib/site-data";

export function generateStaticParams() { return Object.keys(industries).map((slug) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = industries[slug];
  if (!page) return {};
  return { title: page.eyebrow, description: page.description, alternates: { canonical: `/who-we-serve/${slug}` }, openGraph: { title: `${page.eyebrow} | Nexcore`, description: page.description, images: [{ url: page.image, alt: page.imageAlt }] } };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = industries[slug];
  if (!page) notFound();
  const others = industryNav.filter((item) => !item.href.endsWith(slug));

  return (
    <main id="main-content">
      <section className="industry-hero section-light">
        <div className="section-container industry-hero-grid">
          <div className="industry-hero-copy"><div className="breadcrumbs breadcrumbs-dark"><Link href="/">Home</Link><ChevronRight size={13} /><span>Who we serve</span><ChevronRight size={13} /><span>{page.eyebrow.replace("For ", "")}</span></div><span className="eyebrow eyebrow-pink">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.description}</p><div className="hero-actions"><Link className="button button-pink" href="/book-demo">Book a tailored demo <ArrowRight size={17} /></Link><Link className="button button-outline-dark" href="/product">Explore the platform <span>↗</span></Link></div></div>
          <div className="industry-hero-image"><Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" /><div className="industry-image-note"><span><Smartphone size={18} /></span><div><strong>Your brand, on mobile</strong><small>Built around the patient journey</small></div></div></div>
        </div>
      </section>

      <section className="practice-challenges section-dark"><div className="section-container"><div className="split-heading"><div><span className="eyebrow eyebrow-light">The opportunity</span><h2>Move beyond the limits of the front desk.</h2></div><p>Patients keep thinking about their care after they leave. Nexcore gives your practice a helpful, branded place to meet that interest.</p></div><div className="challenge-grid">{page.challenges.map((challenge, index) => <div key={challenge}><span>0{index + 1}</span><p>{challenge}</p></div>)}</div></div></section>

      <section className="industry-outcomes section-light"><div className="section-container"><div className="center-heading narrow"><span className="eyebrow eyebrow-pink">Designed around your workflow</span><h2>A clearer path to patient value.</h2><p>Bring ongoing patient engagement and day-to-day practice visibility into one connected experience.</p></div><div className="industry-outcome-grid">{page.outcomes.map((outcome) => { const Icon = outcome.icon; return <article key={outcome.title}><span><Icon size={23} /></span><h3>{outcome.title}</h3><p>{outcome.body}</p></article>; })}</div></div></section>

      <section className="industry-platform section-soft"><div className="section-container industry-platform-grid"><div className="industry-platform-copy"><span className="eyebrow eyebrow-pink">What comes together</span><h2>The mobile growth essentials, in one place.</h2><p>Nexcore keeps the patient experience simple while giving your team a unified way to publish, sell, engage, and measure.</p><ul><li><Check size={16} /> A mobile app branded to your practice</li><li><Check size={16} /> Treatment and package ecommerce</li><li><Check size={16} /> Points, rewards, referrals, and reviews</li><li><Check size={16} /> Recurring memberships and member pricing</li><li><Check size={16} /> Push notifications and app content</li><li><Check size={16} /> Owner dashboard and offer reporting</li></ul><Link href="/product" className="text-link">See the complete platform <span>↗</span></Link></div><div className="industry-stack"><article><ShoppingBag size={22} /><span><small>Mobile commerce</small><strong>Keep treatments available 24/7</strong></span></article><article><RefreshCcw size={22} /><span><small>Memberships</small><strong>Make recurring value visible</strong></span></article><article><Gift size={22} /><span><small>Rewards</small><strong>Give patients a reason to return</strong></span></article><div className="industry-stack-glow" /></div></div></section>

      <section className="other-industries section-light"><div className="section-container"><div className="split-heading align-end"><div><span className="eyebrow eyebrow-pink">Explore more</span><h2>Nexcore across modern care.</h2></div></div><div className="other-industry-links">{others.map((item) => <Link href={item.href} key={item.href}><span>{item.title}</span><ArrowRight size={18} /></Link>)}</div></div></section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">Built for your practice</span><h2>See Nexcore through the lens of {page.eyebrow.replace("For ", "").toLowerCase()}.</h2><p>Book a tailored walkthrough of the branded app, owner dashboard, and growth experiences.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
