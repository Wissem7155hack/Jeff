import {
  BarChart3,
  BellRing,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Gift,
  HeartHandshake,
  MapPin,
  MessageCircleHeart,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export const solutionNav = [
  { title: "Mobile Rewards", href: "/solutions/mobile-rewards", icon: Gift, blurb: "Turn loyalty into repeat visits." },
  { title: "Ecommerce", href: "/solutions/ecommerce", icon: ShoppingBag, blurb: "Keep your practice open 24/7." },
  { title: "Memberships", href: "/solutions/memberships", icon: RefreshCcw, blurb: "Build predictable recurring revenue." },
  { title: "Patient Engagement", href: "/solutions/patient-engagement", icon: BellRing, blurb: "Stay present between appointments." },
  { title: "Patient Financing", href: "/solutions/patient-financing", icon: WalletCards, blurb: "Make high-value care more accessible." },
  { title: "Business Intelligence", href: "/solutions/business-intelligence", icon: BarChart3, blurb: "See what is driving growth." },
] as const;

export const industryNav = [
  { title: "Medical Spas", href: "/who-we-serve/medical-spas" },
  { title: "Cosmetic Dermatology", href: "/who-we-serve/cosmetic-dermatology" },
  { title: "Plastic Surgery", href: "/who-we-serve/plastic-surgery" },
  { title: "Wellness Practices", href: "/who-we-serve/wellness-practices" },
] as const;

export type Feature = { title: string; description: string; icon: LucideIcon };
export type SolutionPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: LucideIcon;
  features: Feature[];
  steps: { title: string; description: string }[];
  outcomeTitle: string;
  outcomeBody: string;
  visual: "rewards" | "shop" | "membership" | "engagement" | "financing" | "analytics";
};

export const solutions: Record<string, SolutionPage> = {
  "mobile-rewards": {
    slug: "mobile-rewards",
    eyebrow: "Mobile rewards",
    title: "Give patients a reason to come back.",
    description: "Build loyalty into every interaction with points, unlockable rewards, referrals, reviews, and time-sensitive offers inside your branded mobile app.",
    stat: "2.5×",
    statLabel: "patient lifetime value with a consistent loyalty experience",
    icon: Gift,
    visual: "rewards",
    outcomeTitle: "Loyalty that feels rewarding, not transactional",
    outcomeBody: "Patients always know their point balance, what they have unlocked, and how close they are to their next reward. Your practice gets more ways to encourage a review, referral, visit, or purchase without adding work to the front desk.",
    features: [
      { title: "Points that stay visible", description: "Place the patient’s live points balance at the center of their app experience.", icon: Star },
      { title: "Unlockable rewards", description: "Create clear milestones with useful, clinic-controlled rewards and redemption windows.", icon: Gift },
      { title: "Referral incentives", description: "Make sharing your practice easy and reward patients when friends are introduced.", icon: UsersRound },
      { title: "Google review prompts", description: "Invite engaged patients to share their experience at the right moment.", icon: MessageCircleHeart },
      { title: "Scratch-card offers", description: "Create interactive offers that bring a sense of discovery to seasonal campaigns.", icon: Sparkles },
      { title: "Reward activity view", description: "Track points earned, redeemed rewards, referrals, reviews, visits, and purchases.", icon: BarChart3 },
    ],
    steps: [
      { title: "Choose what earns points", description: "Reward the actions that matter to your practice, from purchasing and visiting to referring and reviewing." },
      { title: "Create meaningful milestones", description: "Set reward thresholds and expiration windows that are simple for patients to understand." },
      { title: "Keep the next reward in view", description: "Progress indicators show each patient how close they are to unlocking the next benefit." },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    eyebrow: "Ecommerce",
    title: "A storefront that never closes.",
    description: "Let patients browse treatments by concern, understand every option, and complete a purchase from your branded app whenever they are ready.",
    stat: "24/7",
    statLabel: "shopping across treatments, packages, and memberships",
    icon: ShoppingBag,
    visual: "shop",
    outcomeTitle: "Turn after-hours consideration into revenue",
    outcomeBody: "The path from interest to purchase stays clear: patients can search, compare, review preparation details, select quantity, add to basket, and pay on their own schedule.",
    features: [
      { title: "Browse by concern", description: "Organize services around patient goals so discovery feels natural and relevant.", icon: Search },
      { title: "Rich treatment pages", description: "Present images, testimonials, preparation guidance, aftercare, and pricing in one place.", icon: Smartphone },
      { title: "Fast mobile checkout", description: "Support familiar payment methods and a clean basket experience built for phones.", icon: CreditCard },
      { title: "Cart reminders", description: "Remind patients about an unfinished basket after they have had time to consider.", icon: BellRing },
      { title: "Personal recommendations", description: "Surface recently viewed and relevant treatments on the app home screen.", icon: Sparkles },
      { title: "Order visibility", description: "Give the practice a clear view of app orders and sales activity.", icon: Store },
    ],
    steps: [
      { title: "Build your treatment catalog", description: "Add services, packages, useful details, imagery, prices, and availability." },
      { title: "Help patients choose", description: "Use concerns, recommendations, testimonials, and guidance to reduce uncertainty." },
      { title: "Capture the purchase", description: "Patients complete checkout from home, in the clinic, or anywhere in between." },
    ],
  },
  memberships: {
    slug: "memberships",
    eyebrow: "Memberships",
    title: "Recurring revenue patients can manage with ease.",
    description: "Present membership benefits clearly, simplify enrollment, and keep monthly treatments, exclusive pricing, and account details in one familiar mobile experience.",
    stat: "44%",
    statLabel: "higher annual spend by members, based on the product data shared",
    icon: RefreshCcw,
    visual: "membership",
    outcomeTitle: "Make the value of membership easy to see",
    outcomeBody: "Show the recurring treatment allowance, member-only prices, included benefits, signup bonuses, and renewal details together. Patients can understand what they receive before joining and access it after enrollment.",
    features: [
      { title: "Flexible plan design", description: "Package recurring treatments, preferred pricing, skincare benefits, and clinic extras.", icon: Sparkles },
      { title: "Member-only pricing", description: "Show the value of membership directly on eligible treatment pages.", icon: CircleDollarSign },
      { title: "Monthly treatment access", description: "Help patients view and choose from treatments available in their plan.", icon: CheckCircle2 },
      { title: "Signup incentives", description: "Welcome new members with clearly presented bonuses and included benefits.", icon: Gift },
      { title: "Subscription visibility", description: "Keep plan details and membership status accessible from the patient app.", icon: Smartphone },
      { title: "Recurring revenue reporting", description: "Give owners a clearer view of member activity and membership performance.", icon: ChartNoAxesCombined },
    ],
    steps: [
      { title: "Shape a valuable offer", description: "Combine treatments and benefits that fit your care model and patient needs." },
      { title: "Present every benefit", description: "Use a focused sales page to explain inclusions, member pricing, and signup bonuses." },
      { title: "Support the relationship", description: "Keep membership choices, recurring value, and available treatments close at hand." },
    ],
  },
  "patient-engagement": {
    slug: "patient-engagement",
    eyebrow: "Patient engagement",
    title: "Stay connected between every visit.",
    description: "Use branded push notifications, app content, offers, voice messages, and location details to keep your practice helpful and relevant after patients leave.",
    stat: "Always on",
    statLabel: "a direct, branded connection on the patient’s phone",
    icon: BellRing,
    visual: "engagement",
    outcomeTitle: "A patient relationship that continues after checkout",
    outcomeBody: "Bring useful information, treatment reminders, clinic updates, and tailored offers into one branded channel. Patients can read, shop, call, find a location, and return when the timing is right.",
    features: [
      { title: "Branded push notifications", description: "Share timely updates, reminders, and offers through the clinic’s app.", icon: BellRing },
      { title: "Recorded voice messages", description: "Add a personal clinic message to selected offers and occasions.", icon: MessageCircleHeart },
      { title: "Educational articles", description: "Publish helpful content about treatments, preparation, aftercare, and your team.", icon: HeartHandshake },
      { title: "Clinic locations", description: "Show maps, opening hours, and direct calling for every practice location.", icon: MapPin },
      { title: "Abandoned-cart follow-up", description: "Bring patients back to products or treatments they were already considering.", icon: ShoppingBag },
      { title: "Live activity feed", description: "See recent app interactions and maintain a pulse on engagement.", icon: Clock3 },
    ],
    steps: [
      { title: "Bring patients into your app", description: "Introduce the branded experience at the clinic and across your existing channels." },
      { title: "Share something useful", description: "Combine education, relevant offers, and practical clinic information." },
      { title: "Measure the response", description: "Review notification, offer, sales, referral, review, and visit activity." },
    ],
  },
  "patient-financing": {
    slug: "patient-financing",
    eyebrow: "Patient financing",
    title: "Make considered purchases easier to complete.",
    description: "Give eligible patients a flexible way to pay for higher-value treatments and packages while keeping the purchase journey inside the mobile experience.",
    stat: "More choice",
    statLabel: "at checkout for eligible treatment and package purchases",
    icon: WalletCards,
    visual: "financing",
    outcomeTitle: "Reduce friction at the moment of decision",
    outcomeBody: "Patients can explore an eligible purchase, see the available payment option, and complete checkout on their phone. Your treatment pricing remains clear while the patient gets greater flexibility.",
    features: [
      { title: "Mobile-first checkout", description: "Keep payment selection straightforward on the device patients use most.", icon: Smartphone },
      { title: "Eligible package support", description: "Offer flexibility on selected higher-value treatments and packages.", icon: ShoppingBag },
      { title: "Clear payment presentation", description: "Show available choices before purchase without cluttering the treatment page.", icon: CreditCard },
      { title: "Familiar basket flow", description: "Keep financing within the same basket and checkout journey.", icon: WalletCards },
      { title: "Purchase confirmation", description: "Provide immediate order feedback and an accessible receipt experience.", icon: CheckCircle2 },
      { title: "Sales visibility", description: "See completed app purchases in the owner dashboard.", icon: BarChart3 },
    ],
    steps: [
      { title: "Choose eligible services", description: "Define which treatments and packages can use a flexible payment option." },
      { title: "Present options at checkout", description: "Patients select the payment route that suits the purchase." },
      { title: "Complete the order", description: "The app confirms the purchase and updates the practice dashboard." },
    ],
  },
  "business-intelligence": {
    slug: "business-intelligence",
    eyebrow: "Business intelligence",
    title: "Know what your app is doing for your practice.",
    description: "See clients, sales, referrals, reviews, visits, recent activity, and offer performance in a focused dashboard built for fast decisions.",
    stat: "One view",
    statLabel: "for patient activity, sales, loyalty, and campaign performance",
    icon: BarChart3,
    visual: "analytics",
    outcomeTitle: "Move from scattered signals to a clear daily pulse",
    outcomeBody: "The Nexcore dashboard organizes the activity that matters. Owners can review app growth, sales, reward actions, and campaign outcomes without piecing together separate reports.",
    features: [
      { title: "Client overview", description: "Track the number of patients connected to your branded app.", icon: UsersRound },
      { title: "Sales activity", description: "See purchases and revenue generated through the mobile storefront.", icon: ChartNoAxesCombined },
      { title: "Reviews and referrals", description: "Monitor loyalty actions that support reputation and acquisition.", icon: Star },
      { title: "Visit tracking", description: "Keep an eye on in-person visit activity connected to rewards.", icon: MapPin },
      { title: "Offer reporting", description: "Review notifications sent, reveals, basket adds, purchases, and revenue.", icon: Gift },
      { title: "Recent activity", description: "Use a live feed to understand what is happening across the app now.", icon: Clock3 },
    ],
    steps: [
      { title: "Launch your branded app", description: "Your storefront, rewards, membership, and engagement activity flow into one dashboard." },
      { title: "Read the signals", description: "Review top-level metrics and drill into offer performance and recent events." },
      { title: "Refine what you run", description: "Use real activity to improve treatment merchandising, rewards, and offers." },
    ],
  },
};

export type IndustryPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  challenges: string[];
  outcomes: { title: string; body: string; icon: LucideIcon }[];
};

export const industries: Record<string, IndustryPage> = {
  "medical-spas": {
    slug: "medical-spas",
    eyebrow: "For medical spas",
    title: "Turn treatment interest into lasting patient relationships.",
    description: "Bring treatments, memberships, rewards, and after-hours shopping together in an app that feels like an extension of your medical spa.",
    image: "https://images.pexels.com/photos/6899543/pexels-photo-6899543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Bright, premium beauty clinic reception",
    challenges: ["Converting treatment interest after consultations", "Building repeat behavior across treatment cycles", "Growing predictable membership revenue", "Keeping the brand present between visits"],
    outcomes: [
      { title: "Sell after hours", body: "Give patients time to explore and buy treatments from home.", icon: Clock3 },
      { title: "Reward loyalty", body: "Use points, milestones, referrals, reviews, and visits to support repeat behavior.", icon: Gift },
      { title: "Grow memberships", body: "Explain member value clearly and keep benefits within easy reach.", icon: RefreshCcw },
    ],
  },
  "cosmetic-dermatology": {
    slug: "cosmetic-dermatology",
    eyebrow: "For cosmetic dermatology",
    title: "A clear digital path from education to treatment.",
    description: "Help patients understand options, browse by concern, review guidance, and act when they feel ready—all under your practice brand.",
    image: "https://images.pexels.com/photos/29648642/pexels-photo-29648642.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
    imageAlt: "A dermatology treatment taking place in a modern clinic",
    challenges: ["Explaining a broad treatment portfolio", "Supporting considered patient decisions", "Maintaining continuity between visits", "Encouraging appropriate repeat care"],
    outcomes: [
      { title: "Educate with context", body: "Use treatment pages and articles to answer common questions.", icon: Search },
      { title: "Organize by concern", body: "Help patients find relevant services without knowing treatment names.", icon: Sparkles },
      { title: "Stay connected", body: "Bring useful reminders and practice content back to the patient’s phone.", icon: BellRing },
    ],
  },
  "plastic-surgery": {
    slug: "plastic-surgery",
    eyebrow: "For plastic surgery",
    title: "Support longer, higher-consideration patient journeys.",
    description: "Create a polished mobile destination for education, consultations, related treatments, financing options, and ongoing patient engagement.",
    image: "https://images.pexels.com/photos/4266948/pexels-photo-4266948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
    imageAlt: "Clinician consulting with a patient in a bright treatment room",
    challenges: ["Long consideration periods before purchase", "Complex service and package information", "Maintaining contact after consultation", "Creating cross-sell paths for non-surgical care"],
    outcomes: [
      { title: "Support decisions", body: "Keep useful service information available after the consultation.", icon: HeartHandshake },
      { title: "Offer flexibility", body: "Present eligible payment choices in the mobile checkout journey.", icon: WalletCards },
      { title: "Continue engagement", body: "Use content and notifications to stay present without adding front-desk work.", icon: BellRing },
    ],
  },
  "wellness-practices": {
    slug: "wellness-practices",
    eyebrow: "For wellness practices",
    title: "Make recurring care simple to understand and manage.",
    description: "Package ongoing services, member benefits, educational content, and loyalty into one branded mobile experience.",
    image: "https://images.pexels.com/photos/3985301/pexels-photo-3985301.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Wellness practitioner speaking with a patient",
    challenges: ["Explaining the value of ongoing plans", "Keeping patients engaged between visits", "Managing recurring service choices", "Creating consistent revenue across the year"],
    outcomes: [
      { title: "Package recurring value", body: "Give patients a clear view of plan benefits and treatment choices.", icon: RefreshCcw },
      { title: "Encourage consistency", body: "Use rewards and reminders to support repeat visits and purchases.", icon: CheckCircle2 },
      { title: "See engagement", body: "Track app activity, sales, visits, reviews, and referrals from the dashboard.", icon: BarChart3 },
    ],
  },
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "build-a-patient-loyalty-program",
    title: "How to build a patient loyalty program people actually use",
    excerpt: "A practical framework for clear rewards, meaningful milestones, and an experience that supports long-term patient relationships.",
    category: "Patient loyalty",
    date: "May 28, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/4586732/pexels-photo-4586732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Patient discussing skincare results during a clinic consultation",
    intro: "A loyalty program succeeds when patients understand it immediately, value the next reward, and can see their progress without asking staff for help. The goal is not to add another promotion. It is to create a consistent reason to return.",
    sections: [
      { heading: "Start with the behavior you want to support", paragraphs: ["Define the actions that strengthen the patient relationship. Treatment purchases may be one action, but visits, thoughtful reviews, and qualified referrals can also matter.", "Keep the earning model concise. A patient should be able to explain it after seeing the rewards screen once."], bullets: ["Purchases completed in the app", "Eligible in-person visits", "A verified patient referral", "A review requested after an appropriate interaction"] },
      { heading: "Make progress visible", paragraphs: ["A hidden points balance has little influence. Put progress in a prominent place and explain exactly what the next milestone unlocks.", "Use simple labels, clear thresholds, and accessible expiration details. Avoid forcing patients to calculate value or search for rules."] },
      { heading: "Choose rewards that protect the care experience", paragraphs: ["Rewards should complement your treatment plan and brand. Consider benefits that encourage a relevant return visit or introduce an appropriate adjacent service.", "Review performance regularly. Redemptions, referrals, reviews, and repeat purchases can reveal which milestones patients genuinely value."] },
    ],
  },
  {
    slug: "after-hours-treatment-sales",
    title: "Designing an after-hours treatment shopping experience",
    excerpt: "What patients need to move from browsing to a confident treatment purchase when your front desk is closed.",
    category: "Ecommerce",
    date: "May 14, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/7750104/pexels-photo-7750104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Modern and spacious beauty practice interior",
    intro: "Patients often continue considering a treatment after they leave your practice. A useful mobile storefront gives them enough context to make a decision without turning the experience into a dense product catalog.",
    sections: [
      { heading: "Organize around the patient’s concern", paragraphs: ["Patients may know the outcome they want before they know the treatment name. Concern-based navigation reduces the gap between intent and your service catalog.", "Search still matters, especially for returning patients. Offer both paths and keep naming consistent with the language your team uses in consultations."] },
      { heading: "Answer the questions that delay a purchase", paragraphs: ["Each treatment page should establish what the service is, who it may be relevant for, what preparation is expected, and what aftercare may involve. Use approved, practice-specific information.", "Photography and genuine patient feedback can add useful context, but should never replace clear written guidance or clinical consultation where one is required."], bullets: ["Treatment overview and concern", "Price and package quantity", "Preparation and aftercare", "Relevant testimonials", "Clear route to ask a question"] },
      { heading: "Keep checkout calm", paragraphs: ["A mobile checkout should preserve context, minimize fields, and make the next step obvious. Show the basket total and any eligible payment choices before confirmation.", "When a basket is left incomplete, a measured reminder can bring the patient back without creating pressure. Make notification preferences easy to manage."] },
    ],
  },
  {
    slug: "membership-offer-framework",
    title: "A stronger framework for aesthetic practice memberships",
    excerpt: "How to communicate recurring value with treatment choice, member pricing, and benefits patients can understand.",
    category: "Memberships",
    date: "April 30, 2026",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/6899536/pexels-photo-6899536.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Premium clinic lounge with neutral furniture and natural decor",
    intro: "A membership is easier to consider when the recurring benefit is concrete. Patients should be able to see what they receive, how often they receive it, and where member pricing creates additional value.",
    sections: [
      { heading: "Build around a clear recurring benefit", paragraphs: ["Lead with the core treatment allowance or service choice. Additional discounts and bonuses should reinforce that primary value rather than compete with it.", "If patients can choose between several monthly or periodic treatments, show the available options in a scannable format."] },
      { heading: "Show value where decisions happen", paragraphs: ["Member pricing is most useful on the treatment page where a patient is already comparing options. The difference should be easy to understand without obscuring the standard price.", "A dedicated membership page should then connect those savings to the full plan: included treatments, frequency, skincare benefits, scans, events, or other practice-specific inclusions."] },
      { heading: "Support the membership after signup", paragraphs: ["Enrollment is only the beginning. Patients need a reliable place to see status, available treatment choices, current benefits, and relevant account details.", "The practice should monitor member activity and listen for points of confusion. Clear communication supports trust and helps the team improve the offer over time."] },
    ],
  },
  {
    slug: "patient-engagement-between-visits",
    title: "Five ways to stay useful between patient visits",
    excerpt: "A patient engagement plan built around relevance, timing, education, and direct access to your practice.",
    category: "Engagement",
    date: "April 16, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/8313245/pexels-photo-8313245.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Clinician providing care in a calm modern treatment room",
    intro: "Patient engagement should make care easier to navigate. The most effective touchpoints answer a question, clarify a next step, or offer a timely reason to return.",
    sections: [
      { heading: "Use one clear purpose per message", paragraphs: ["A notification works best when the recipient can understand the point at a glance. Avoid combining a clinic update, treatment promotion, and educational article in one alert.", "Send patients to a specific destination in the app so the action matches the message."] },
      { heading: "Create a balanced content rhythm", paragraphs: ["Useful education earns attention that can support future commercial messages. Explain treatment preparation, aftercare, seasonal considerations, your team’s approach, and common questions.", "A balanced plan can include education, relevant rewards, membership reminders, clinic news, and appointment-related information."], bullets: ["Answer one common treatment question", "Introduce a clinician or location", "Explain how a membership benefit works", "Remind a patient about an unlocked reward", "Share relevant opening-hour updates"] },
      { heading: "Measure action, not noise", paragraphs: ["Notification volume is not an outcome. Look at opens, destination activity, basket additions, completed purchases, redemptions, reviews, and referrals in context.", "Give patients control over communication preferences and use performance signals to improve relevance over time."] },
    ],
  },
  {
    slug: "clinic-dashboard-metrics",
    title: "The practice app metrics worth checking every week",
    excerpt: "A focused guide to reading sales, rewards, memberships, referrals, reviews, and offer performance.",
    category: "Business intelligence",
    date: "April 2, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/13068363/pexels-photo-13068363.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Contemporary black and white beauty practice reception",
    intro: "A useful dashboard helps the practice decide what to do next. Start with a small set of connected metrics and use the activity feed to understand the patient behavior behind each number.",
    sections: [
      { heading: "Begin with the commercial picture", paragraphs: ["Review app sales alongside order count and basket activity. This shows whether changes come from more purchasers, different purchase values, or both.", "Membership activity belongs beside transactional sales because recurring plans can change the shape and predictability of practice revenue."] },
      { heading: "Connect loyalty activity to outcomes", paragraphs: ["Points issued alone do not show value. Review rewards unlocked and redeemed, then compare those events with subsequent visits and purchases.", "Referrals and reviews are separate outcomes and should remain visible. Both can reflect strong engagement, but each supports a different part of practice growth."] },
      { heading: "Read each offer as a funnel", paragraphs: ["Offer performance becomes clearer when viewed as a sequence: notification sent, offer opened or revealed, added to basket, and purchased.", "Large drop-offs point to different questions. A weak reveal rate may suggest targeting or timing, while strong basket adds with few purchases may indicate checkout friction or an unclear offer condition."], bullets: ["Notifications sent", "Offers viewed or revealed", "Basket additions", "Completed purchases", "Revenue generated"] },
    ],
  },
  {
    slug: "branded-clinic-app-launch",
    title: "Your branded clinic app launch checklist",
    excerpt: "Prepare your catalog, rewards, memberships, team, and patient communication for a confident mobile app launch.",
    category: "Practice growth",
    date: "March 19, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/3985299/pexels-photo-3985299.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    imageAlt: "Healthcare professional speaking with a patient in a bright clinic",
    intro: "The strongest app launches start before the download link is shared. A focused catalog, clear staff workflow, and useful reason to download help the app become part of the patient experience from day one.",
    sections: [
      { heading: "Prepare the patient-facing foundation", paragraphs: ["Confirm the clinic name, logo, colors, contact details, locations, opening hours, and direct phone routes. Then review every live treatment page for accuracy.", "Prioritize the services patients ask about most rather than delaying launch for an exhaustive catalog."], bullets: ["Brand and location details", "Treatment names and prices", "Preparation and aftercare guidance", "Membership plan details", "Reward rules and expiration windows"] },
      { heading: "Give the team a simple introduction", paragraphs: ["Front-desk and clinical teams should be able to explain the app in one sentence and show patients where to find points, treatments, and membership details.", "Choose a few natural moments for introduction: consultation checkout, membership discussion, treatment plan follow-up, or reward redemption."] },
      { heading: "Plan the first month", paragraphs: ["Start with useful communications and one easy-to-understand offer. Review activity frequently so the team can address common questions and refine the patient journey.", "Track downloads or connected clients, catalog views, purchases, reward actions, referrals, reviews, and any support questions that reveal friction."] },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const trustPoints = [
  { icon: ShieldCheck, label: "Built around controlled practice content" },
  { icon: Smartphone, label: "Designed for the patient’s phone" },
  { icon: ChartNoAxesCombined, label: "Connected to a focused owner dashboard" },
];
