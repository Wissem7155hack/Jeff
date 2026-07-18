"use client";

import {
  ArrowDownRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Gift,
  Heart,
  Home,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { solutions } from "@/lib/site-data";

type Visual = "rewards" | "shop" | "membership" | "engagement" | "financing" | "analytics";

export function PhoneFrame({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="phone-device compact">
      <div className="phone-side left-one" /><div className="phone-side left-two" /><div className="phone-side right-one" />
      <div className="phone-screen" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
        <div className="phone-notch" />
        {children}
      </div>
    </div>
  );
}

export function ProtopiePhone({ src, title }: { src: string; title: string }) {
  return (
    <PhoneFrame title={title}>
      <iframe src={src} style={{ width: "100%", height: "100%", border: "none", borderRadius: "38px", display: "block" }} title={title} allow="accelerometer; camera; clipboard-write; encrypted-media; geolocation; gyroscope; microphone; payment; usb" loading="lazy" />
    </PhoneFrame>
  );
}

export function ImagePhone({ src, alt }: { src: string; alt: string }) {
  return (
    <PhoneFrame title={alt}>
      <Image src={src} alt={alt} width={280} height={586} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </PhoneFrame>
  );
}

function MiniTreatment({ tone, title, price }: { tone: string; title: string; price: string }) {
  return (
    <div className="mini-treatment">
      <div className={`mini-treatment-art ${tone}`}><Sparkles size={17} /></div>
      <div><strong>{title}</strong><span>{price}</span></div>
    </div>
  );
}

function RewardsScreen() {
  return (
    <>
      <div className="app-balance-card">
        <div><span>Your points</span><strong>1,280</strong></div>
        <div className="balance-orbit"><Gift size={22} /></div>
        <div className="progress-track"><span style={{ width: "72%" }} /></div>
        <small>220 points to your next reward</small>
      </div>
      <div className="app-section-title"><strong>Your rewards</strong><span>View all</span></div>
      <div className="reward-ticket">
        <div className="ticket-icon"><Sparkles size={19} /></div>
        <div><strong>Hydrafacial reward</strong><span>Unlocked · 3 days left</span></div>
        <ChevronRight size={16} />
      </div>
      <div className="earn-grid">
        <div><Star size={17} /><span>Leave a review</span><b>+20</b></div>
        <div><Users size={17} /><span>Refer a friend</span><b>+50</b></div>
      </div>
    </>
  );
}

function ShopScreen() {
  return (
    <>
      <div className="phone-search"><Search size={15} /><span>Search treatments</span></div>
      <div className="concern-pills"><span className="active">All</span><span>Skin</span><span>Face</span><span>Body</span></div>
      <div className="app-section-title"><strong>Recommended for you</strong><span>See all</span></div>
      <div className="treatment-stack">
        <MiniTreatment tone="blush" title="Hydrafacial" price="From $180" />
        <MiniTreatment tone="violet" title="Skin rejuvenation" price="From $240" />
        <MiniTreatment tone="gold" title="Wellness package" price="From $320" />
      </div>
      <div className="app-cart-bar"><div><ShoppingBag size={17} /><span>2 items</span></div><strong>View basket · $420</strong></div>
    </>
  );
}

function MembershipScreen() {
  return (
    <>
      <div className="membership-card">
        <div className="membership-top"><span>Signature</span><Sparkles size={18} /></div>
        <strong>$290<small>/ month</small></strong>
        <p>Your complete treatment membership</p>
        <div className="member-badge">Most popular</div>
      </div>
      <div className="app-section-title"><strong>Included benefits</strong><span>19 treatments</span></div>
      <ul className="benefit-list">
        <li><Check size={14} /><span>Choose one treatment every 60 days</span></li>
        <li><Check size={14} /><span>Preferred skincare pricing</span></li>
        <li><Check size={14} /><span>Digital skin scan every 3 months</span></li>
        <li><Check size={14} /><span>Member-only treatment pricing</span></li>
      </ul>
      <button className="phone-primary">Explore membership</button>
    </>
  );
}

function EngagementScreen() {
  return (
    <>
      <div className="story-card">
        <div><span>Just for you</span><strong>A thoughtful birthday surprise</strong><p>Reveal your clinic offer before it expires.</p></div>
        <Gift size={36} />
      </div>
      <div className="voice-card">
        <div className="voice-avatar">JD</div>
        <div className="voice-content"><strong>A message from Jade</strong><div className="voice-wave"><i /><i /><i /><i /><i /><i /><i /><i /></div><small>0:18</small></div>
        <button aria-label="Play message">▶</button>
      </div>
      <div className="app-section-title"><strong>From your clinic</strong><span>Latest</span></div>
      <div className="article-row"><div className="article-art" /><div><strong>Your guide to skin preparation</strong><span>4 min read</span></div></div>
      <div className="location-row"><MapPin size={18} /><div><strong>Nexcore Clinic</strong><span>Open today until 7:00 PM</span></div><ChevronRight size={16} /></div>
    </>
  );
}

function FinancingScreen() {
  return (
    <>
      <div className="checkout-product"><div className="checkout-art"><Sparkles size={25} /></div><div><span>Treatment package</span><strong>Complete skin plan</strong><p>3 treatment package</p></div><b>$840</b></div>
      <div className="payment-box">
        <strong>Choose how to pay</strong>
        <label className="payment-choice selected"><span><i><Check size={11} /></i>Pay in full</span><b>$840</b></label>
        <label className="payment-choice"><span><i />Flexible payment option</span><b>View</b></label>
      </div>
      <div className="order-summary"><span>Subtotal</span><b>$840</b><span>Points earned</span><b>+840</b><strong>Total</strong><strong>$840</strong></div>
      <button className="phone-primary">Complete purchase</button>
      <small className="secure-note">Secure mobile checkout</small>
    </>
  );
}

function AnalyticsScreen() {
  return (
    <>
      <div className="mobile-metric"><span>App revenue</span><strong>$28,640</strong><small><ArrowDownRight size={12} /> This month</small></div>
      <div className="mini-chart"><i style={{ height: "28%" }} /><i style={{ height: "45%" }} /><i style={{ height: "38%" }} /><i style={{ height: "63%" }} /><i style={{ height: "54%" }} /><i style={{ height: "78%" }} /><i style={{ height: "92%" }} /></div>
      <div className="phone-stats-grid"><div><Users size={16} /><span>Clients</span><strong>1,842</strong></div><div><Star size={16} /><span>Reviews</span><strong>164</strong></div><div><Gift size={16} /><span>Rewards</span><strong>326</strong></div><div><BarChart3 size={16} /><span>Orders</span><strong>218</strong></div></div>
      <div className="app-section-title"><strong>Recent activity</strong><span>Live</span></div>
      <div className="activity-mini"><i className="pink" /><div><strong>New treatment purchase</strong><span>Just now</span></div><b>+$280</b></div>
      <div className="activity-mini"><i className="green" /><div><strong>Reward redeemed</strong><span>3 min ago</span></div><b>Done</b></div>
    </>
  );
}

export function PhoneMockup({ visual = "rewards", compact = false }: { visual?: Visual; compact?: boolean }) {
  return (
    <div className={`phone-device ${compact ? "compact" : ""}`}>
      <div className="phone-side left-one" /><div className="phone-side left-two" /><div className="phone-side right-one" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><div className="dynamic-island" /><span>● ◒</span></div>
        <div className="app-header"><div><small>Welcome back</small><strong>Nexcore Clinic</strong></div><div className="header-icon"><Bell size={16} /><i /></div></div>
        <div className="app-content">
          {visual === "rewards" && <RewardsScreen />}
          {visual === "shop" && <ShopScreen />}
          {visual === "membership" && <MembershipScreen />}
          {visual === "engagement" && <EngagementScreen />}
          {visual === "financing" && <FinancingScreen />}
          {visual === "analytics" && <AnalyticsScreen />}
        </div>
        <div className="app-bottom-nav"><span className="active"><Home size={16} /><small>Home</small></span><span><Search size={16} /><small>Explore</small></span><span><ShoppingBag size={16} /><small>Shop</small></span><span><Heart size={16} /><small>Rewards</small></span></div>
      </div>
    </div>
  );
}

const tabKeys = ["ecommerce", "mobile-rewards", "memberships", "patient-engagement", "patient-financing", "business-intelligence"] as const;

export function ProductShowcase() {
  const [selected, setSelected] = useState<(typeof tabKeys)[number]>("ecommerce");
  const feature = solutions[selected];
  const Icon = feature.icon;

  return (
    <div className="product-showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Nexcore capabilities">
        {tabKeys.map((key) => {
          const item = solutions[key];
          const TabIcon = item.icon;
          return <button type="button" role="tab" aria-selected={selected === key} className={selected === key ? "active" : ""} onClick={() => setSelected(key)} key={key}><TabIcon size={17} /><span>{item.eyebrow}</span></button>;
        })}
      </div>
      <div className="showcase-stage">
        <div className="showcase-copy" key={`${selected}-copy`}>
          <span className="eyebrow eyebrow-dark"><Icon size={14} /> {feature.eyebrow}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <Link href={`/solutions/${feature.slug}`} className="text-link">Explore {feature.eyebrow.toLowerCase()} <span>↗</span></Link>
        </div>
        <div className="showcase-phone" key={selected}>
          {selected === "ecommerce" && (
            <ImagePhone src="/imgs/ECOM.jfif" alt="Ecommerce preview" />
          )}
          {selected === "mobile-rewards" && (
            <ProtopiePhone src="https://cloud.protopie.io/p/bbc5dfec037a92153d1995ce?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Mobile Rewards Prototype" />
          )}
          {selected === "memberships" && (
            <ProtopiePhone src="https://cloud.protopie.io/p/c130351e2ef62af898588c52?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Memberships Prototype" />
          )}
          {selected === "patient-engagement" && (
            <ProtopiePhone src="https://cloud.protopie.io/p/c03b4bd475e6e3ad648e0040?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Patient Engagement Prototype" />
          )}
          {selected === "patient-financing" && (
            <ProtopiePhone src="https://cloud.protopie.io/p/0c14d0a046e20ee0e79234fb?ui=false&mockup=false&scaleToFit=true&cursorType=touch" title="Patient Financing Prototype" />
          )}
          {selected === "business-intelligence" && (
            <PhoneMockup visual={feature.visual} compact />
          )}
        </div>
        <div className="showcase-stat" key={`${selected}-stat`}>
          <strong>{feature.stat}</strong>
          <p>{feature.statLabel}</p>
          <div className="stat-rule"><span /></div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="dashboard-window">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo"><span className="brand-mark"><span /></span><b>Nexcore</b></div>
        <div className="dashboard-menu">
          <span className="selected"><Home size={16} /> Overview</span><span><ShoppingBag size={16} /> Sales</span><span><Gift size={16} /> Rewards</span><span><Bell size={16} /> Offers</span><span><Users size={16} /> Clients</span><span><BarChart3 size={16} /> Analytics</span>
        </div>
        <div className="dashboard-user"><i>NC</i><div><b>Nexcore Clinic</b><small>Owner account</small></div></div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-head"><div><small>Monday, June 8</small><h3>Good morning, Jade</h3></div><button><Bell size={16} /></button></div>
        <div className="dashboard-metrics">
          <div><span>App sales</span><strong>$28,640</strong><small className="positive">↑ 18.2% this month</small></div>
          <div><span>Clients</span><strong>1,842</strong><small>38 new this month</small></div>
          <div><span>Referrals</span><strong>94</strong><small className="positive">↑ 12 this month</small></div>
          <div><span>Reviews</span><strong>164</strong><small>4.9 average rating</small></div>
        </div>
        <div className="dashboard-lower">
          <div className="dashboard-chart-card"><div className="card-heading"><div><b>Sales overview</b><small>App revenue over time</small></div><span>Last 30 days⌄</span></div><div className="large-chart"><div className="chart-labels"><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div><div className="chart-area"><i className="grid g1" /><i className="grid g2" /><i className="grid g3" /><svg viewBox="0 0 500 180" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="pinkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e12c6a" stopOpacity=".28" /><stop offset="100%" stopColor="#e12c6a" stopOpacity="0" /></linearGradient></defs><path d="M0,150 C40,145 58,118 95,125 C130,132 145,88 185,98 C225,108 238,72 275,78 C318,85 330,43 375,54 C422,65 446,20 500,28 L500,180 L0,180 Z" fill="url(#pinkFill)" /><path d="M0,150 C40,145 58,118 95,125 C130,132 145,88 185,98 C225,108 238,72 275,78 C318,85 330,43 375,54 C422,65 446,20 500,28" fill="none" stroke="#e12c6a" strokeWidth="3" /></svg></div></div></div>
          <div className="dashboard-activity"><div className="card-heading"><div><b>Recent activity</b><small>Live from your app</small></div><span>View all</span></div><div className="activity-list"><div><i className="sale"><ShoppingBag size={14} /></i><p><b>Package purchased</b><small>Amelia R. · just now</small></p><strong>+$280</strong></div><div><i className="review"><Star size={14} /></i><p><b>New clinic review</b><small>Sophie M. · 4 min ago</small></p><strong>5.0</strong></div><div><i className="reward"><Gift size={14} /></i><p><b>Reward redeemed</b><small>Ella T. · 11 min ago</small></p><strong>Done</strong></div><div><i className="member"><WalletCards size={14} /></i><p><b>New membership</b><small>Olivia K. · 18 min ago</small></p><strong>+$290</strong></div></div></div>
        </div>
      </div>
    </div>
  );
}
