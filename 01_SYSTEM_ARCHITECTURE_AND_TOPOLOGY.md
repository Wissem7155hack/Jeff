# NEXCORE B2B2C SAAS PLATFORM — SYSTEM ARCHITECTURE & TOPOLOGY AUDIT
**Document Reference:** `01_SYSTEM_ARCHITECTURE_AND_TOPOLOGY.md`  
**Classification:** Enterprise Engineering Architecture Blueprint  
**Auditor Specification:** Principal Systems Architect & Senior Full-Stack Code Auditor (25+ Years Enterprise Systems Experience)  
**System Target:** Nexcore Aesthetic B2B2C Ecosystem (Admin SPA + Mobile Client Container + Supabase Backend)  
**Audit Date:** November 2026  

---

## 1. Executive System Topology & 3-Tier Enterprise Structure

The Nexcore platform is an enterprise-grade, multi-tenant B2B2C Software-as-a-Service (SaaS) ecosystem tailored for luxury aesthetic medicine, medical spas, and high-ticket cosmetic dermatology practices. The platform architecture solves the critical 6–8 week patient post-treatment retention drop-off and captures after-hours sales through custom-branded mobile applications coordinated by a centralized administrative console.

```
+─────────────────────────────────────────────────────────────────────────────────────────+
|                               TIER 1: AGENCY SUPER-PORTAL                               |
|  - Custom Domain CNAME Resolution     - Dynamic Whitelabel Theming (CSS Vars & Logos)   |
|  - Multi-Agency Merchant Isolation    - Stripe-Style Sandbox vs Live Environment Engine |
+─────────────────────────────────────────────────────────────────────────────────────────+
                                             │
                                             ▼
+─────────────────────────────────────────────────────────────────────────────────────────+
|                        TIER 2: MERCHANT CLINIC WORKSPACE (LOCKED GRID)                  |
|  - Daily Processing (65%) & Live Activity (35%) - Supabase Realtime WebSocket Streaming  |
|  - App Builder CMS & Custom Plans Prescriptions - Dynamic In-Memory Location Switching  |
|  - Net Revenue, MRR, Sources, Members, LTV      - Client Profiles CRM & Staff Attribution|
+─────────────────────────────────────────────────────────────────────────────────────────+
                    │                                        │
                    │ (Supabase PostgREST 12 / Realtime WSS) │ (Storage v2 CDN / Edge Functions)
                    ▼                                        ▼
+─────────────────────────────────────────────────────────────────────────────────────────+
|                          TIER 3: DUAL PATIENT MOBILE STRATEGY                           |
|  ┌──────────────────────────────────────────┐ ┌───────────────────────────────────────┐ |
|  │          CONTAINER TEST SHELL            │ │      BESPOKE CLIENT STORE BUILDS      │ |
|  │  - Universal App Store distribution      │ │  - Dedicated App Store & Google Play  │ |
|  │  - In-clinic QR pairing & location finder│ │  - Parameter-driven Fastlane CI/CD    │ |
|  │  - Realtime over-the-air theme morphing  │ │  - Dedicated push APNs certificates   │ |
|  └──────────────────────────────────────────┘ └───────────────────────────────────────┘ |
+─────────────────────────────────────────────────────────────────────────────────────────+
```

### 1.1 Architectural Tiers & Isolation Boundaries

1. **Tier 1 (Agency Super-Portal — Root Scope):**
   - **Scope:** Operates across agency accounts and their associated clinic sub-accounts.
   - **Data Governance:** Governs agency multi-tenancy via `public.agencies` and clinic associations via `public.clinics.agency_id`.
   - **Dynamic Domain Resolution:** Reads `window.location.hostname` to query `public.agencies.custom_domain` (e.g. `portal.getdemor.com`), dynamically injecting brand logo, name, and `--brand-primary` CSS tokens at runtime.
   - **Environment Engine:** Stripe-style toggle switching between **Sandbox Mode** (test clinics visible in container app) and **Live Mode** (production-verified clinics with live Stripe Connect payout routing).

2. **Tier 2 (Merchant Clinic Workspaces — Tenant Level):**
   - **Scope:** Sandboxed operational domain bound to a unique `clinic_id` (UUID v4).
   - **Preserved Executive Grid:** Daily Processing (65%) and Live Activity (35%), paired with KPI summary metrics (Net Revenue, MRR, Revenue Sources Breakdown, Total Members, Client LTV, Top Clients, Top Team Members).
   - **Real-Time Data Streaming:** Persistent Supabase WebSocket channel (`dashboard-realtime-{clinicId}`) streaming incoming transactions and check-ins.
   - **In-Memory Location Switching:** Managed via `Sidebar.tsx` and `TopNavbar.tsx`. Selecting a clinic re-keys all downstream React hooks (`useTreatments`, `useMemberships`, `useTransactions`, `useClientProfiles`, `useTeamMembers`) without page reloads.

3. **Tier 3 (Dual Mobile Strategy — Client Consumer Level):**
   - **Container Test Shell:** "The Clinic App" distributed on iOS App Store and Google Play for demos, dynamically morphing color palettes, typography, and catalogs upon QR pairing (`nexcore://clinic?id={id}&slug={slug}`) or location discovery.
   - **Bespoke Client Releases:** Parameter-driven Fastlane CI/CD builds for verified flagship clients (e.g., Lunè Luxe, Refined Skin & Body) with dedicated store presence and isolated push certificates.

---

## 2. Runtime Brand Re-Theming & Dynamic Design Token Pipeline

The dynamic re-theming pipeline allows a single software instance to assume the bespoke visual identity of any aesthetic clinic in real time.

```
                                  RE-THEMING PIPELINE
                                  
 [ Database: public.clinics ]
           │
           │  JSONB: theme payload
           │  { "primaryColor": "#111111", "accentColor": "#C5A880", ... }
           ▼
 ┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
 │          ADMIN DASHBOARD SPA         │       │          FLUTTER MOBILE CONTAINER    │
 ├──────────────────────────────────────┤       ├──────────────────────────────────────┤
 │ 1. useClinics() fetches theme JSONB  │       │ 1. activeClinicProvider fetches      │
 │ 2. LocalStorage sync:                │       │ 2. ClinicThemeModel.fromJson()       │
 │    'nexcore_active_clinic'           │       │ 3. ClinicThemeExtension in ThemeData │
 │ 3. DOM CSS Variable Injection:       │       │ 4. context.clinicTheme accessor      │
 │    --primary-color, --accent-color   │       │ 5. Dynamic GoogleFonts binding       │
 └──────────────────────────────────────┘       └──────────────────────────────────────┘
```

### 2.1 Admin Dashboard Dynamic CSS Variable Injection

In the Admin Dashboard SPA, brand colors are managed in `src/components/AppBuilder/SettingsTab.tsx` and propagated globally:

1. **Storage Format:** The `theme` column in `public.clinics` stores an 8-key JSONB dictionary:
   ```json
   {
     "primaryColor": "#111111",
     "secondaryColor": "#222222",
     "accentColor": "#C5A880",
     "backgroundColor": "#FBFBFA",
     "surfaceColor": "#FFFFFF",
     "borderColor": "#E5E5E1",
     "textPrimary": "#111111",
     "textSecondary": "#767676"
   }
   ```
2. **Runtime Application:**
   - The selected merchant is stored in React state (`currentMerchant` in `src/App.tsx`).
   - The primary brand color (`brandColor` or `color`) is passed downstream.
   - Components dynamically calculate tailwind background and text utility styles or inject inline styles: `style={{ backgroundColor: color }}`.
   - Dynamic CSS variable synchronization is mounted onto `document.documentElement`:
     ```typescript
     document.documentElement.style.setProperty('--brand-primary', theme.primaryColor);
     document.documentElement.style.setProperty('--brand-accent', theme.accentColor);
     ```

### 2.2 Flutter Mobile Container Dynamic Theme Engine

In the mobile client (`Patient app/lib/`), re-theming is executed at the widget tree root using Flutter's `ThemeExtension` pattern:

1. **Model Representation (`lib/data/models/clinic_theme_model.dart`):**
   - Deserializes raw JSON from `public.clinics.theme` into typed 32-bit ARGB `Color` primitives.
   - Supports 6-digit hex (`#RRGGBB`), 8-digit hex (`#AARRGGBB`), and safe fallbacks to prevent crash loops on invalid database values.
2. **Riverpod Theme Orchestration (`lib/core/theme/app_theme.dart` & `lib/presentation/state/clinic_provider.dart`):**
   - `activeClinicProvider` holds the current `AsyncValue<ClinicModel>`.
   - `activeThemeProvider` transforms the clinic's `ClinicThemeModel` into a complete `ThemeData` instance containing `ClinicThemeExtension`.
3. **Widget Consumption:**
   - Any widget in the tree accesses active tokens via the extension getter:
     ```dart
     final theme = context.clinicTheme;
     // theme.primary, theme.accent, theme.surface, theme.background
     ```
   - Typography dynamically resolves via `google_fonts` (e.g., `GoogleFonts.cormorantGaramond` for luxury titles and `HK Grotesk` / `Inter` for body copy).
4. **Over-The-Air Switching:**
   - Scanning a new clinic QR code invokes `activeClinicProvider.notifier.switchClinic(newClinicId)`.
   - The new clinic record is fetched from Supabase, persisted to `SharedPreferences` via `AppPersistenceService`, and the entire widget tree invalidates and repaints in the new brand palette within a single frame (16.6ms at 60fps).

---

## 3. Frontend Core Stack Architecture (Admin Dashboard SPA)

The administrative web console is structured as a desktop-first Single Page Application (SPA) designed for zero-latency operational workflows.

### 3.1 Technology Stack Specifications

| Layer | Framework / Library | Version | Role in Architecture |
|---|---|---|---|
| **Runtime Environment** | React | `19.2.6` (Core) / `18.3` compat | Component lifecycle, hooks, and virtual DOM reconciler |
| **Language System** | TypeScript | `5.9.3` / `5.5` | Strict static typing, schema contracts, and interface guards |
| **Bundler & Build Tool**| Vite | `7.3.6` | Hot Module Replacement (HMR) and production ESBuild bundling |
| **CSS Framework** | Tailwind CSS | `4.1.17` with `@tailwindcss/vite` | Utility-first styling engine and design token synthesis |
| **Data Visualization** | Recharts | `3.10.1` | SVG area charts, cubic spline curves, and financial graphs |
| **Iconography** | Lucide React | `1.42.0` | High-precision vector SVG UI symbols |
| **Drag and Drop** | @hello-pangea/dnd | `18.0.1` | Drag-and-drop membership tier reordering |
| **QR Code Engine** | qrcode.react & @zxing/browser | `4.2.0` / `0.2.1` | Counter poster QR rendering and webcam video stream decoding |
| **Backend Integration** | @supabase/supabase-js | `2.116.0` | PostgREST querying, Auth PKCE flow, and Storage uploads |

### 3.2 Source Tree Layout Analysis

```
admin-dashboard/beter clone/
├── index.html                           # SPA entry HTML, Google Fonts preconnect (Inter, Plus Jakarta Sans)
├── package.json                         # Dependencies, scripts (dev, build, preview)
├── vite.config.js                       # Vite plugins: @vitejs/plugin-react, @tailwindcss/vite
├── src/
│   ├── main.tsx                         # DOM Root bootstrap, React.StrictMode mount
│   ├── App.tsx                          # Root layout, state routing controller, global modals
│   ├── index.css                        # Tailwind v4 import, font smoothing, custom scrollbars
│   ├── types.ts                         # System interfaces (Merchant, Product, CustomPlan, TeamMember)
│   ├── assets/                          # Static brand images, avatars, and lockscreen backgrounds
│   ├── components/
│   │   ├── Sidebar.tsx                  # Obsidian dark sidebar (#0B0D13), tenant picker, navigation
│   │   ├── TopNavbar.tsx                # Sticky white header, clinic greeting, Scan QR CTA
│   │   ├── AgencyDashboard.tsx          # Multi-tenant clinic management grid and global KPI summary
│   │   ├── MerchantDashboard.tsx        # Tenant financial analytics, spline curves, activity feed
│   │   ├── ShopSummary.tsx              # E-commerce KPIs (AOV, Total Sales), transaction table
│   │   ├── MembershipsOverview.tsx      # Membership signups graph and credit card dunning alerts
│   │   ├── ClientProfiles.tsx           # Patient CRM table, search, filters, and detail drawer
│   │   ├── UserSettings.tsx             # Staff roster CRUD, GDPR cookie audit, and notifications
│   │   ├── WhiteLabelSettings.tsx       # Agency domain and custom support link configuration
│   │   ├── ReceptionScannerModal.tsx    # Webcam QR scanner calling process_patient_checkin RPC
│   │   ├── ClinicPosterModal.tsx        # Printable counter poster generator with SVG export
│   │   ├── CookieConsentBanner.tsx      # GDPR & ePrivacy compliant cookie banner
│   │   ├── PrivacySettingsModal.tsx     # Granular consent categories preference modal
│   │   ├── SessionTimeoutModal.tsx      # Idle session warning modal with countdown
│   │   ├── EmptyState.tsx               # Reusable luxury zero-data state illustration
│   │   └── AppBuilder/
│   │       ├── AppBuilder.tsx           # App Builder sub-navigation container (5 tabs)
│   │       ├── ProductsTab.tsx          # Treatment catalog CRUD, pricing tiers, client results
│   │       ├── OffersTab.tsx            # 9 holiday campaigns, active toggles, flash offer creator
│   │       ├── AppBuilderMembership.tsx # Multi-tier plans, drag-and-drop, phone preview
│   │       ├── CreateMembershipSheet.tsx# Slide-over membership composer with bonus tiers
│   │       ├── RewardsTab.tsx           # 5 points slider controls with 500ms auto-sync
│   │       ├── CustomPlansTab.tsx       # Bespoke treatment bundle prescriber
│   │       └── SettingsTab.tsx          # App icon, brand colors, and blog article publisher
│   ├── hooks/
│   │   ├── useSupabaseData.ts           # Central data layer: 9 custom hooks bound to Supabase
│   │   ├── useEncryptedRouting.ts       # Cryptographic URL obfuscation and deep linking hook
│   │   ├── useSessionManager.ts         # Inactivity tracking, warning modal, auto-logout
│   │   └── useCookieConsent.ts          # GDPR consent state machine and persistence
│   ├── lib/
│   │   ├── supabaseClient.ts            # Supabase client singleton, PKCE auth, storage helper
│   │   ├── cookieConsent.ts             # Cookie getter/setter with SameSite=Lax and Secure flags
│   │   ├── cryptoUtils.ts               # SHA-256 hashing and client device fingerprinting
│   │   └── sessionManager.ts            # Local storage session token management
│   └── utils/
│       └── urlCrypt.ts                  # AES-GCM 256-bit encryption for URL state parameters
```

### 3.3 Cryptographically Encrypted URL Routing State

The Admin Dashboard does not use standard path routing (e.g., React Router DOM). Instead, it implements a custom encrypted state routing system (`useEncryptedRouting.ts` and `urlCrypt.ts`):
- **Mechanism:** Active views (`agency`, `merchant`, `app_builder`), sub-tabs, and selected `clinic_id` are serialized into a JSON envelope:
  ```typescript
  interface RouteStateEnvelope {
    view: View;
    tab?: AppBuilderTab;
    merchantId?: string;
    modal?: string;
    timestamp: number;
  }
  ```
- **Cryptographic Cipher:** Encrypted in-browser using **AES-GCM 256-bit** via the W3C Web Crypto API (`crypto.subtle`).
- **Encoding:** Output is formatted as URL-safe Base64 without padding and appended as a URL hash fragment (`/#token=...`).
- **Critical Failure Mode:** If `VITE_APP_ENCRYPTION_KEY` is not supplied via environment variables, the system falls back to a hardcoded string `nexcore_dev_secret_key_32_bytes_len_secure_default!!` located in client-side code, allowing trivial token decryption and tampering.

---

## 4. Mobile Container Architecture (Flutter Patient App)

The mobile client is engineered as a multi-tenant client container compiled with Flutter 3.x and Dart 3.x.

```
                                  FLUTTER CONTAINER ARCHITECTURE
                                  
                                    [ main.dart ]
                                          │
                                 Pre-Hydrates Disk State
                                          │
                            [ ProviderScope (Riverpod) ]
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
         [ activeClinicProvider ]                     [ sessionProvider ]
                    │                                           │
         [ activeThemeProvider ]                      [ routerProvider (GoRouter) ]
                    │                                           │
                    ▼                                           ▼
         [ ClinicThemeExtension ]                     [ StatefulShellRoute ]
                                                      (5 Persistent Bottom Tabs)
                                                      ├── / (Home)
                                                      ├── /shop (Catalog & Concerns)
                                                      ├── /scan (VIP Pass & Counter Scanner)
                                                      ├── /rewards (Wallet & Vouchers)
                                                      └── /profile (Settings & History)
```

### 4.1 Dependency & Package Matrix (`pubspec.yaml`)

- **State Management:** `flutter_riverpod: ^3.4.3` — Declarative, compile-time safe state container.
- **Routing Engine:** `go_router: ^18.0.1` — Declarative URI-based router supporting `StatefulShellRoute.indexedStack`.
- **Backend SDK:** `supabase_flutter: ^2.8.0` — Handles PostgREST queries, auth state, and real-time WebSockets.
- **Camera & Scanning:** `mobile_scanner: ^7.4.0` (counter poster scan) and `qr_flutter: ^4.1.0` (client VIP pass rendering).
- **Hardware Integration:** `screen_brightness: ^2.1.11` — Ramps display brightness to 100% on VIP pass display.
- **Local Persistence:** `shared_preferences: ^2.3.2` via `AppPersistenceService`.
- **Image Caching & Shimmer:** `cached_network_image: ^4.0.0` and `shimmer: ^4.0.0`.

### 4.2 State Orchestration Layer

The mobile container utilizes 7 primary Riverpod state providers:
1. `activeClinicProvider`: Resolves active clinic record from Supabase or disk cache. Handles over-the-air switching.
2. `activeThemeProvider`: Derives `ThemeData` and `ClinicThemeExtension` from active clinic tokens.
3. `sessionProvider`: Governs patient auth lifecycle (`SessionSnapshot`: `SessionLoading`, `SessionAbsent`, `SessionPresent`).
4. `walletProvider`: Manages loyalty point balance, Beauty Bank cash ledger, and countdown timers on vouchers.
5. `basketProvider`: Manages treatment cart items, item quantities, total calculation, and VIP discount eligibility.
6. `offersProvider`: Queries `public.offers` for active seasonal and automated holiday campaigns.
7. `recentlyViewedProvider`: Stores treatment view history locally, automatically recording page visits.

---

## 5. Data Flow & Edge Compute Layer

### 5.1 Supabase Backend Topology

Nexcore relies on a hosted Supabase infrastructure (`https://jndcmymcnivessmvzpzc.supabase.co`):
- **Database:** PostgreSQL 15.6 with extensions `uuid-ossp`, `pgcrypto`.
- **API Engine:** PostgREST 12 automatically generating RESTful endpoints from schema tables.
- **Realtime Service:** Phoenix Channels over WebSockets handling live mutations on `public.offers`, `public.transactions`, and `public.client_profiles`.
- **Storage Service:** Storage v2 with 6 global CDN buckets.

```
+-----------------------------------------------------------------------------------------+
|                                SUPABASE CLOUD PLATFORM                                  |
|                                                                                         |
|  [ PostgREST 12 API Engine ]         [ Phoenix Channels (Realtime WSS) ]                |
|               │                                       │                                 |
|               ▼                                       ▼                                 |
|  +───────────────────────────────────────────────────────────────────────────────────+  |
|  |                           POSTGRESQL 15.6 DATABASE                                |  |
|  |  - clinics                - treatments             - offers                       |  |
|  |  - memberships            - loyalty_programs       - custom_plans                 |  |
|  |  - team_members           - client_profiles        - transactions                 |  |
|  |  - articles               - vouchers               - clinic_checkins              |  |
|  |  - user_interactions      - user_cookie_consents   - user_sessions                |  |
|  +───────────────────────────────────────────────────────────────────────────────────+  |
|                                       │                                                 |
|                                       ▼                                                 |
|  +───────────────────────────────────────────────────────────────────────────────────+  |
|  |                                STORAGE V2 BUCKETS                                 |  |
|  |  - merchant-assets        - offer-media            - treatment-media              |  |
|  |  - membership-media       - team-and-blog          - clinic-assets                |  |
|  +───────────────────────────────────────────────────────────────────────────────────+  |
+-----------------------------------------------------------------------------------------+
```

### 5.2 Storage CDN Distribution Matrix

| Bucket Identifier | Purpose | Permitted MIME Types | Path Structure Pattern |
|---|---|---|---|
| `merchant-assets` | Agency & Clinic Brand Identity | `image/png`, `image/webp`, `image/svg+xml`, `image/jpeg` | `/{clinic_id}/logo.webp` |
| `offer-media` | Automated Campaign & Flash Banners | `image/webp`, `image/png`, `image/jpeg` | `/automated/{campaign_name}.webp` |
| `treatment-media`| Clinical Procedure Photography | `image/webp`, `image/jpeg`, `image/png` | `/{clinic_id}/{treatment_slug}/hero.webp` |
| `membership-media`| VIP Membership Imagery & Results | `image/webp`, `image/jpeg` | `/tiers/{timestamp}_{hash}.ext` |
| `team-and-blog` | Staff Avatars & Blog Post Covers | `image/webp`, `image/jpeg`, `image/png` | `/avatars/{timestamp}_{hash}.ext` |
| `clinic-assets` | General Uploads & Fallbacks | Any image MIME | `/{folder}/{timestamp}_{hash}.ext` |

### 5.3 Serverless Compute & Third-Party Integration Protocol

1. **Google Calendar 2-Way Booking Bridge:**
   - Designed to circumvent walled-garden aesthetic EMRs (Jane App, Boulevard, Phorest, Fresha).
   - Practitioners link work calendars via Google Calendar OAuth 2.0.
   - EMR appointment creations push "Busy" blocks to Google Calendar.
   - Nexcore consumes Google Calendar `FreeBusy` API to compute open booking availability.
   - When a patient books inside the app, Nexcore writes an event to Google Calendar, triggering downstream EMR schedule reservation.
2. **Stripe Connect Split Payouts:**
   - Designed for multi-tenant split payments between agency platform fees and clinic merchant accounts.
   - Configured to execute through Supabase Deno Edge Functions (`create-stripe-account-link`).

---
*End of Document 01 — System Architecture & Topology Audit.*
