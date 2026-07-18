import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import { PhoneMockup, ProtopiePhone, ImagePhone } from "@/components/product-visuals";
import { solutionNav, solutions } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug];
  if (!solution) return {};
  return {
    title: solution.eyebrow,
    description: solution.description,
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: { title: `${solution.eyebrow} for Aesthetic Practices`, description: solution.description, url: `/solutions/${slug}` },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutions[slug];
  if (!solution) notFound();
  const Icon = solution.icon;
  const otherSolutions = solutionNav.filter((item) => item.href !== `/solutions/${slug}`).slice(0, 3);
  const faqs = [
    { q: `How does Nexcore ${solution.eyebrow.toLowerCase()} fit into the patient app?`, a: `It is part of the same branded Nexcore experience patients use to browse treatments, view points, access rewards, understand memberships, and connect with your practice.` },
    { q: "Can the experience match our practice brand?", a: "Yes. Nexcore is designed around your practice identity, including your clinic name, logo, colors, treatments, locations, and patient-facing content." },
    { q: "Where can the practice see activity?", a: "Relevant activity appears in the owner dashboard alongside clients, mobile sales, rewards, reviews, referrals, visits, and recent events." },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

  return (
    <main id="main-content">
      <section className="solution-hero section-dark">
        <div className="solution-orb orb-one" /><div className="solution-orb orb-two" />
        <div className="section-container solution-hero-grid">
          <div className="solution-hero-copy">
            <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/product">Solutions</Link><ChevronRight size={13} /><span>{solution.eyebrow}</span></div>
            <span className="eyebrow eyebrow-light"><Icon size={14} /> {solution.eyebrow}</span>
            <h1>{solution.title}</h1>
            <p>{solution.description}</p>
            <div className="hero-actions"><Link className="button button-white" href="/book-demo">Book a demo <ArrowRight size={17} /></Link><Link className="button button-ghost" href="#features">Explore features <span>↓</span></Link></div>
            <div className="solution-stat"><strong>{solution.stat}</strong><span>{solution.statLabel}</span></div>
          </div>
          <div className="solution-phone">
            <div className="phone-halo" />
            {slug === "ecommerce" && (
              <ImagePhone src="/imgs/ECOM.jfif" alt="Ecommerce preview" />
            )}
            {slug === "mobile-rewards" && (
              <ProtopiePhone src="https://cloud.protopie.io/p/bbc5dfec037a92153d1995ce?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Mobile Rewards Prototype" />
            )}
            {slug === "memberships" && (
              <ProtopiePhone src="https://cloud.protopie.io/p/c130351e2ef62af898588c52?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Memberships Prototype" />
            )}
            {slug === "patient-engagement" && (
              <ProtopiePhone src="https://cloud.protopie.io/p/c03b4bd475e6e3ad648e0040?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Patient Engagement Prototype" />
            )}
            {slug === "patient-financing" && (
              <ProtopiePhone src="https://cloud.protopie.io/p/0c14d0a046e20ee0e79234fb?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Patient Financing Prototype" />
            )}
            {slug === "business-intelligence" && (
              <PhoneMockup visual={solution.visual} />
            )}
          </div>
        </div>
      </section>

      <section className="outcome-section section-light">
        <div className="section-container outcome-grid">
          <div><span className="eyebrow eyebrow-pink">Why it matters</span><h2>{solution.outcomeTitle}</h2></div>
          <div><p>{solution.outcomeBody}</p><ul><li><Check size={16} /> Built into your branded patient app</li><li><Check size={16} /> Connected to the Nexcore owner dashboard</li><li><Check size={16} /> Designed for mobile-first patient behavior</li></ul></div>
        </div>
      </section>

      <section className="feature-detail-section section-soft" id="features">
        <div className="section-container">
          <div className="center-heading narrow"><span className="eyebrow eyebrow-pink"><Sparkles size={14} /> Core capabilities</span><h2>Everything you need to make {solution.eyebrow.toLowerCase()} part of the patient journey.</h2></div>
          <div className="feature-detail-grid">
            {solution.features.map((feature, index) => { const FeatureIcon = feature.icon; return <article key={feature.title}><span className="feature-index">0{index + 1}</span><div className="feature-icon"><FeatureIcon size={22} /></div><h3>{feature.title}</h3><p>{feature.description}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="process-section section-light">
        <div className="section-container">
          <div className="split-heading"><div><span className="eyebrow eyebrow-pink">How it works</span><h2>A simple path from setup to patient action.</h2></div><p>Your team controls the practice content. Nexcore turns it into a consistent mobile experience that stays connected to the dashboard.</p></div>
          <div className="process-list">
            {solution.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p><i /></article>)}
          </div>
        </div>
      </section>

      <section className="cross-solution section-dark">
        <div className="section-container">
          <div className="split-heading align-end"><div><span className="eyebrow eyebrow-light">Part of one platform</span><h2>Connect every growth experience.</h2></div><Link className="text-link text-link-light" href="/product">View the complete platform <span>↗</span></Link></div>
          <div className="cross-card-grid">
            {otherSolutions.map((item) => { const ItemIcon = item.icon; return <Link href={item.href} key={item.href}><span><ItemIcon size={20} /></span><h3>{item.title}</h3><p>{item.blurb}</p><b>Explore <i>↗</i></b></Link>; })}
          </div>
        </div>
      </section>

      <section className="faq-section section-light">
        <div className="section-container faq-grid"><div><span className="eyebrow eyebrow-pink">Common questions</span><h2>Know before you see it.</h2><p>Get a closer look at the Nexcore experience in a personalized product walkthrough.</p><Link className="button button-dark" href="/book-demo">Request a demo <ArrowRight size={16} /></Link></div><div className="faq-list">{faqs.map((faq) => <details key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></div>
      </section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">See it in your context</span><h2>Imagine {solution.eyebrow.toLowerCase()} under your practice brand.</h2><p>Book a tailored Nexcore walkthrough and explore the full patient and owner experience.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
