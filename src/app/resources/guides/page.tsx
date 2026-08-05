import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Gift, RefreshCcw, ShoppingBag, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Growth Guides", description: "Explore Nexcore growth guides for building loyalty programs, after-hours sales engines, membership frameworks, and patient engagement strategies.", alternates: { canonical: "/resources/guides" } };

const guides = [
  { number: "01", icon: Gift, category: "Loyalty", title: "The complete loyalty program playbook", description: "Design a points, rewards, and engagement system patients actually use.", href: "/resources/blog/build-a-patient-loyalty-program" },
  { number: "02", icon: ShoppingBag, category: "Ecommerce", title: "After-hours sales engine guide", description: "Capture treatment decisions patients make between 7 and 11 PM.", href: "/resources/blog/after-hours-treatment-sales" },
  { number: "03", icon: RefreshCcw, category: "Memberships", title: "Membership framework for aesthetics", description: "Structure recurring value with treatment choice and member pricing.", href: "/resources/blog/membership-offer-framework" },
  { number: "04", icon: Sparkles, category: "Engagement", title: "Gamification and scratch-card marketing", description: "Use interactive offers and voice messages to drive impulse purchases.", href: "/resources/blog/gamification-med-spa-marketing" },
];

export default function GuidesPage() {
  return (
    <main id="main-content">
      <section className="guides-hero section-dark">
        <div className="resource-orb" />
        <div className="section-container">
          <span className="eyebrow eyebrow-light">Growth guides</span>
          <h1>Frameworks for sustainable practice growth.</h1>
          <p>In-depth resources for designing loyalty, ecommerce, membership, and engagement experiences that drive patient retention and revenue.</p>
        </div>
      </section>

      <section className="guide-list-section section-light">
        <div className="section-container">
          <div className="guide-list">
            {guides.map((g) => { const GIcon = g.icon; return (
              <article key={g.number}>
                <span className="guide-number">{g.number}</span>
                <div className="guide-icon"><GIcon size={22} /></div>
                <div><small>{g.category}</small><h2>{g.title}</h2><p>{g.description}</p></div>
                <Link href={g.href}><ArrowRight size={18} /></Link>
              </article>
            ); })}
          </div>
        </div>
      </section>

      <section className="guide-principles section-soft">
        <div className="section-container">
          <div className="center-heading"><span className="eyebrow eyebrow-pink">Our approach</span><h2>Every guide follows three principles.</h2></div>
          <div className="principle-grid">
            <div><span>01</span><h3>Practical first</h3><p>Every framework is designed to be implemented, not just understood. Clear steps and real examples throughout.</p></div>
            <div><span>02</span><h3>Patient-centered</h3><p>Growth strategies work best when they improve the patient experience rather than interrupting it.</p></div>
            <div><span>03</span><h3>Measurable outcomes</h3><p>Each guide connects actions to metrics so you can track impact and adjust your approach over time.</p></div>
          </div>
        </div>
      </section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">See it in action</span><h2>Watch these strategies come to life inside Nexcore.</h2><p>Book a tailored demo and explore the patient app and owner dashboard.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
