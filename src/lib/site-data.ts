import {
  Gift, ShoppingBag, RefreshCcw, BellRing, WalletCards, BarChart3,
  Star, Users, Sparkles, Search, Bell, Heart, Smartphone,
  type LucideIcon,
  MapPin, Check, Store, Layers3, Clock3, ShieldCheck, Target, Zap, Eye, MessageSquare,
  CreditCard, TrendingUp, Percent, Receipt, ArrowDownRight, ArrowUpRight,
  Repeat, CalendarCheck, BadgeCheck, HandCoins, UsersRound
} from "lucide-react";

export type Visual = "rewards" | "shop" | "membership" | "engagement" | "financing" | "analytics";

interface SolutionFeature { title: string; description: string; icon: LucideIcon }
interface SolutionStep { title: string; description: string }
interface SolutionData {
  eyebrow: string; slug: string; title: string; description: string;
  icon: LucideIcon; visual: Visual; stat: string; statLabel: string;
  outcomeTitle: string; outcomeBody: string;
  features: SolutionFeature[]; steps: SolutionStep[];
}

export const solutions: Record<string, SolutionData> = {
  ecommerce: {
    eyebrow: "Ecommerce", slug: "ecommerce",
    title: "A storefront that never closes.",
    description: "Let patients browse treatments by concern, understand every option, and complete a purchase from your branded app whenever they are ready.",
    icon: ShoppingBag, visual: "shop", stat: "24/7", statLabel: "shopping across treatments, packages, and memberships",
    outcomeTitle: "Turn interest into purchases, on their schedule.",
    outcomeBody: "Up to 70% of buying decisions happen after hours. With an always-available treatment storefront inside your app, patients can explore, compare, and buy on their own time — without calling your clinic or waiting for opening hours.",
    features: [
      { title: "Browse by concern", description: "Let patients filter treatments by skin, face, body, or wellness goals to find the right fit.", icon: Search },
      { title: "Treatment detail pages", description: "Include images, testimonials, before/after guidance, preparation steps, and pricing.", icon: Eye },
      { title: "Basket and checkout", description: "Patients add treatments, review a basket, and complete mobile checkout in seconds.", icon: ShoppingBag },
      { title: "Recommendation engine", description: "Show recently viewed and suggested treatments based on browsing patterns.", icon: Sparkles },
      { title: "Buy now, pay later", description: "Flexible payment options help patients commit to higher-value treatments.", icon: CreditCard },
      { title: "Abandoned cart recovery", description: "Push notifications remind patients about items left in their basket.", icon: Bell },
    ],
    steps: [
      { title: "Add your treatment catalog", description: "Upload treatments, packages, pricing, images, and descriptions to the app builder." },
      { title: "Organize by concern", description: "Group treatments into categories patients can browse and filter." },
      { title: "Enable mobile checkout", description: "Patients explore and purchase directly from their phone at any time." },
      { title: "Follow sales in the dashboard", description: "Track purchases, revenue, and basket activity in real time." },
    ],
  },
  "mobile-rewards": {
    eyebrow: "Mobile rewards", slug: "mobile-rewards",
    title: "Loyalty that drives real behavior.",
    description: "Build a visible points and rewards journey that keeps patients earning, progressing, and returning to your practice.",
    icon: Gift, visual: "rewards", stat: "2.5×", statLabel: "higher patient lifetime value with an active rewards journey",
    outcomeTitle: "Create a reason to come back every time.",
    outcomeBody: "When patients can see their points balance, track progress toward unlocking a reward, and earn through reviews, referrals, and purchases, they stay connected to your practice between appointments.",
    features: [
      { title: "Points balance", description: "A visible, always-updated point total patients can check any time from the app.", icon: Star },
      { title: "Reward milestones", description: "Set point thresholds that unlock meaningful treatment rewards and discounts.", icon: Gift },
      { title: "Earn through actions", description: "Award points for purchases, reviews, referrals, and in-person visits.", icon: Target },
      { title: "Expiring rewards", description: "Time-limited redemption windows create urgency and drive timely returns.", icon: Clock3 },
      { title: "Reward redemption", description: "Patients redeem directly in-app and see their updated status instantly.", icon: Check },
      { title: "Google review integration", description: "Encourage reviews as a points-earning activity within the rewards loop.", icon: Star },
    ],
    steps: [
      { title: "Define your rewards", description: "Choose point values, earning actions, and reward milestones in the dashboard." },
      { title: "Set up earning actions", description: "Configure how patients earn through purchases, reviews, referrals, and visits." },
      { title: "Launch to patients", description: "Rewards appear in the app alongside the point balance and progress indicators." },
      { title: "Monitor reward activity", description: "Track redemptions, earning patterns, and engagement in the dashboard." },
    ],
  },
  memberships: {
    eyebrow: "Memberships", slug: "memberships",
    title: "Predictable revenue, lasting relationships.",
    description: "Create membership plans that bundle recurring value, member-only pricing, and treatment flexibility into a subscription patients manage from the app.",
    icon: RefreshCcw, visual: "membership", stat: "+44%", statLabel: "more annual spend from members compared to non-members",
    outcomeTitle: "Make recurring value impossible to ignore.",
    outcomeBody: "Members spend 44% more annually than non-members. With clear plan options, included benefits, member-only pricing, and signup bonuses inside the app, patients understand exactly what they gain and rarely cancel.",
    features: [
      { title: "Membership plans", description: "Create multiple tiers with different pricing, benefits, and treatment choices.", icon: Layers3 },
      { title: "Member-only pricing", description: "Show exclusive treatment prices that nudge patients toward subscription.", icon: Percent },
      { title: "Signup bonuses", description: "Welcome new members with immediate treatment credits or free services.", icon: Gift },
      { title: "Treatment choice", description: "Let members select from available treatments on their own schedule.", icon: CalendarCheck },
      { title: "Subscription management", description: "Patients view and manage their membership status directly in-app.", icon: Receipt },
      { title: "Cross-sell visibility", description: "Highlight additional member discounts on skincare, injectables, and more.", icon: TrendingUp },
    ],
    steps: [
      { title: "Design your membership tiers", description: "Set pricing, benefits, included treatments, and member-only pricing." },
      { title: "Add signup bonuses", description: "Create welcome treatment packages to increase initial conversions." },
      { title: "Publish to the app", description: "Patients see and subscribe to memberships directly from their phone." },
      { title: "Track membership growth", description: "Follow new signups, retention rates, and recurring revenue in the dashboard." },
    ],
  },
  "patient-engagement": {
    eyebrow: "Patient engagement", slug: "patient-engagement",
    title: "Stay present between appointments.",
    description: "Reach patients with scratch-card offers, voice messages, push notifications, clinic content, and personalized experiences that bring them back.",
    icon: BellRing, visual: "engagement", stat: "+45%", statLabel: "higher conversion from personalized in-app offer campaigns",
    outcomeTitle: "Turn quiet periods into active patient touchpoints.",
    outcomeBody: "When patients receive a personalized scratch-card offer with a voice message from their clinician, open rates and conversion rates far exceed generic marketing. Every interaction feels personal, timely, and relevant.",
    features: [
      { title: "Scratch-card offers", description: "Gamified reveal experiences with time-limited treatment deals patients love.", icon: Sparkles },
      { title: "Voice messages", description: "Clinicians record personal audio messages that play alongside offers.", icon: MessageSquare },
      { title: "Push notifications", description: "Timely reminders for abandoned carts, new offers, and reward milestones.", icon: Bell },
      { title: "Clinic content", description: "Blog articles, treatment guides, and team introductions inside the app.", icon: Eye },
      { title: "Personalized targeting", description: "Offers based on browsing history, treatment interests, and patient behavior.", icon: Target },
      { title: "Campaign performance", description: "Track sends, reveals, cart additions, and purchases for every offer.", icon: BarChart3 },
    ],
    steps: [
      { title: "Create an offer campaign", description: "Design a scratch-card offer with treatments, discounts, and voice messages." },
      { title: "Set targeting and timing", description: "Choose which patients receive the offer and when it appears." },
      { title: "Launch notifications", description: "Patients receive a push notification and reveal the offer in-app." },
      { title: "Measure the full funnel", description: "Track from notification send through scratch, cart, and purchase." },
    ],
  },
  "patient-financing": {
    eyebrow: "Patient financing", slug: "patient-financing",
    title: "Make care more accessible.",
    description: "Let patients split treatment costs with flexible payment options that reduce hesitation and increase average order value.",
    icon: WalletCards, visual: "financing", stat: "+32%", statLabel: "increase in average order value with flexible payment options",
    outcomeTitle: "Remove the biggest barrier to treatment decisions.",
    outcomeBody: "Price hesitation stops more treatments than anything else. When patients can pay in installments directly from your app, they move from considering to committing — especially for high-value packages and memberships.",
    features: [
      { title: "Flexible payment options", description: "Patients choose between full payment and installment plans at checkout.", icon: CreditCard },
      { title: "Transparent pricing", description: "Clear breakdowns of payment amounts, schedule, and total cost.", icon: Receipt },
      { title: "Higher conversion", description: "Reduce cart abandonment on premium treatments and packages.", icon: TrendingUp },
      { title: "Seamless checkout", description: "Payment options integrate directly into the mobile checkout flow.", icon: Smartphone },
      { title: "Points still earned", description: "Patients earn loyalty points on financed purchases just like full payments.", icon: Star },
      { title: "Order confirmation", description: "Immediate confirmation with payment schedule and treatment details.", icon: Check },
    ],
    steps: [
      { title: "Enable financing options", description: "Turn on flexible payment in your Nexcore dashboard settings." },
      { title: "Configure payment terms", description: "Set installment options and eligibility for treatment categories." },
      { title: "Patients choose at checkout", description: "The option appears alongside full payment during mobile checkout." },
      { title: "Track financed orders", description: "Monitor how financing impacts order value and conversion rates." },
    ],
  },
  "business-intelligence": {
    eyebrow: "Business intelligence", slug: "business-intelligence",
    title: "See what's driving growth.",
    description: "Track app revenue, client activity, reward engagement, referrals, reviews, visits, and offer performance from one owner dashboard.",
    icon: BarChart3, visual: "analytics", stat: "$28K+", statLabel: "average monthly app revenue visibility for connected practices",
    outcomeTitle: "Know exactly where your growth comes from.",
    outcomeBody: "The Nexcore dashboard brings every growth metric into one view. See which offers convert, which memberships retain, how rewards drive repeat visits, and where your revenue is trending — all without switching between tools.",
    features: [
      { title: "Revenue overview", description: "Total app sales, monthly trends, and growth comparisons at a glance.", icon: TrendingUp },
      { title: "Client tracking", description: "See active clients, new registrations, and engagement levels.", icon: UsersRound },
      { title: "Offer analytics", description: "Full funnel tracking from notification send to completed purchase.", icon: BarChart3 },
      { title: "Review monitoring", description: "Track Google reviews generated through loyalty program actions.", icon: Star },
      { title: "Referral tracking", description: "Monitor patient-to-patient introductions and their outcomes.", icon: Users },
      { title: "Live activity feed", description: "Real-time stream of purchases, rewards, memberships, and reviews.", icon: Zap },
    ],
    steps: [
      { title: "Connect your app", description: "Activity flows automatically from the patient app to the dashboard." },
      { title: "Explore your metrics", description: "Navigate sales, clients, rewards, referrals, reviews, and offers." },
      { title: "Review offer performance", description: "See how individual campaigns perform from send to purchase." },
      { title: "Make informed decisions", description: "Use real data to adjust offers, memberships, and growth strategies." },
    ],
  },
};

export const solutionNav: { href: string; title: string; blurb: string; icon: LucideIcon }[] = [
  { href: "/solutions/mobile-rewards", title: "Mobile Rewards", blurb: "Turn loyalty into repeat visits.", icon: Gift },
  { href: "/solutions/ecommerce", title: "Ecommerce", blurb: "Keep your practice open 24/7.", icon: ShoppingBag },
  { href: "/solutions/memberships", title: "Memberships", blurb: "Build predictable recurring revenue.", icon: RefreshCcw },
  { href: "/solutions/patient-engagement", title: "Patient Engagement", blurb: "Stay present between appointments.", icon: BellRing },
  { href: "/solutions/patient-financing", title: "Patient Financing", blurb: "Make high-value care more accessible.", icon: WalletCards },
  { href: "/solutions/business-intelligence", title: "Business Intelligence", blurb: "See what is driving growth.", icon: BarChart3 },
];

export const industryNav = [
  { href: "/who-we-serve/medical-spas", title: "Medical Spas" },
  { href: "/who-we-serve/laser-clinics", title: "Laser Clinics" },
  { href: "/who-we-serve/aesthetic-skin-clinics", title: "Aesthetic Skin Clinics" },
  { href: "/who-we-serve/cosmetic-dermatology", title: "Cosmetic Dermatology" },
  { href: "/who-we-serve/plastic-surgery", title: "Plastic Surgery" },
  { href: "/who-we-serve/skin-rejuvenation-clinics", title: "Skin Rejuvenation Clinics" },
  { href: "/who-we-serve/wellness-practices", title: "Wellness Practices" },
];

export interface BlogPost {
  slug: string; title: string; excerpt: string; category: string; readTime: string;
  image: string; imageAlt: string; date: string; author: string;
  intro: string;
  sections: { id: string; heading: string; body: string; bullets?: string[] }[];
}

export { blogPosts } from "./blog-data";

const _blogMovedToSeparateFile = [
  {
    slug: "_removed", title: "_",
    excerpt: "_",
    category: "Patient loyalty", readTime: "7 min read",
    image: "https://images.pexels.com/photos/4586732/pexels-photo-4586732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Patient discussing skincare results during a clinic consultation",
    date: "June 2, 2026", author: "Nexcore Team",
    intro: "Most loyalty programs fail not because the idea is wrong, but because the execution makes it hard for patients to understand what they earn, what they unlock, and why it matters. Here is how to design one that works.",
    sections: [
      { id: "why-loyalty", heading: "Why loyalty matters in aesthetic practices", body: "Patient acquisition costs continue to rise. A patient who returns three times is worth more than five first-time visitors. Loyalty programs make the return feel rewarding rather than routine.", bullets: ["Returning patients spend 44% more annually than one-time visitors", "Reward visibility between visits keeps your practice top of mind", "Points create a measurable reason to choose you over competitors"] },
      { id: "clear-structure", heading: "Design a clear earning structure", body: "Patients should understand immediately how they earn and what they earn toward. Every purchase, review, referral, and visit should contribute visible progress toward a meaningful reward." },
      { id: "meaningful-rewards", heading: "Make rewards worth redeeming", body: "A 5% discount does not create urgency. A free hydrafacial after reaching 1,500 points does. Choose rewards that patients genuinely want and set thresholds that feel achievable with consistent engagement.", bullets: ["Tie rewards to your most popular or aspirational treatments", "Use time-limited redemption windows to create urgency", "Show progress visually so patients know how close they are"] },
      { id: "mobile-experience", heading: "Put it on their phone", body: "A loyalty program buried in email receipts or paper punch cards will not drive behavior. When patients can check their balance, see upcoming rewards, and earn through their phone, engagement increases dramatically." },
      { id: "measure-iterate", heading: "Measure and improve", body: "Track which rewards get redeemed most, which earning actions drive the most engagement, and where patients drop off. Use this data to refine thresholds, adjust rewards, and keep the program fresh." },
    ],
  },
  {
    slug: "after-hours-treatment-sales", title: "Designing an after-hours treatment shopping experience",
    excerpt: "What patients need to move from browsing to a confident treatment purchase when your front desk is closed.",
    category: "Ecommerce", readTime: "6 min read",
    image: "https://images.pexels.com/photos/7750104/pexels-photo-7750104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Modern and spacious beauty practice interior",
    date: "May 28, 2026", author: "Nexcore Team",
    intro: "Up to 70% of treatment buying decisions happen outside your practice hours. If patients cannot browse, compare, and purchase from their phone at 9 PM, you are leaving significant revenue on the table.",
    sections: [
      { id: "after-hours-reality", heading: "The after-hours buying window", body: "Data consistently shows that most patients make purchasing decisions between 7 and 11 PM. They research treatments after work, compare options during downtime, and decide when they have uninterrupted thinking time." },
      { id: "treatment-information", heading: "Give them everything they need to decide", body: "An after-hours purchase requires more information than an in-person consultation. Patients need clear treatment descriptions, before and after guidance, pricing transparency, and social proof.", bullets: ["High-quality treatment images and descriptions", "Preparation and aftercare instructions", "Patient testimonials and results", "Clear pricing with no hidden fees"] },
      { id: "frictionless-checkout", heading: "Remove friction from checkout", body: "Mobile checkout must be fast and familiar. Support Apple Pay, Google Pay, and card payments. Offer buy now pay later for higher-value treatments. Send immediate confirmation." },
      { id: "abandoned-cart", heading: "Recover abandoned carts", body: "Not every browse converts immediately. Push notifications reminding patients about items in their cart — especially when paired with a reward unlock — bring them back to complete the purchase." },
      { id: "round-the-clock", heading: "Your practice, open around the clock", body: "An always-available storefront does not replace consultations. It captures the decisions patients are already making and turns after-hours interest into confirmed revenue." },
    ],
  },
  {
    slug: "membership-offer-framework", title: "A stronger framework for aesthetic practice memberships",
    excerpt: "How to communicate recurring value with treatment choice, member pricing, and benefits patients can understand.",
    category: "Memberships", readTime: "8 min read",
    image: "https://images.pexels.com/photos/6899536/pexels-photo-6899536.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Premium clinic lounge with neutral furniture and natural decor",
    date: "May 20, 2026", author: "Nexcore Team",
    intro: "Most membership programs under-communicate their value. Patients see a monthly price but not the full picture of what they receive. Here is how to structure a membership that sells itself.",
    sections: [
      { id: "recurring-value", heading: "Lead with recurring value, not monthly cost", body: "Frame the membership around what patients get, not what they pay. When a $290/month plan includes treatment choice, member-only pricing, skincare discounts, and digital skin scans, the value proposition changes entirely." },
      { id: "treatment-choice", heading: "Offer meaningful treatment choice", body: "Letting members choose from a curated set of treatments every cycle makes the membership feel personalized. Patients stay engaged because they are actively selecting rather than passively receiving.", bullets: ["Curate 15-20 treatments across key categories", "Allow one selection per treatment cycle", "Rotate seasonal or new treatments to keep options fresh"] },
      { id: "member-pricing", heading: "Use member-only pricing strategically", body: "Showing member vs. non-member prices across your treatment catalog creates ongoing awareness of the subscription's value. Every treatment page becomes a quiet membership advertisement." },
      { id: "signup-bonus", heading: "Design a compelling signup bonus", body: "Welcome packages that include immediate treatment access remove the activation barrier. New members who redeem a benefit in the first week have dramatically higher retention rates." },
      { id: "mobile-management", heading: "Make membership mobile-first", body: "When patients manage their membership from an app — viewing benefits, tracking treatment choices, seeing upcoming perks — cancellation becomes an active decision against visible value rather than a passive lapse." },
    ],
  },
  {
    slug: "gamification-med-spa-marketing", title: "Scratch cards, push notifications, and gamification in med spa marketing",
    excerpt: "How modern clinics use interactive offers, voice messages, and gamified engagement to drive impulse purchases and repeat visits.",
    category: "Engagement", readTime: "7 min read",
    image: "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Woman checking her phone in a modern wellness setting",
    date: "May 12, 2026", author: "Nexcore Team",
    intro: "Generic email blasts get ignored. Gamified, personalized offers that patients reveal, hear, and act on create a completely different response. Here is how to use them effectively.",
    sections: [
      { id: "why-gamification", heading: "Why gamification works in aesthetics", body: "The dopamine response from revealing a scratch card is the same psychology that drives app engagement worldwide. Applied to treatment offers, it transforms marketing from interruption to anticipation." },
      { id: "scratch-cards", heading: "Designing scratch-card offer campaigns", body: "Each campaign should combine urgency, personalization, and genuine value. Time-limited offers based on browsing history outperform blanket discounts.", bullets: ["Personalize based on treatment browsing history", "Add time-limited expiration for urgency", "Include voice messages from clinicians for personal touch", "Track every step from notification to purchase"] },
      { id: "voice-messages", heading: "The power of voice messages", body: "When a patient receives a birthday offer and hears their clinician's voice, the response rate is dramatically higher than text alone. It creates a human connection that digital marketing typically lacks." },
      { id: "push-strategy", heading: "Push notification strategy", body: "Push notifications should be earned, not spammed. Reserve them for genuine value moments — abandoned cart recovery, reward milestones, and personalized offers." },
      { id: "measuring-impact", heading: "Measuring campaign impact", body: "Track the full funnel: notifications sent, cards scratched, items added to cart, and purchases completed. This data shapes future campaigns and spending." },
    ],
  },
  {
    slug: "google-reviews-med-spa", title: "How to get more Google reviews from med spa patients automatically",
    excerpt: "A systematic approach to turning satisfied patients into consistent five-star reviewers through your rewards program.",
    category: "Growth", readTime: "5 min read",
    image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Professional reviewing patient feedback on a tablet",
    date: "May 5, 2026", author: "Nexcore Team",
    intro: "Google reviews drive local search visibility and patient trust. But asking for reviews feels awkward and inconsistent. Here is how to make it automatic, rewarding, and consistent.",
    sections: [
      { id: "reviews-matter", heading: "Why Google reviews matter more than ever", body: "Practices with 100+ reviews and a 4.8+ rating dominate local search results. Every review is a trust signal to both Google's algorithm and potential patients comparing options." },
      { id: "reward-reviews", heading: "Make reviews a rewarding action", body: "When leaving a Google review earns loyalty points — just like making a purchase or referring a friend — patients have a tangible reason to follow through.", bullets: ["Award 20-50 points per verified Google review", "Make the review action accessible directly from the app", "Show the points credit immediately after completion"] },
      { id: "timing", heading: "Time the ask perfectly", body: "The best moment to request a review is when a patient has just earned points, redeemed a reward, or completed a satisfying treatment. Their positive experience is fresh." },
      { id: "consistency", heading: "Build consistency through automation", body: "Manual review requests are inconsistent. When the ask is built into the app experience — visible in the earn-more section alongside referrals and visits — it becomes a steady stream." },
      { id: "local-seo", heading: "Impact on local search ranking", body: "Consistent five-star reviews improve your Google Business Profile ranking, making your practice more visible to patients actively searching for aesthetic services in your area." },
    ],
  },
  {
    slug: "med-spa-membership-vs-loyalty", title: "Med spa membership vs. loyalty program: which do you need?",
    excerpt: "Understanding the difference between memberships and loyalty programs — and why the most successful practices use both.",
    category: "Strategy", readTime: "6 min read",
    image: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Modern aesthetic clinic consultation room",
    date: "April 28, 2026", author: "Nexcore Team",
    intro: "Memberships and loyalty programs serve different purposes but amplify each other. Understanding when to use each — and how to combine them — is key to maximizing patient lifetime value.",
    sections: [
      { id: "definitions", heading: "Defining each model clearly", body: "A membership is a recurring subscription with defined benefits. A loyalty program rewards actions with points toward future value. One creates predictable revenue; the other creates behavioral incentives." },
      { id: "membership-strengths", heading: "When memberships shine", body: "Memberships work best when you can bundle recurring value — treatment choice, member pricing, exclusive perks — into a plan patients manage monthly.", bullets: ["Predictable recurring revenue for your practice", "Higher annual spend from members vs. non-members", "Built-in treatment scheduling and retention"] },
      { id: "loyalty-strengths", heading: "When loyalty programs shine", body: "Loyalty programs work best for encouraging specific behaviors — repeat purchases, Google reviews, referrals, and return visits. They create engagement between membership cycles.", bullets: ["Drive specific high-value actions", "Keep patients engaged between appointments", "Create visible progress and achievement"] },
      { id: "combined", heading: "Why the best practices use both", body: "Members who also participate in a loyalty program spend the most, visit most frequently, and refer the most new patients. The membership provides predictable value while loyalty rewards amplify engagement." },
      { id: "implementation", heading: "Implementing both effectively", body: "The key is presenting both within one cohesive experience. When membership status, point balance, available rewards, and treatment choices all live in one branded app, patients see the full value picture." },
    ],
  },
  {
    slug: "laser-clinic-membership-software", title: "Laser clinic membership software: how to build recurring revenue from laser treatments",
    excerpt: "Laser treatments demand multiple sessions — yet most clinics lose patients after session two. Here is how membership software changes the math.",
    category: "Laser clinics", readTime: "7 min read",
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Laser treatment device in a modern clinic environment",
    date: "July 18, 2026", author: "Nexcore Team",
    intro: "Laser hair removal, skin resurfacing, and IPL treatments all share the same challenge: they require a course of sessions, but patients drop off before completing them. Membership software solves this by creating commitment, value visibility, and re-engagement triggers.",
    sections: [
      { id: "drop-off", heading: "The laser patient drop-off problem", body: "On average, laser patients complete only 3 of a recommended 6-session course. That means clinics lose 50% of potential revenue per patient. The reason? No system keeps patients committed between sessions.", bullets: ["Session 1-2 completion: 95%", "Session 3-4 completion: 68%", "Session 5-6 completion: 47%", "Membership patients complete 89% of sessions"] },
      { id: "membership-model", heading: "Designing a laser membership that retains", body: "Bundle session courses into monthly membership plans. A $199/month laser membership that includes one session per month plus member-only pricing on add-ons creates predictable revenue and patient commitment." },
      { id: "mobile-tracking", heading: "Session tracking in a mobile app", body: "When patients can see their session progress, upcoming appointments, and remaining benefits in their phone, they feel invested. Visibility creates accountability." },
      { id: "re-engagement", heading: "Automated re-engagement for maintenance", body: "After a course ends, patients need touch-up sessions. Push notifications and scratch-card offers timed 6-8 weeks after completion bring them back before results fade." },
      { id: "results", heading: "Revenue impact of laser memberships", body: "Clinics using membership software for laser treatments see 44% higher annual revenue per patient and 3x better course completion rates compared to pay-per-session models." },
    ],
  },
  {
    slug: "white-label-app-med-spa", title: "Why your med spa needs its own branded mobile app in 2026",
    excerpt: "Generic booking apps commoditize your practice. A white-label branded app puts your identity, treatments, and loyalty program on every patient's phone.",
    category: "Strategy", readTime: "6 min read",
    image: "https://images.pexels.com/photos/6899536/pexels-photo-6899536.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Modern med spa reception area with premium design",
    date: "July 10, 2026", author: "Nexcore Team",
    intro: "Every premium brand has an app. Your patients use apps for banking, shopping, fitness, and food delivery. Yet most med spas still rely on phone calls and third-party booking platforms that strip away brand identity. Here is why that needs to change.",
    sections: [
      { id: "commoditization", heading: "The commoditization problem", body: "When patients book through Groupon, ClassPass, or generic scheduling software, your brand disappears. They remember the platform, not your practice. A branded app puts your logo, colors, and treatments front and center." },
      { id: "after-hours", heading: "70% of sales happen after hours", body: "Most med spa patients make buying decisions between 7-11 PM. Without a mobile storefront, those decisions go to competitors who are accessible on-demand. A branded app captures after-hours revenue automatically." },
      { id: "loyalty-built-in", heading: "Loyalty and rewards built into the experience", body: "Points, rewards, referrals, and Google review incentives live inside your app — not in a separate system patients forget about. Visibility drives engagement.", bullets: ["Visible point balance on every screen", "Reward milestones that create urgency", "Referral and review earning actions", "Member-only pricing across treatments"] },
      { id: "premium-positioning", heading: "Premium positioning through technology", body: "Patients perceive practices with branded apps as more professional, more established, and more premium. It signals investment in patient experience that paper loyalty cards never will." },
      { id: "getting-started", heading: "Getting started with a white-label med spa app", body: "Nexcore lets you launch a fully branded app with your treatments, memberships, rewards, and content — without building anything from scratch. Setup takes days, not months." },
    ],
  },
  {
    slug: "med-spa-after-hours-revenue", title: "Why 70% of med spa revenue happens after hours — and how to capture it",
    excerpt: "The data is clear: most treatment buying decisions happen when your front desk is closed. Here is how to turn after-hours browsing into confirmed revenue.",
    category: "Revenue", readTime: "5 min read",
    image: "https://images.pexels.com/photos/7750104/pexels-photo-7750104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Modern clinic interior during evening hours with warm lighting",
    date: "July 3, 2026", author: "Nexcore Team",
    intro: "Your clinic is open 8 hours a day. But patients spend 4+ hours daily on their phones — and most treatment decisions happen between 7 and 11 PM. Without a mobile sales channel, you are closed when patients are buying.",
    sections: [
      { id: "data", heading: "The after-hours data you cannot ignore", body: "Nexcore data shows 70% of in-app treatment purchases happen outside clinic hours. The peak buying window is 7-11 PM. Patients research after work, compare during dinner, and commit before bed.", bullets: ["70% of purchases occur outside clinic hours", "Peak buying window: 7-11 PM weeknights", "Average after-hours order value: $280", "Members browse 3.2x more often than non-members"] },
      { id: "psychology", heading: "Why patients buy after hours", body: "No time pressure from staff. No awkwardness about pricing. Full privacy to browse, compare, and decide. After-hours buying feels like online shopping — familiar, comfortable, and on their terms." },
      { id: "capture", heading: "How to capture after-hours revenue", body: "A branded mobile app with treatment browsing, pricing, Apple Pay checkout, buy-now-pay-later, and abandoned cart notifications turns your practice into a 24/7 sales engine." },
      { id: "cart-recovery", heading: "Abandoned cart recovery adds $5K+ monthly", body: "When patients browse but don't buy, a push notification paired with a reward unlock brings them back. Nexcore data shows 12 cart recovery purchases can generate $5,000+ in 24 hours." },
      { id: "impact", heading: "The revenue impact", body: "Clinics with a mobile sales channel see 24/7 revenue generation without additional staff, overhead, or marketing spend. The app pays for itself within the first month." },
    ],
  },
];

export interface IndustryData {
  slug: string; title: string; heroTitle: string; heroDescription: string;
  image: string; imageAlt: string; imageNote: string;
  challenges: { label: string; text: string }[];
  outcomes: { icon: LucideIcon; title: string; description: string }[];
}

export const industries: Record<string, IndustryData> = {
  "medical-spas": {
    slug: "medical-spas", title: "Medical Spas",
    heroTitle: "The branded app built for medical spas.",
    heroDescription: "Give your med spa a mobile home for treatment shopping, loyalty rewards, memberships, automated offers, and performance tracking — all branded to your practice.",
    image: "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Modern medical spa treatment room",
    imageNote: "Built for premium patient experiences",
    challenges: [
      { label: "01", text: "Patients research and decide outside your hours" },
      { label: "02", text: "Loyalty programs feel generic and disconnected" },
      { label: "03", text: "Membership value is hard to communicate clearly" },
      { label: "04", text: "Marketing campaigns lack personalization" },
    ],
    outcomes: [
      { icon: ShoppingBag, title: "24/7 treatment shopping", description: "Patients browse and purchase treatments from your app at any time, capturing after-hours buying decisions." },
      { icon: Gift, title: "Active loyalty engagement", description: "Points, rewards, referrals, and reviews create a visible journey that drives repeat visits." },
      { icon: RefreshCcw, title: "Membership growth", description: "Clear plan options, member pricing, and signup bonuses convert more patients into subscribers." },
    ],
  },
  "cosmetic-dermatology": {
    slug: "cosmetic-dermatology", title: "Cosmetic Dermatology",
    heroTitle: "Your dermatology practice, in every patient's pocket.",
    heroDescription: "Nexcore helps cosmetic dermatology practices sell treatments, build membership loyalty, and engage patients through a branded mobile experience.",
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Dermatology clinic consultation",
    imageNote: "Designed for dermatology-specific workflows",
    challenges: [
      { label: "01", text: "Complex treatment plans are hard to explain at checkout" },
      { label: "02", text: "Patient education materials live in scattered places" },
      { label: "03", text: "Follow-up care and product recommendations get lost" },
      { label: "04", text: "Subscription and package value is under-communicated" },
    ],
    outcomes: [
      { icon: Eye, title: "Treatment education in-app", description: "Before, after, preparation, and aftercare instructions are accessible right alongside each treatment." },
      { icon: Gift, title: "Skincare loyalty", description: "Reward patients for consistent care, product repurchases, and long-term treatment plans." },
      { icon: BarChart3, title: "Practice visibility", description: "Track treatment purchases, membership growth, and patient engagement from one dashboard." },
    ],
  },
  "plastic-surgery": {
    slug: "plastic-surgery", title: "Plastic Surgery",
    heroTitle: "A premium mobile experience for plastic surgery practices.",
    heroDescription: "Nexcore supports plastic surgery practices with mobile treatment browsing, flexible financing, membership options, and patient engagement features.",
    image: "https://images.pexels.com/photos/4266948/pexels-photo-4266948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Modern plastic surgery consultation",
    imageNote: "Built for high-value patient journeys",
    challenges: [
      { label: "01", text: "High-value procedures require extended consideration time" },
      { label: "02", text: "Price sensitivity limits conversions on premium treatments" },
      { label: "03", text: "Follow-up care and repeat visits are hard to incentivize" },
      { label: "04", text: "Patient communication between consult and procedure is sparse" },
    ],
    outcomes: [
      { icon: WalletCards, title: "Flexible payment options", description: "Buy now, pay later removes cost barriers on high-value procedures and packages." },
      { icon: BellRing, title: "Personalized engagement", description: "Voice messages, push notifications, and targeted offers keep patients connected pre and post-procedure." },
      { icon: Smartphone, title: "Premium brand experience", description: "A white-label app branded to your practice reinforces the premium positioning patients expect." },
    ],
  },
  "laser-clinics": {
    slug: "laser-clinics", title: "Laser Clinics",
    heroTitle: "The branded app built for laser clinics and laser treatment centers.",
    heroDescription: "Nexcore gives laser clinics a branded mobile platform for treatment packages, session-based memberships, loyalty rewards, and automated re-booking — turning one-time laser patients into lifetime clients.",
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Modern laser clinic treatment room with advanced equipment",
    imageNote: "Built for laser treatment workflows",
    challenges: [
      { label: "01", text: "Laser treatments require multiple sessions but patients drop off after two or three" },
      { label: "02", text: "Package and course pricing is complex to communicate on paper" },
      { label: "03", text: "Patients forget to rebook follow-up sessions on time" },
      { label: "04", text: "Competing clinics undercut on price — loyalty keeps patients coming back" },
    ],
    outcomes: [
      { icon: RefreshCcw, title: "Session-based memberships", description: "Create laser course memberships with session tracking, member-only pricing, and automated reminders for the next appointment." },
      { icon: Gift, title: "Loyalty across laser courses", description: "Points earned per session incentivize patients to complete full treatment courses and return for maintenance." },
      { icon: BellRing, title: "Automated re-engagement", description: "Push notifications and scratch-card offers bring dormant laser patients back for their next course or touch-up session." },
    ],
  },
  "aesthetic-skin-clinics": {
    slug: "aesthetic-skin-clinics", title: "Aesthetic Skin Clinics",
    heroTitle: "A premium mobile experience for aesthetic and cosmetic skin clinics.",
    heroDescription: "Nexcore helps aesthetic skin clinics sell advanced skincare treatments, build loyalty programs, manage memberships, and drive repeat visits — all from a beautifully branded mobile app your patients love.",
    image: "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Premium aesthetic skin clinic with modern interior design",
    imageNote: "Designed for aesthetic skincare excellence",
    challenges: [
      { label: "01", text: "Patients try one facial or peel and never return for the series" },
      { label: "02", text: "Advanced treatments like microneedling and chemical peels need patient education" },
      { label: "03", text: "Skincare product cross-sells happen in person but not after they leave" },
      { label: "04", text: "Premium positioning demands a premium digital experience to match" },
    ],
    outcomes: [
      { icon: ShoppingBag, title: "24/7 skincare shopping", description: "Patients browse treatment menus, skincare products, and packages from your branded app — morning or midnight." },
      { icon: Star, title: "Reviews and referrals on autopilot", description: "Earn points for Google reviews and friend referrals, driving new patient acquisition automatically." },
      { icon: Smartphone, title: "A brand experience patients show off", description: "Your clinic's own app — with your logo, colors, and treatments — positions you as the premium choice in your area." },
    ],
  },
  "skin-rejuvenation-clinics": {
    slug: "skin-rejuvenation-clinics", title: "Skin Rejuvenation Clinics",
    heroTitle: "The growth app for machine-based skin rejuvenation clinics.",
    heroDescription: "Nexcore helps skin rejuvenation and machine-based treatment clinics build recurring revenue with memberships, sell treatment courses through a branded app, and keep patients engaged between sessions with loyalty rewards and personalized offers.",
    image: "https://images.pexels.com/photos/4266948/pexels-photo-4266948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Advanced skin rejuvenation clinic with treatment devices",
    imageNote: "Built for machine-based treatment workflows",
    challenges: [
      { label: "01", text: "Expensive equipment means you need high utilization and repeat bookings" },
      { label: "02", text: "Patients complete a course and disappear — maintenance sessions get skipped" },
      { label: "03", text: "Treatment results take time, so patients need education and encouragement between visits" },
      { label: "04", text: "Communicating treatment plans, pricing, and expected outcomes is hard outside the clinic" },
    ],
    outcomes: [
      { icon: RefreshCcw, title: "Course-based memberships", description: "Bundle machine treatments into membership plans with session tracking, member pricing, and maintenance schedules." },
      { icon: BellRing, title: "Automated treatment reminders", description: "Scratch-card offers and push notifications remind patients when their next maintenance or follow-up session is due." },
      { icon: BarChart3, title: "Revenue and utilization tracking", description: "See which treatments drive the most revenue, track membership growth, and monitor machine utilization from the dashboard." },
    ],
  },
  "wellness-practices": {
    slug: "wellness-practices", title: "Wellness Practices",
    heroTitle: "A branded growth app for modern wellness practices.",
    heroDescription: "Nexcore brings membership management, treatment shopping, loyalty rewards, and patient engagement into one mobile platform for wellness-focused clinics.",
    image: "https://images.pexels.com/photos/6899543/pexels-photo-6899543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
    imageAlt: "Calm wellness practice interior",
    imageNote: "Designed for wellness and holistic care",
    challenges: [
      { label: "01", text: "Wellness visits require consistent return behavior" },
      { label: "02", text: "Package and membership value is hard to present clearly" },
      { label: "03", text: "Client engagement between sessions drops off quickly" },
      { label: "04", text: "Referral and review generation is inconsistent" },
    ],
    outcomes: [
      { icon: RefreshCcw, title: "Recurring memberships", description: "Create wellness membership plans with bundled treatments, member pricing, and flexible choice." },
      { icon: Gift, title: "Reward consistency", description: "Points earned through visits, purchases, and referrals encourage the regular care patterns wellness demands." },
      { icon: Heart, title: "Patient connection", description: "Clinic content, location details, and personalized offers keep patients connected between sessions." },
    ],
  },
};
