import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  Gift,
  HeartHandshake,
  RefreshCcw,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { DashboardPreview, ProductShowcase } from "@/components/product-visuals";
import { AnimatedWords } from "@/components/animated-words";
import { TypeWriter } from "@/components/typewriter";
import { blogPosts, industryNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Med Spa Membership & Loyalty App | Branded Mobile App for Aesthetic Practices",
  description: "The branded mobile app that helps med spas, laser clinics, and aesthetic skin clinics generate recurring revenue with memberships, rewards, and automated offers. 70% of sales happen after hours — capture them.",
  alternates: { canonical: "/" },
  keywords: ["med spa membership app", "white label app for med spa", "laser clinic membership software", "aesthetic clinic mobile app", "med spa loyalty program software", "med spa rewards app", "branded mobile app for med spa", "clinic membership management software", "med spa recurring revenue software", "patient loyalty app"],
};

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <Image className="home-hero-image" src="/imgs/bg.png" alt="A clinician caring for a patient in a modern treatment room" fill priority sizes="100vw" />
        <div className="home-hero-overlay" />
        <div className="hero-noise" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow eyebrow-light" data-reveal><i /> Your practice, on every patient&apos;s phone</span>
            <h1>
              <AnimatedWords as="span" text="The branded app that grows your practice" />
              {" "}
              <TypeWriter phrases={["while you sleep.", "after hours.", "around the clock.", "with your brand."]} />
            </h1>
            <p data-reveal data-reveal-delay="120">Nexcore is the white-label mobile app for med spas, laser clinics, and aesthetic practices. Memberships, loyalty rewards, treatment shopping, automated offers, and business intelligence — all inside your own branded app. 70% of sales happen after hours. Capture them.</p>
            <div className="hero-actions" data-reveal data-reveal-delay="240">
              <Link className="button button-white" href="/book-demo">Book a demo <ArrowRight size={17} /></Link>
              <Link className="button button-ghost" href="/product">Explore the platform <span>↗</span></Link>
            </div>
          </div>
          <div className="hero-phone-wrap reveal reveal-delay-1" aria-label="Nexcore patient app preview">
            <div className="hero-glow" />
            <div className="phone-device compact">
              <div className="phone-side left-one" /><div className="phone-side left-two" /><div className="phone-side right-one" />
              <div className="phone-screen" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
                <div className="phone-notch" />
                <iframe
                  src="https://cloud.protopie.io/p/c03b4bd475e6e3ad648e0040?ui=false&mockup=false&scaleToFit=true&cursorType=touch"
                  style={{ width: "100%", height: "100%", border: "none", borderRadius: "38px", display: "block" }}
                  title="Nexcore App Prototype"
                  allow="accelerometer; camera; clipboard-write; encrypted-media; geolocation; gyroscope; microphone; payment; usb"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll"><span>Discover Nexcore</span><i /></div>
      </section>

      <section className="trust-strip" aria-label="Platform capabilities">
        <div><span>A branded patient experience</span><span>•</span><span>Available on mobile</span><span>•</span><span>Connected owner dashboard</span><span>•</span><span>One platform for growth</span></div>
      </section>

      <section className="metrics-section section-dark">
        <div className="section-container">
          <div className="metrics-heading">
            <span className="eyebrow eyebrow-light" data-reveal>Engineered for modern practices</span>
            <h2><AnimatedWords as="span" text="More ways to turn patient interest into lasting value." /></h2>
          </div>
          <div className="metrics-grid">
            <div data-reveal><strong>+45%</strong><span>Higher conversion</span><p>Targeted in-app offers meet patients around the treatments they are already exploring.</p></div>
            <div data-reveal data-reveal-delay="140"><strong>24/7</strong><span>Mobile storefront</span><p>Keep treatments, packages, and memberships available long after your front desk closes.</p></div>
            <div data-reveal data-reveal-delay="280"><strong>2.5×</strong><span>Patient lifetime value</span><p>Build a visible loyalty journey with points, rewards, referrals, reviews, visits, and purchases.</p></div>
          </div>
        </div>
      </section>

      <section className="platform-section section-light" id="solutions">
        <div className="section-container wide">
          <div className="center-heading" data-reveal>
            <span className="eyebrow eyebrow-pink"><Sparkles size={14} /> One connected experience</span>
            <h2><AnimatedWords as="span" text="Sell more treatments and packages." /></h2>
            <p>Give every part of your patient growth experience a clear home.</p>
          </div>
          <ProductShowcase />
        </div>
      </section>

      <section className="three-steps section-light" id="how-it-works">
        <div className="section-container">
          <div className="split-heading">
            <div><span className="eyebrow eyebrow-pink" data-reveal>A faster path to launch</span><h2 data-reveal data-reveal-delay="80">Your app, shaped around your practice.</h2></div>
            <p data-reveal data-reveal-delay="160">Nexcore brings your brand, treatment catalog, member experience, and growth tools together in a patient-ready mobile destination.</p>
          </div>
          <div className="step-cards">
            <article data-reveal data-reveal-delay="60">
              <span className="step-number">01</span>
              <div className="step-visual brand-builder"><div className="builder-toolbar"><i /><i /><i /></div><div className="builder-logo"><span className="brand-mark"><span /></span>Your Clinic&apos;s Name</div><div className="color-row"><i /><i /><i /><i /></div></div>
              <h3>Bring in your brand</h3><p>Add your logo, colors, treatment information, prices, memberships, locations, and clinic details.</p>
            </article>
            <article data-reveal data-reveal-delay="140">
              <span className="step-number">02</span>
              <div className="step-visual app-ready"><div className="mini-phone"><span className="brand-mark"><span /></span><i /><i /><i /></div><div className="ready-badge"><Check size={15} /> Ready to preview</div></div>
              <h3>Preview the experience</h3><p>Review how patients will browse, shop, earn points, see rewards, and understand member benefits.</p>
            </article>
            <article data-reveal data-reveal-delay="220">
              <span className="step-number">03</span>
              <div className="step-visual sales-grow"><div className="growth-number">$28,640<small>App sales</small></div><svg viewBox="0 0 240 80" aria-hidden="true"><path d="M0 68 C35 65 40 48 72 52 C100 56 112 34 142 40 C172 46 184 10 240 14" fill="none" stroke="#e12c6a" strokeWidth="3" /></svg></div>
              <h3>Put Nexcore to work</h3><p>Introduce the app to patients and follow sales, rewards, memberships, referrals, reviews, and visits.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="dashboard-section section-dark">
        <div className="section-container wide">
          <div className="dashboard-section-head">
            <div><span className="eyebrow eyebrow-light" data-reveal><BarChart3 size={14} /> Owner dashboard</span><h2><AnimatedWords as="span" text="See the full story behind your app." /></h2></div>
            <div><p data-reveal data-reveal-delay="140">Follow the numbers that matter—from clients and sales to referrals, reviews, visits, and offer performance.</p><Link href="/solutions/business-intelligence" className="text-link text-link-light" data-reveal data-reveal-delay="200">Explore business intelligence <span>↗</span></Link></div>
          </div>
          <DashboardPreview />
          <div className="dashboard-feature-row">
            <div data-reveal data-reveal-delay="0"><Clock3 size={20} /><span><b>Recent activity</b><small>A live pulse of patient actions</small></span></div>
            <div data-reveal data-reveal-delay="120"><Gift size={20} /><span><b>Offer performance</b><small>From notification to purchase</small></span></div>
            <div data-reveal data-reveal-delay="240"><RefreshCcw size={20} /><span><b>Membership visibility</b><small>Recurring value in context</small></span></div>
            <div data-reveal data-reveal-delay="360"><BarChart3 size={20} /><span><b>Sales reporting</b><small>Mobile revenue in one view</small></span></div>
          </div>
        </div>
      </section>

      <section className="journey-section section-light">
        <div className="section-container">
          <div className="center-heading narrow" data-reveal>
            <span className="eyebrow eyebrow-pink"><HeartHandshake size={14} /> The patient journey</span>
            <h2>From &ldquo;I&apos;m considering it&rdquo; to &ldquo;I&apos;ll be back.&rdquo;</h2>
            <p>Every touchpoint is designed to make your practice easier to discover, choose, and return to.</p>
          </div>
          <div className="journey-grid">
            <article data-reveal><span><Smartphone size={21} /></span><small>Discover</small><h3>A branded app patients recognize</h3><p>Your identity, services, team content, locations, and opening hours in one polished experience.</p></article>
            <article data-reveal data-reveal-delay="160"><span><ShoppingBag size={21} /></span><small>Purchase</small><h3>Browse and shop with confidence</h3><p>Search by concern, explore treatment details, build a basket, and complete mobile checkout.</p></article>
            <article data-reveal data-reveal-delay="320"><span><Gift size={21} /></span><small>Return</small><h3>Progress worth coming back for</h3><p>Points, unlocked rewards, membership value, and relevant follow-up stay visible between visits.</p></article>
          </div>
        </div>
      </section>

      <section className="audiences-section">
        <div className="audience-image-wrap"><Image src="https://images.pexels.com/photos/6899543/pexels-photo-6899543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1500" alt="Premium clinic reception with modern neutral interior" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="audience-content" data-reveal>
          <span className="eyebrow eyebrow-pink">Made for your kind of practice</span>
          <h2>One platform. Built around considered care.</h2>
          <p>Nexcore supports practices where education, trust, repeat care, and a premium patient experience matter.</p>
          <div className="audience-links">
            {industryNav.map((item, index) => <Link href={item.href} key={item.href} data-reveal data-reveal-delay={index * 90}><span>0{index + 1}</span><strong>{item.title}</strong><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="insights-preview section-light">
        <div className="section-container">
          <div className="split-heading align-end">
            <div data-reveal><span className="eyebrow eyebrow-pink">Nexcore insights</span><h2>Practical ideas for patient growth.</h2></div>
            <Link className="button button-outline-dark" href="/resources/blog" data-reveal data-reveal-delay="120">View all insights <ArrowRight size={16} /></Link>
          </div>
          <div className="article-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article className={`article-card ${index === 0 ? "featured" : ""}`} key={post.slug} data-reveal data-reveal-delay={index * 120}>
                <Link className="article-image" href={`/resources/blog/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 100vw, 25vw"} /></Link>
                <div className="article-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
                <h3><Link href={`/resources/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link className="text-link" href={`/resources/blog/${post.slug}`}>Read insight <span>↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-light" id="faq">
        <div className="section-container faq-grid">
          <div data-reveal>
            <span className="eyebrow eyebrow-pink">Frequently asked questions</span>
            <h2>Everything clinic owners ask before choosing Nexcore.</h2>
            <p>Get answers to common questions about med spa apps, membership software, and loyalty programs for aesthetic practices.</p>
            <Link className="button button-dark" href="/book-demo">Book a demo <ArrowRight size={16} /></Link>
          </div>
          <div className="faq-list" data-reveal data-reveal-delay="140">
            <details><summary>What is a med spa membership app?<span>+</span></summary><p>A med spa membership app is a branded mobile application that lets aesthetic practices sell recurring memberships, manage loyalty rewards, process treatment purchases, and engage patients — all from their own white-label app. Nexcore provides this as a complete platform with both a patient-facing app and an owner dashboard.</p></details>
            <details><summary>How does Nexcore differ from generic booking software?<span>+</span></summary><p>Unlike scheduling tools, Nexcore is a branded mobile experience your patients download and use daily. It includes treatment ecommerce, points and rewards, membership management, scratch-card offers with voice messages, abandoned cart recovery, buy-now-pay-later, and a full analytics dashboard. It is a growth engine, not just a calendar.</p></details>
            <details><summary>Does Nexcore work for laser clinics and skin rejuvenation centers?<span>+</span></summary><p>Yes. Nexcore supports laser clinics, aesthetic skin clinics, skin rejuvenation centers, med spas, cosmetic dermatology practices, plastic surgery practices, and wellness clinics. The platform adapts to any practice that offers treatment packages, memberships, or loyalty programs.</p></details>
            <details><summary>How much revenue can a med spa app generate?<span>+</span></summary><p>Nexcore data shows that 70% of in-app purchases happen outside clinic hours, members spend 44% more annually than non-members, and a single automated scratch-card campaign generated $5,000+ in 24 hours from 340 notifications. Results vary, but the after-hours revenue alone typically covers the platform cost.</p></details>
            <details><summary>Is the app branded to my practice?<span>+</span></summary><p>Completely. Nexcore is a white-label platform — your logo, your colors, your treatments, your brand. Patients see your practice name, not Nexcore. It appears in the app store under your identity.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <Image src="https://images.pexels.com/photos/7750104/pexels-photo-7750104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800" alt="Bright contemporary aesthetic practice interior" fill sizes="100vw" />
        <div className="final-cta-overlay" />
        <div className="final-cta-content" data-reveal><span className="eyebrow eyebrow-light">Your next growth channel</span><h2>Make your practice available every hour of the day.</h2><p>See how Nexcore can bring your mobile storefront, rewards, memberships, engagement, and app performance together.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What is a med spa membership app?", acceptedAnswer: { "@type": "Answer", text: "A med spa membership app is a branded mobile application that lets aesthetic practices sell recurring memberships, manage loyalty rewards, process treatment purchases, and engage patients from their own white-label app." } },
            { "@type": "Question", name: "Does Nexcore work for laser clinics?", acceptedAnswer: { "@type": "Answer", text: "Yes. Nexcore supports laser clinics, aesthetic skin clinics, skin rejuvenation centers, med spas, cosmetic dermatology, plastic surgery, and wellness clinics." } },
            { "@type": "Question", name: "How much revenue can a med spa app generate?", acceptedAnswer: { "@type": "Answer", text: "Nexcore data shows 70% of in-app purchases happen outside clinic hours, members spend 44% more annually, and automated campaigns can generate $5,000+ in 24 hours." } },
            { "@type": "Question", name: "Is the app branded to my practice?", acceptedAnswer: { "@type": "Answer", text: "Completely. Nexcore is a white-label platform — your logo, colors, treatments, and brand. Patients see your practice name, not Nexcore." } },
          ]
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "SoftwareApplication",
          name: "Nexcore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web",
          description: "A branded patient mobile app and owner dashboard for med spas, laser clinics, aesthetic skin clinics, and wellness practices. Features include treatment ecommerce, loyalty rewards, membership management, automated offers, and business intelligence.",
          offers: { "@type": "Offer", availability: "https://schema.org/OnlineOnly" },
        })
      }} />
    </main>
  );
}
