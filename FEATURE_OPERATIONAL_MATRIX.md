# NEXCORE PLATFORM — FEATURE OPERATIONAL MATRIX
**Document Reference:** `FEATURE_OPERATIONAL_MATRIX.md`  
**Classification:** Operational Capability Audit & Integration Ledger  
**Production Status:** Verified Active State (November 2026)  

---

## 1. Operational Classification Definitions

- **`[Fully Functional & Wired]`**: Feature is backed by live PostgreSQL database tables, active Supabase hooks / Edge Functions, responsive state management, and real UI interactivity.
- **`[Stubbed / Mocked]`**: Feature UI is rendered in the interface, but mutations operate purely in local React/Riverpod state, trigger simulated toasts, or lack permanent database persistence.
- **`[Requires Configuration]`**: Code is implemented and ready, but activation depends on external production credentials (e.g., live Stripe Connect account keys, Apple APNs certificates, production DNS CNAME propagation).

---

## 2. Web Admin Dashboard (`admin-dashboard/beter clone`)

| Module / Screen | Feature | Status | Backing Database / Service | Technical Implementation Notes |
|---|---|---|---|---|
| **Agency Super-Portal** | Agency KPI Overview (Total Merchants, Active Clients, Verified, Pending) | `[Fully Functional & Wired]` | `public.clinics`, `public.client_profiles` | Queries live database counts on mount; updates automatically. |
| | Merchant Directory (Search, Sort, Grid/List toggle) | `[Fully Functional & Wired]` | `public.clinics` via `useClinics()` | Filter by text, sort by name or client volume, switch layout mode. |
| | Add Merchant / Create Clinic Modal | `[Fully Functional & Wired]` | `public.clinics` insert | Inserts new clinic record with defaults and default palette. |
| | Delete Merchant Modal | `[Fully Functional & Wired]` | `public.clinics` delete | Cascades deletions across all related tables in Supabase. |
| | Active / Inactive Status Toggle | `[Fully Functional & Wired]` | `public.clinics.is_active` | Updates `is_active` boolean directly via PostgREST. |
| | Sandbox vs. Live Environment Switcher | `[Fully Functional & Wired]` | `public.clinics.environment` | Filters clinic cards into Test Mode vs Production Mode. |
| | Store Deployment Modal | `[Fully Functional & Wired]` | `public.clinics.verification_status` | Validates logo, active treatment count, and Stripe Connect status before promotion. |
| **White-Label CMS** | Live Brand Color Palette Picker | `[Fully Functional & Wired]` | `public.clinics.theme` | Updates `--tenant-primary` CSS variable live and persists JSONB theme to Supabase. |
| | Target Tenant Switcher | `[Fully Functional & Wired]` | `useClinics()` | Allows agency admin to switch the active brand configuration context. |
| | Agency Logo & Favicon Upload | `[Fully Functional & Wired]` | Supabase Storage `merchant-assets` | File input uploads to storage bucket and stores public URL. |
| | Custom Domain DNS Mapping | `[Fully Functional & Wired]` | `public.agencies.custom_domain` | Stores custom domain (e.g. `portal.getdemor.com`); displays CNAME guide banner. |
| **Merchant Dashboard** | Daily Processing Chart (65%) | `[Fully Functional & Wired]` | `public.transactions` via `useTransactions()` | Computes gross/net volume, refunds, and interactive time-series plots. |
| | Live Activity Feed (35%) | `[Fully Functional & Wired]` | `public.transactions` + Supabase Realtime | Real-time WebSocket streaming on channel `dashboard-realtime-{clinicId}`. |
| | Date Range Picker & Comparisons | `[Fully Functional & Wired]` | In-memory date filtering | Last 7 days, 30 days, MTD, YTD, Custom with Previous Period/Year overlays. |
| | KPI Summary Cards (Net Rev, MRR, Sources, Members, LTV) | `[Fully Functional & Wired]` | `public.transactions`, `public.memberships`, `public.client_profiles` | Dynamic computation from real database records. |
| | Top Clients Leaderboard Modal | `[Fully Functional & Wired]` | `public.client_profiles` | Sorted by total spend and visit frequency. |
| | Top Team Members Leaderboard Modal | `[Fully Functional & Wired]` | `public.team_members`, `public.transactions` | Sorted by sales volume or MRR attribution. |
| **Client Profiles CRM** | Patient Roster & Search | `[Fully Functional & Wired]` | `public.client_profiles` via `useClientProfiles()` | Search by name, email, phone; filter by status (Active, VIP, Member). |
| | Patient Detail Drawer | `[Fully Functional & Wired]` | `public.client_profiles`, `public.transactions` | Displays spend history, loyalty points, beauty bank balance, treatment log. |
| | Beauty Bank & Points Adjustment | `[Fully Functional & Wired]` | `public.client_profiles` update | Updates balance and points with atomic database mutation. |
| **Transactions Ledger** | Financial Ledger Table | `[Fully Functional & Wired]` | `public.transactions` via `useTransactions()` | Filter by date, payment status (succeeded, refunded, failed), and type. |
| | CSV Export | `[Fully Functional & Wired]` | In-browser CSV generator | Exports filtered transactions to formatted spreadsheet. |
| **Memberships** | Membership Tiers Overview | `[Fully Functional & Wired]` | `public.memberships` via `useMemberships()` | Displays tier cards, pricing, perks, and active subscriber metrics. |
| | Reorderable Membership List | `[Fully Functional & Wired]` | `public.memberships.sort_order` | Drag-and-drop ordering updating `sort_order` in database. |
| **App Builder CMS** | Products & Treatments Catalog | `[Fully Functional & Wired]` | `public.treatments` via `useTreatments()` | Full CRUD: multi-pricing (individual, bundles, variations), photos, tags. |
| | Membership Plan Editor | `[Fully Functional & Wired]` | `public.memberships` | Create and edit recurring subscriptions, commitment rules, bonus gifts. |
| | Automated Offers & Push Campaigns | `[Fully Functional & Wired]` | `public.offers` | Automated holiday triggers, custom banners, audio voice notes. |
| | Reward Points & Gamification Config | `[Fully Functional & Wired]` | `public.loyalty_programs` via `useLoyaltyProgram()` | Configures points for signups, reviews, visits, and spend multipliers. |
| | Bespoke Custom Plans Prescriptions | `[Fully Functional & Wired]` | `public.custom_plans` via `useCustomPlans()` | Prescribe custom bundles to individual patient UUIDs. |
| **In-Clinic Operations** | Reception QR Scanner Modal | `[Fully Functional & Wired]` | `public.clinic_checkins` | Camera barcode scanner to verify patient VIP passes and award points. |
| | In-Clinic Poster QR Generator | `[Fully Functional & Wired]` | SVG QR code generator | Generates printable high-res PDF/SVG pairing poster for reception desk. |
| **Settings & Security** | Stripe Connect Express Onboarding | `[Requires Configuration]` | `create-stripe-connect-link` Edge Function | Calls function to generate OAuth onboarding; requires live Stripe keys. |
| | GDPR Cookie Consent & Session Audit | `[Fully Functional & Wired]` | `public.user_cookie_consents`, `public.user_sessions` | Tracks consents and audits active session tokens. |

---

## 3. Main Web Portal & Growth Site (`admin-dashboard/nexcore V2`)

| Route / Component | Feature | Status | Technical Implementation Notes |
|---|---|---|---|
| `/` (Homepage) | Marketing Showcase & Interactive Hero | `[Fully Functional & Wired]` | Next.js 15 App Router with high-performance responsive layout. |
| `/login` | Administrative Sign-In Portal | `[Fully Functional & Wired]` | Clerk React SDK sign-in bridge synchronized with multi-domain session cookies. |
| `/signup` | Agency / Clinic Registration | `[Fully Functional & Wired]` | Clerk registration flow creating authorized user identity. |
| `/book-demo` | Interactive Demo Scheduling | `[Fully Functional & Wired]` | Lead intake form capturing clinic name, location, and practitioner volume. |
| `/regions/[country]` | Geo-Targeted Localization | `[Fully Functional & Wired]` | Dynamic routing for US, UK, CH, DE, IE with localized currencies and regulatory messaging. |
| `/resources/blog` | Clinical Content & Medical Aesthetic SEO | `[Fully Functional & Wired]` | Static generation from `src/lib/blog-data.ts`. |
| `/api/auth/reset-password` | Custom Password Reset Override | `[Remediated & Disabled]` | Permanently disabled for security compliance (HTTP 410 Gone). |

---

## 4. Consumer Mobile Application Container (`Patient app`)

| Screen / Feature | Status | Backing Service / State | Technical Implementation Notes |
|---|---|---|---|
| **App Boot & Session Hydration** | Dynamic Cold-Start Session Recovery | `[Fully Functional & Wired]` | `session_provider.dart`, `AppPersistenceService` | Restores authenticated session or guest token from encrypted local storage. |
| **Dynamic Brand Re-Theming** | Over-The-Air JSON Palette Deserialization | `[Fully Functional & Wired]` | `clinic_provider.dart`, `app_theme.dart` | Fetches `clinics.theme` JSONB; dynamically builds `ThemeData` without app restart. |
| **Clinic Discovery & QR Pairing** | In-Clinic QR Code Scanner | `[Fully Functional & Wired]` | `mobile_scanner`, `scan_clinic_qr_screen.dart` | Scans `nexcore://clinic?id={id}&slug={slug}`, downloads clinic catalog, morphs UI. |
| | Location Finder & Clinic Search | `[Fully Functional & Wired]` | `clinic_repository.dart` | Lists all active clinics from Supabase PostgREST; allows manual switching. |
| **Home Screen (`/`)** | Treatment Hero & Category Rails | `[Fully Functional & Wired]` | `home_screen.dart`, `clinic_provider.dart` | Renders hero banners, featured treatments, and educational articles. |
| | Automated Offer Popups | `[Fully Functional & Wired]` | `offers_provider.dart`, `AutomatedOfferDialog` | Displays active promotional campaigns; guarded against repeated loops. |
| **Shop Screen (`/shop`)** | Full Clinical Treatment Catalog | `[Fully Functional & Wired]` | `shop_screen.dart`, `treatments` table | Multi-tab view: Face, Body, Injectables, Memberships, Packages. |
| | Treatment Detail Screen | `[Fully Functional & Wired]` | `treatment_detail_screen.dart` | Pre/post care instructions, before/after gallery, individual & bundle add-to-cart. |
| **Shopping Cart & Checkout** | Shopping Cart Ledger | `[Fully Functional & Wired]` | `basket_provider.dart`, `basket_screen.dart` | Hydrates cart per-clinic from disk; prevents cross-clinic product mixing. |
| | Stripe Connect Checkout Sheet | `[Fully Functional & Wired]` | `stripe_payment_service.dart`, `create-payment-intent` | Invokes Edge Function, validates catalog price, presents native Stripe PaymentSheet. |
| **Digital Wallet & Rewards (`/rewards`)**| VIP Pass QR Code Display | `[Fully Functional & Wired]` | `rewards_screen.dart`, `qr_flutter` | Generates patient check-in QR code for reception scanning. |
| | Points & Beauty Bank Balance | `[Fully Functional & Wired]` | `wallet_provider.dart`, `client_profiles` | Displays real-time point balance and available monetary store credit. |
| | Unlockable Vouchers Exchange | `[Fully Functional & Wired]` | `vouchers`, `client_vouchers` | Exchanges loyalty points for discount vouchers with scratch-to-reveal cards. |
| | Google Review Advocacy Loop | `[Fully Functional & Wired]` | `client_reviews`, `google_reviews_service.dart` | Launches verified Google review URL (strict HTTPS check); tracks reward points. |
| **Patient Profile (`/profile`)** | Personal Information Editing | `[Fully Functional & Wired]` | `personal_info_screen.dart`, `client_profiles` | Updates patient name, phone, birthday (locked by RLS to own profile). |
| | Account Deletion (GDPR Right to Erasure) | `[Fully Functional & Wired]` | `auth_lifecycle_and_deletion.sql` | Atomically purges patient data and revokes authentication session. |

---

## 5. Technical Action Items (Next Implementation Phase)

1. **Agency Dynamic Domain Engine in Web Dashboard:**
   - Execute database migration `20261101000000_agency_whitelabel_schema.sql` creating `public.agencies` and adding `agency_id`, `environment`, and `verification_status` to `public.clinics`.
   - Update `App.tsx` / `ClinicContext.tsx` to inspect `window.location.hostname` on load, query `public.agencies`, and dynamically inject agency logo, name, and `--brand-primary`.
2. **Agency Dashboard UI Updates:**
   - Add Stripe-style Sandbox vs. Live toggle switch.
   - Implement Store Deployment Modal on sandbox cards with prerequisites checklist and build confirmation.
3. **White-Label Settings CMS:**
   - Wire custom domain input with inline GoDaddy/Cloudflare CNAME guidance (`cname.vercel-dns.com`).
   - Wire logo and favicon file uploads to Supabase Storage bucket `merchant-assets`.

---
*End of Feature Operational Matrix.*
