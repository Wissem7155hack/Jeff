import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  Clock3,
  Gift,
  HeartHandshake,
  Layers3,
  RefreshCcw,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { DashboardPreview, ProductShowcase } from "@/components/product-visuals";
import { blogPosts, industryNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "The Branded App for Aesthetic Practices",
  description: "Nexcore helps aesthetic and wellness practices sell treatments, grow memberships, reward loyalty, and understand app performance from one branded mobile platform.",
  alternates: { canonical: "/" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nexcore",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android, Web",
  description: "A branded patient mobile app and owner dashboard for aesthetic and wellness practices.",
  offers: { "@type": "Offer", availability: "https://schema.org/OnlineOnly" },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <Image className="home-hero-image" src="imgs/bg.png" alt="A clinician caring for a patient in a modern treatment room" fill priority sizes="100vw" />
        <div className="home-hero-overlay" />
        <div className="hero-noise" />
        <div className="home-hero-inner">
          <div className="home-hero-copy reveal">
            <span className="eyebrow eyebrow-light"><i /> Your practice, on every patient’s phone</span>
            <h1>What if your practice could grow <em>while you sleep?</em></h1>
            <p>Nexcore combines rewards, treatment shopping, memberships, patient engagement, and business insights inside your own branded mobile app.</p>
            <div className="hero-actions">
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
            <div className="floating-proof proof-one"><span><ShoppingBag size={16} /></span><div><b>Treatment purchased</b><small>Order complete · just now</small></div><strong>+$280</strong></div>
            <div className="floating-proof proof-two"><span><Gift size={16} /></span><div><b>Reward unlocked</b><small>Next visit benefit</small></div></div>
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
            <span className="eyebrow eyebrow-light">Engineered for modern practices</span>
            <h2>More ways to turn patient interest into lasting value.</h2>
          </div>
          <div className="metrics-grid">
            <div><strong>+45%</strong><span>Higher conversion</span><p>Targeted in-app offers meet patients around the treatments they are already exploring.</p></div>
            <div><strong>24/7</strong><span>Mobile storefront</span><p>Keep treatments, packages, and memberships available long after your front desk closes.</p></div>
            <div><strong>2.5×</strong><span>Patient lifetime value</span><p>Build a visible loyalty journey with points, rewards, referrals, reviews, visits, and purchases.</p></div>
          </div>
        </div>
      </section>

      <section className="platform-section section-light" id="solutions">
        <div className="section-container wide">
          <div className="center-heading">
            <span className="eyebrow eyebrow-pink"><Sparkles size={14} /> One connected experience</span>
            <h2>Sell more treatments and packages.</h2>
            <p>Give every part of your patient growth experience a clear home.</p>
          </div>
          <ProductShowcase />
        </div>
      </section>

      <section className="three-steps section-light" id="how-it-works">
        <div className="section-container">
          <div className="split-heading">
            <div><span className="eyebrow eyebrow-pink">A faster path to launch</span><h2>Your app, shaped around your practice.</h2></div>
            <p>Nexcore brings your brand, treatment catalog, member experience, and growth tools together in a patient-ready mobile destination.</p>
          </div>
          <div className="step-cards">
            <article>
              <span className="step-number">01</span>
              <div className="step-visual brand-builder"><div className="builder-toolbar"><i /><i /><i /></div><div className="builder-logo"><span className="brand-mark"><span /></span>Your Clinic&apos;s Name</div><div className="color-row"><i /><i /><i /><i /></div></div>
              <h3>Bring in your brand</h3><p>Add your logo, colors, treatment information, prices, memberships, locations, and clinic details.</p>
            </article>
            <article>
              <span className="step-number">02</span>
              <div className="step-visual app-ready"><div className="mini-phone"><span className="brand-mark"><span /></span><i /><i /><i /></div><div className="ready-badge"><Check size={15} /> Ready to preview</div></div>
              <h3>Preview the experience</h3><p>Review how patients will browse, shop, earn points, see rewards, and understand member benefits.</p>
            </article>
            <article>
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
            <div><span className="eyebrow eyebrow-light"><BarChart3 size={14} /> Owner dashboard</span><h2>See the full story behind your app.</h2></div>
            <div><p>Follow the numbers that matter—from clients and sales to referrals, reviews, visits, and offer performance.</p><Link href="/solutions/business-intelligence" className="text-link text-link-light">Explore business intelligence <span>↗</span></Link></div>
          </div>
          <DashboardPreview />
          <div className="dashboard-feature-row">
            <div><Clock3 size={20} /><span><b>Recent activity</b><small>A live pulse of patient actions</small></span></div>
            <div><Gift size={20} /><span><b>Offer performance</b><small>From notification to purchase</small></span></div>
            <div><RefreshCcw size={20} /><span><b>Membership visibility</b><small>Recurring value in context</small></span></div>
            <div><BarChart3 size={20} /><span><b>Sales reporting</b><small>Mobile revenue in one view</small></span></div>
          </div>
        </div>
      </section>

      <section className="journey-section section-light">
        <div className="section-container">
          <div className="center-heading narrow">
            <span className="eyebrow eyebrow-pink"><HeartHandshake size={14} /> The patient journey</span>
            <h2>From “I’m considering it” to “I’ll be back.”</h2>
            <p>Every touchpoint is designed to make your practice easier to discover, choose, and return to.</p>
          </div>
          <div className="journey-grid">
            <article><span><Smartphone size={21} /></span><small>Discover</small><h3>A branded app patients recognize</h3><p>Your identity, services, team content, locations, and opening hours in one polished experience.</p></article>
            <article><span><ShoppingBag size={21} /></span><small>Purchase</small><h3>Browse and shop with confidence</h3><p>Search by concern, explore treatment details, build a basket, and complete mobile checkout.</p></article>
            <article><span><Gift size={21} /></span><small>Return</small><h3>Progress worth coming back for</h3><p>Points, unlocked rewards, membership value, and relevant follow-up stay visible between visits.</p></article>
          </div>
        </div>
      </section>

      <section className="audiences-section">
        <div className="audience-image-wrap"><Image src="https://images.pexels.com/photos/6899543/pexels-photo-6899543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1500" alt="Premium clinic reception with modern neutral interior" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="audience-content">
          <span className="eyebrow eyebrow-pink">Made for your kind of practice</span>
          <h2>One platform. Built around considered care.</h2>
          <p>Nexcore supports practices where education, trust, repeat care, and a premium patient experience matter.</p>
          <div className="audience-links">
            {industryNav.map((item, index) => <Link href={item.href} key={item.href}><span>0{index + 1}</span><strong>{item.title}</strong><ArrowRight size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="insights-preview section-light">
        <div className="section-container">
          <div className="split-heading align-end">
            <div><span className="eyebrow eyebrow-pink">Nexcore insights</span><h2>Practical ideas for patient growth.</h2></div>
            <Link className="button button-outline-dark" href="/resources/blog">View all insights <ArrowRight size={16} /></Link>
          </div>
          <div className="article-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article className={`article-card ${index === 0 ? "featured" : ""}`} key={post.slug}>
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

      <section className="final-cta">
        <Image src="https://images.pexels.com/photos/7750104/pexels-photo-7750104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800" alt="Bright contemporary aesthetic practice interior" fill sizes="100vw" />
        <div className="final-cta-overlay" />
        <div className="final-cta-content"><span className="eyebrow eyebrow-light">Your next growth channel</span><h2>Make your practice available every hour of the day.</h2><p>See how Nexcore can bring your mobile storefront, rewards, memberships, engagement, and app performance together.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
    </main>
  );
}
