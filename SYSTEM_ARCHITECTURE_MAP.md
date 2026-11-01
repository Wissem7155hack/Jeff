# NEXCORE PLATFORM — MASTER SYSTEM ARCHITECTURE & TOPOLOGY
**Document Reference:** `SYSTEM_ARCHITECTURE_MAP.md`  
**Classification:** Enterprise Engineering Architecture Blueprint  
**Production Status:** Verified Active Architecture (November 2026)  
**Target Codebases:**
1. `admin-dashboard/beter clone` — Web Admin Dashboard (React 18 / Vite / TypeScript / Tailwind CSS / Supabase Realtime)
2. `admin-dashboard/nexcore V2` — Growth & Public Acquisition Portal (Next.js 15 / App Router / React 19 / Tailwind CSS)
3. `Patient app` — Consumer Mobile Client Container (Flutter 3.x / Dart 3.x / Riverpod / GoRouter)

---

## 1. Executive System Topology & 3-Tier Enterprise Structure

Nexcore is an enterprise-grade, multi-tenant B2B2C Software-as-a-Service (SaaS) platform built for luxury medical aesthetics practices, cosmetic dermatology groups, and plastic surgery clinics. The ecosystem bridges high-friction after-hours retail purchasing with clinical CRM management by pairing a centralized web management console with custom-branded native iOS/Android patient mobile applications.

```
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
|                                  TIER 1: AGENCY SUPER-PORTAL (ROOT SCOPE)                               |
|  - Custom Domain CNAME Routing (e.g. portal.getdemor.com -> cname.vercel-dns.com)                      |
|  - Dynamic Whitelabel Theming (CSS Variable Injection: --brand-primary, Document Title, Logos)          |
|  - Multi-Agency Merchant Data Isolation (agencies table, owner_email scoping)                           |
|  - Stripe-Style Environment Switching (Sandbox Test Mode vs. Production Live Mode)                      |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
                                                     │
                                                     ▼
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
|                               TIER 2: MERCHANT CLINIC WORKSPACE (TENANT SCOPE)                          |
|  - Locked Analytical Grid: Daily Processing (65%) & Live Activity (35%)                                 |
|  - Core Performance Metrics: Net Revenue, MRR, Revenue Sources, Total Members, Client LTV, Top Clients   |
|  - Supabase Realtime WebSocket Streaming (channel: dashboard-realtime-{clinicId})                       |
|  - Dynamic In-Memory Location Switching (Zero full-page reloads, re-keying useSupabaseData hooks)       |
|  - Module Suite: App Builder CMS, Client CRM, Transactions Ledger, Memberships & Dunning Engine         |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
                                                     │
                                                     ▼
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
|                                 TIER 3: DUAL MOBILE STRATEGY (CONSUMER RUNTIME)                         |
|  ┌─────────────────────────────────────────────────────┐ ┌────────────────────────────────────────────┐ |
|  │            CONTAINER TEST SHELL                     │ │        BESPOKE FLAGSHIP STORE BUILDS        │ |
|  │  - Universal App Store distribution                 │ │  - Dedicated App Store & Google Play binary │ |
|  │  - In-clinic QR pairing & location discovery        │ │  - Fastlane automated parameter-driven CI/CD│ |
|  │  - Realtime over-the-air theme & catalog morphing   │ │  - Fixed brand identity per luxury client   │ |
|  │  - Instant preview for prospective clinic owners    │ │  - Tailored push notification certificates  │ |
|  └─────────────────────────────────────────────────────┘ └────────────────────────────────────────────┘ |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 2. Detailed Tier Specifications

### 2.1 Tier 1: Agency Super-Portal (`beter clone`)
The Agency Super-Portal provides agencies, medical spa franchises, and enterprise distributors with a dedicated command center to manage multiple clinic sub-accounts.

- **Dynamic Custom Domain Mapping:**
  - Agency clients configure a CNAME record in their DNS provider (GoDaddy, Cloudflare, Namecheap) pointing to `cname.vercel-dns.com`.
  - When traffic arrives at Vercel with an agency custom domain (e.g., `portal.getdemor.com`), the application inspects `window.location.hostname`.
  - The application queries Supabase:
    ```typescript
    const { data: agency } = await supabase
      .from('agencies')
      .select('*')
      .eq('custom_domain', window.location.hostname)
      .single();
    ```
  - If matched, the agency's logo, company name, and primary brand color are injected dynamically into the runtime state:
    ```typescript
    document.documentElement.style.setProperty('--brand-primary', agency.brand_color);
    document.title = `${agency.name} | Agency Portal`;
    ```
  - If no custom domain matches, the portal falls back gracefully to default Nexcore branding. Zero hardcoded agency domains exist in source code.

- **Multi-Agency Isolation:**
  - Agency accounts reside in `public.agencies`.
  - Clinics belong to an agency via `public.clinics.agency_id`.
  - Row Level Security (RLS) ensures agency owners only query and mutate clinics where `agency_id IN (SELECT id FROM public.agencies WHERE owner_email = auth.jwt()->>'email')`.

- **Stripe-Style Environment Engine (Sandbox vs. Live):**
  - **Sandbox Mode (`environment = 'sandbox'`):**
    - Clearly highlighted with a persistent pill badge: `[ Test Environment — Visible in Container App ]`.
    - Allows agency owners to draft clinic catalogs, configure memberships, test loyalty points, and preview UI in the mobile container app without triggering billing or live Stripe transactions.
  - **Live Mode (`environment = 'production'`):**
    - Production-verified clinics with live Stripe Connect payout routing.
    - Promoted via the Store Deployment Modal upon satisfying prerequisites: uploaded logo, active treatments catalog, and linked Stripe Connect account.

---

### 2.2 Tier 2: Merchant Clinic Workspace (`beter clone`)
The Merchant Workspace is the clinic manager's day-to-day operations console, strictly scoped to a single `clinic_id`.

- **Locked Executive Analytics Grid:**
  - **Daily Processing (65% width):** High-density chart displaying gross volume, net volume, and refunds across selected date ranges (Today, Yesterday, Last 7 days, Last 30 days, Month to date, Year to date, Custom Range) with interactive comparison overlays (Previous period, Previous year).
  - **Live Activity Feed (35% width):** Real-time stream of incoming transactions, check-ins, voucher claims, and membership renewals.
  - **Executive KPI Summary Cards:**
    1. *Net Revenue:* Gross sales minus refunds and processing adjustments.
    2. *MRR (Monthly Recurring Revenue):* Active membership subscription renewals.
    3. *Revenue Sources Breakdown:* Proportional split between In-Store POS, In-App Treatments, Memberships, and Custom Plans.
    4. *Total Members:* Active subscription count with growth trajectory.
    5. *Average Client Lifetime Value (LTV):* Mean spend per registered patient.
    6. *Top Clients:* Ranked patient leaderboard with total spend and visit counts.
    7. *Top Team Members:* Ranked staff list sorted by sales volume or MRR generated.

- **Supabase Realtime Synchronization:**
  - Maintains persistent WebSocket connection via `supabase.channel('dashboard-realtime-${activeLocationId}')`.
  - Listens for `INSERT` events on `public.transactions` and updates analytical charts and transaction logs instantaneously.

- **Dynamic Location Switching:**
  - Clinic switching is handled completely in-memory through React state and `ClinicContext`.
  - Changing locations re-keys all data hooks (`useTreatments`, `useMemberships`, `useTransactions`, `useClientProfiles`, `useTeamMembers`) without triggering disruptive browser page reloads.

- **Workspace Sub-Modules:**
  - **App Builder CMS:**
    - *Products & Treatments:* Multi-pricing models (individual, 3-session bundles, tiered variations), consultation requirements, before/after galleries.
    - *VIP Memberships:* Monthly recurring pricing, commitment periods (3, 6, 12 months), included monthly treatments, exclusive perks, signup bonuses.
    - *Automated Offers & Push Campaigns:* Holiday occasions, targeted discount rules, banner artwork, optional audio voice notes.
    - *Rewards & Loyalty:* Point accrual rates, signup bonuses, review incentives, check-in rewards.
    - *Custom Plans:* Bespoke treatment plans prescribed to specific patients.
    - *Theme & Settings:* Live hex color picker, typography selection, hero images, contact info.
  - **Client CRM (`ClientProfiles.tsx`):** Patient roster, total spend, visit frequency, VIP tier, beauty bank balance, reward points, and transaction history.
  - **Transactions Ledger (`Transactions.tsx`):** Filterable, exportable record of all financial movements with status indicators (Succeeded, Refunded, Failed, Pending).
  - **Reception QR Scanner Modal:** In-clinic QR scanner for staff to verify patient check-ins and award points immediately.

---

### 2.3 Tier 3: Dual Mobile Strategy (`Patient app`)

The patient-facing mobile application utilizes a dual deployment strategy that addresses both sales enablement and luxury brand sovereignty:

```
                                  PATIENT MOBILE APP (FLUTTER)
                                                │
                       ┌────────────────────────┴────────────────────────┐
                       ▼                                                 ▼
             CONTAINER TEST SHELL                           BESPOKE FLAGSHIP APPS
       (Distributed via App/Play Store)             (Compiled via Fastlane CI/CD)
                       │                                                 │
       - "The Clinic App" generic shell              - "Lunè Luxe", "Refined Skin & Body"
       - In-Clinic QR Pairing Screen                 - Dedicated App Store Listings
       - Dynamic Location Finder                     - Hardcoded Client Brand Identity
       - Instant Over-The-Air Reskinning             - Bespoke Push Notification APNs
       - Used for Agency Sales & Testing             - Premium Tier ($100/mo Maintenance)
```

1. **Container Test Shell ("The Clinic App"):**
   - Published as a generic luxury container on the iOS App Store and Google Play Store.
   - Designed for rapid merchant onboarding and sales demonstrations.
   - When opened, patients can:
     - Scan an in-clinic acrylic QR poster (`nexcore://clinic?id={id}&slug={slug}`).
     - Select from a list of nearby clinics via geolocation or search.
   - The app dynamically downloads the clinic's JSON design tokens (`theme`), images, treatments, and memberships from Supabase PostgREST and morphs its entire UI palette and branding in memory without restarting.

2. **Bespoke Client Store Releases:**
   - For high-volume clients desiring a fully dedicated presence (e.g. Lunè Luxe, Refined Skin & Body, SLA Medical).
   - Built from the identical Flutter codebase using parameterized build flavors and Fastlane CI/CD scripts.
   - Dedicated bundle identifiers (`com.luneluxe.app`, `com.refinedskin.app`), standalone App Store listings, dedicated splash screens, and custom APNs push certificates.

---

## 3. End-to-End Real Data Flow Architecture

```
┌─────────────────┐           ┌──────────────────┐           ┌────────────────────┐
│   PATIENT APP   │           │   ADMIN PORTAL   │           │     NEXT.JS V2     │
│ (Flutter / Dart)│           │  (React / Vite)  │           │   (Growth Portal)  │
└────────┬────────┘           └────────┬─────────┘           └─────────┬──────────┘
         │                             │                               │
         │ Direct REST Queries         │ Clerk JWT Session Bridge      │ Public Lead &
         │ (Public Read RLS)           │ & Supabase Realtime           │ Demo Bookings
         ▼                             ▼                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          SUPABASE POSTGRESQL 15.6                               │
│  - 20 Relational Tables (clinics, treatments, memberships, transactions, etc.)  │
│  - Strict Multi-Tenant Row Level Security (RLS)                                 │
│  - Realtime Change Data Capture (CDC) via WebSockets                             │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
┌───────────────────────────────┐             ┌───────────────────────────────────┐
│     SUPABASE EDGE FUNCTIONS   │             │       STRIPE CONNECT ENGINE       │
│  - create-payment-intent      │────────────▶│  - Direct transfers to clinic     │
│  - create-stripe-connect-link │             │    connected account (destination)│
│  - stripe-connect-webhook     │◀────────────│  - 0% platform fee                │
└───────────────────────────────┘             │  - Apple Pay, Google Pay, Cards   │
                                              └───────────────────────────────────┘
```

### 3.1 Checkout & Payment Pipeline
1. Patient adds treatments or memberships to cart in the Flutter app.
2. At checkout, the mobile client invokes the Supabase Edge Function `create-payment-intent`:
   ```json
   {
     "clinic_id": "c2222222-2222-4222-8222-222222222222",
     "amount": 250.00,
     "currency": "gbp",
     "client_id": "client_uuid",
     "line_items": [{ "id": "treatment_uuid", "quantity": 1 }]
   }
   ```
3. **Server-Side Price Validation:** The Edge Function queries `public.treatments` using the Supabase Service Role key, calculates the authoritative catalog price, and enforces it—preventing client-side price tampering.
4. Edge Function checks `public.clinics.stripe_account_id`. If unlinked, it rejects the request with code `stripe_account_not_linked`.
5. Edge Function calls Stripe API to create a `PaymentIntent` with:
   - `transfer_data.destination = clinic.stripe_account_id`
   - `application_fee_amount = 0` (100% payout to merchant)
6. Returns `clientSecret` to mobile client.
7. Mobile client displays native Stripe Payment Sheet (or interactive checkout sheet on desktop/web).
8. Patient completes payment via Apple Pay, Google Pay, or Credit Card.
9. Stripe sends cryptographically signed webhook to `stripe-connect-webhook` Edge Function.
10. Webhook verifies signature (`constructEventAsync`), parses `payment_intent.succeeded`, and records the transaction in `public.transactions`.
11. Supabase Realtime emits `INSERT` event to `dashboard-realtime-{clinicId}`, immediately updating the Merchant Dashboard.

---

## 4. Repository & Codebase Directory Mapping

| Repository Path | Purpose | Key Entry Points |
|---|---|---|
| `admin-dashboard/beter clone` | Primary Web Admin Portal (Agency & Merchant) | `src/App.tsx`<br>`src/components/AgencyDashboard.tsx`<br>`src/components/MerchantDashboard.tsx`<br>`src/components/WhiteLabelSettings.tsx`<br>`src/hooks/useSupabaseData.ts`<br>`supabase/migrations/`<br>`supabase/functions/` |
| `admin-dashboard/nexcore V2` | Public SaaS Acquisition, SEO & Marketing | `src/app/page.tsx`<br>`src/app/regions/[country]/page.tsx`<br>`src/app/api/auth/reset-password/route.ts`<br>`src/lib/blog-data.ts` |
| `Patient app` | Native Mobile Client Container | `lib/main.dart`<br>`lib/presentation/router/app_router.dart`<br>`lib/presentation/state/clinic_provider.dart`<br>`lib/data/repositories/clinic_repository.dart`<br>`lib/core/services/stripe_payment_service.dart` |

---
*End of Master System Architecture & Topology Map.*
