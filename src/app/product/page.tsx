import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, BellRing, Check, Gift, MapPin, RefreshCcw, Search, ShoppingBag, Smartphone, Star, Store, UsersRound } from "lucide-react";
import { DashboardPreview, ImagePhone, ProtopiePhone } from "@/components/product-visuals";
import { solutionNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Product Overview",
  description: "Explore the Nexcore branded patient app and owner dashboard for treatment ecommerce, rewards, memberships, engagement, financing, and practice insights.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <main id="main-content">
      <section className="product-hero section-light">
        <div className="product-hero-grid section-container">
          <div className="product-hero-copy"><span className="eyebrow eyebrow-pink"><Smartphone size={14} /> The Nexcore platform</span><h1>One branded app for patients. One clear dashboard for your practice.</h1><p>Bring treatment discovery, mobile shopping, memberships, rewards, clinic content, and growth reporting into a connected experience built around your brand.</p><div className="hero-actions"><Link href="/book-demo" className="button button-pink">Book a demo <ArrowRight size={17} /></Link><Link href="#patient-app" className="button button-outline-dark">Explore the platform <span>↓</span></Link></div></div>
          <div className="product-hero-visual"><div className="product-visual-back" /><ImagePhone src="/imgs/ECOM.jfif" alt="Ecommerce preview" /><div className="product-float-card"><span><Gift size={18} /></span><div><small>Points earned</small><strong>+280</strong></div></div><div className="product-float-card second"><span><ShoppingBag size={18} /></span><div><small>Order complete</small><strong>$280</strong></div></div></div>
        </div>
      </section>

      <section className="two-sides section-dark">
        <div className="section-container"><div className="center-heading narrow"><span className="eyebrow eyebrow-light">Two sides. One experience.</span><h2>Nexcore connects what patients see with what your team needs to know.</h2></div><div className="two-side-grid"><article><span>01</span><Smartphone size={28} /><h3>The patient app</h3><p>A mobile destination branded to your colors, logo, treatments, memberships, locations, content, and rewards.</p><a href="#patient-app">Explore the patient app ↓</a></article><article><span>02</span><BarChart3 size={28} /><h3>The owner dashboard</h3><p>A focused workspace for app content, offers, clients, sales, referrals, reviews, visits, and recent activity.</p><a href="#owner-dashboard">Explore the dashboard ↓</a></article></div></div>
      </section>

      <section className="app-tour section-light" id="patient-app">
        <div className="section-container">
          <div className="split-heading"><div><span className="eyebrow eyebrow-pink">The patient app</span><h2>Your practice, in their pocket.</h2></div><p>Patients get a familiar place to learn, shop, manage value, and stay connected without searching across separate channels.</p></div>
          <div className="tour-layout">
            <div className="tour-column">
              <article><span><Search size={20} /></span><div><h3>Search and discovery</h3><p>Browse treatments by concern, search specific services, and return to recently viewed options.</p></div></article>
              <article><span><ShoppingBag size={20} /></span><div><h3>Mobile storefront</h3><p>Explore treatments, packages, images, testimonials, preparation guidance, aftercare, quantities, and pricing.</p></div></article>
              <article><span><RefreshCcw size={20} /></span><div><h3>Membership access</h3><p>See plan options, included benefits, member-only pricing, signup bonuses, and available treatment choices.</p></div></article>
            </div>
            <div className="tour-phone"><ProtopiePhone src="https://cloud.protopie.io/p/c03b4bd475e6e3ad648e0040?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Patient Engagement" /></div>
            <div className="tour-column">
              <article><span><Gift size={20} /></span><div><h3>Points and rewards</h3><p>Follow point balances, milestones, unlocked offers, expiration windows, and redemption status.</p></div></article>
              <article><span><BellRing size={20} /></span><div><h3>Useful engagement</h3><p>Receive relevant reminders, clinic content, voice messages, and interactive offers.</p></div></article>
              <article><span><MapPin size={20} /></span><div><h3>Practical clinic access</h3><p>Find locations, opening hours, direct calling, clinic articles, and important updates.</p></div></article>
            </div>
          </div>
        </div>
      </section>

      <section className="commerce-flow section-soft">
        <div className="section-container"><div className="center-heading narrow"><span className="eyebrow eyebrow-pink">The mobile buying journey</span><h2>From curiosity to checkout—without leaving the app.</h2></div><div className="flow-track"><article><span>01</span><Search size={22} /><h3>Browse</h3><p>Search by treatment or concern.</p></article><i /><article><span>02</span><Store size={22} /><h3>Understand</h3><p>Review details, images, guidance, and pricing.</p></article><i /><article><span>03</span><ShoppingBag size={22} /><h3>Choose</h3><p>Select a service, package, or membership.</p></article><i /><article><span>04</span><Check size={22} /><h3>Complete</h3><p>Pay, earn points, and see the order confirmation.</p></article></div></div>
      </section>

      <section className="owner-dashboard-section section-dark" id="owner-dashboard">
        <div className="section-container wide"><div className="dashboard-section-head"><div><span className="eyebrow eyebrow-light">The owner dashboard</span><h2>A live pulse on the app you put into the world.</h2></div><div><p>See how patients are engaging, where value is being created, and how individual offers progress from send to purchase.</p><Link className="text-link text-link-light" href="/solutions/business-intelligence">Explore reporting <span>↗</span></Link></div></div><DashboardPreview /></div>
      </section>

      <section className="dashboard-details section-light">
        <div className="section-container"><div className="split-heading"><div><span className="eyebrow eyebrow-pink">What you can follow</span><h2>The activity behind patient growth.</h2></div><p>Nexcore keeps high-level performance and recent individual events close together, making the dashboard easier to read day to day.</p></div><div className="detail-stat-grid"><article><UsersRound size={22} /><strong>Clients</strong><p>See how many patients are connected to the branded app.</p></article><article><ShoppingBag size={22} /><strong>Sales</strong><p>Follow purchases and revenue completed through the app.</p></article><article><Star size={22} /><strong>Reviews</strong><p>Monitor review actions generated through loyalty activity.</p></article><article><Gift size={22} /><strong>Referrals</strong><p>Track patient introductions encouraged through rewards.</p></article><article><MapPin size={22} /><strong>Visits</strong><p>View eligible in-person activity attached to the rewards experience.</p></article><article><BellRing size={22} /><strong>Offers</strong><p>Review sends, reveals, basket additions, purchases, and revenue.</p></article></div></div>
      </section>

      <section className="solution-directory section-soft" id="how-it-works">
        <div className="section-container"><div className="center-heading narrow"><span className="eyebrow eyebrow-pink">Explore every capability</span><h2>Build the Nexcore experience around your growth priorities.</h2></div><div className="solution-directory-grid">{solutionNav.map((item, index) => { const Icon = item.icon; return <Link href={item.href} key={item.href}><span className="feature-index">0{index + 1}</span><Icon size={23} /><h3>{item.title}</h3><p>{item.blurb}</p><b>Explore <i>↗</i></b></Link>; })}</div></div>
      </section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">A closer look</span><h2>See the patient app and dashboard working together.</h2><p>We’ll walk through the full Nexcore journey and focus the demo on the priorities of your practice.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
