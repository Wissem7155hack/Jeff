# NEXCORE PLATFORM — DATABASE SCHEMA & SECURITY AUDIT STATUS
**Document Reference:** `DATABASE_AND_SECURITY_STATUS.md`  
**Classification:** Enterprise Security Audit, Database Integrity & Remediation Ledger  
**Production Status:** Production Hardened (November 2026)  
**Database Target:** Supabase PostgreSQL 15.6, PostgREST 12, Storage v2, Deno Edge Runtime  

---

## 1. Relational Database Schema Matrix

The active production schema spans **20 core tables** enforcing strict multi-tenant isolation, referential integrity, and cascading deletions.

```
                                          ┌────────────────────────┐
                                          │    public.agencies     │
                                          └───────────┬────────────┘
                                                      │ (1:N)
                                                      ▼
                                          ┌────────────────────────┐
                                          │     public.clinics     │
                                          └───────────┬────────────┘
                                                      │ (1:N)
          ┌──────────────────┬─────────────────┬──────┴──────────┬──────────────────┬───────────────┐
          │                  │                 │                 │                  │               │
          ▼                  ▼                 ▼                 ▼                  ▼               ▼
┌─────────────────┐ ┌───────────────┐ ┌───────────────┐ ┌────────────────┐ ┌───────────────┐ ┌───────────────┐
│   treatments    │ │  memberships  │ │    offers     │ │loyalty_programs│ │ custom_plans  │ │ team_members  │
└────────┬────────┘ └───────────────┘ └───────────────┘ └────────────────┘ └───────┬───────┘ └───────────────┘
         │                                                                         │
         │ (treatment_id)                                                          │ (client_id)
         ▼                                                                         ▼
┌─────────────────┐                                                       ┌─────────────────┐
│user_interactions│                                                       │ client_profiles │
└────────┬────────┘                                                       └────────┬────────┘
         │                                                                         │
         │ (client_id)                                                             │ (client_id)
         └──────────────────────────────────────┬──────────────────────────────────┘
                                                │
                                                ▼
         ┌──────────────────┬───────────────────┴─────────────────┬──────────────────┐
         ▼                  ▼                                     ▼                  ▼
┌─────────────────┐ ┌─────────────────┐                  ┌─────────────────┐ ┌─────────────────┐
│  transactions   │ │ clinic_checkins │                  │ client_vouchers │ │ client_reviews  │
└─────────────────┘ └─────────────────┘                  └─────────────────┘ └─────────────────┘
```

### 1.1 Complete Entity Specifications

| Table | Primary Key | Foreign Keys & Isolation Anchor | Core Attributes & Enums | Purpose |
|---|---|---|---|---|
| `public.agencies` | `id UUID` | None (Top-Level Agency Anchor) | `name TEXT`, `slug TEXT UNIQUE`, `owner_email TEXT`, `logo_url TEXT`, `brand_color TEXT`, `custom_domain TEXT UNIQUE`, `stripe_customer_id TEXT`, `subscription_status TEXT` | Agency Super-Portal identity, custom domain mapping, and multi-agency isolation. |
| `public.clinics` | `id UUID` | `agency_id -> agencies(id)` | `slug TEXT UNIQUE`, `name TEXT`, `full_name TEXT`, `tagline TEXT`, `address TEXT`, `hero_image TEXT`, `logo TEXT`, `theme JSONB`, `currency_code TEXT`, `stripe_account_id TEXT`, `environment TEXT ('sandbox'\|'production')`, `verification_status TEXT ('pending'\|'verified'\|'rejected')`, `is_active BOOLEAN` | Clinic tenant identity, visual design tokens, currency, and Stripe Connect routing. |
| `public.treatments` | `id UUID` | `clinic_id -> clinics(id)` | `name VARCHAR`, `slug VARCHAR`, `category VARCHAR`, `price NUMERIC(10,2)`, `duration VARCHAR`, `description TEXT`, `image VARCHAR`, `pricing_type TEXT`, `pricing_data JSONB`, `before_instructions TEXT`, `after_instructions TEXT`, `is_hidden BOOLEAN`, `sort_order INT` | Clinic product and treatment catalog with bundle/variation pricing data. |
| `public.memberships` | `id UUID` | `clinic_id -> clinics(id)` | `tier_name VARCHAR`, `title VARCHAR`, `monthly_price NUMERIC(10,2)`, `commitment_months INT`, `commitment_enabled BOOLEAN`, `benefits TEXT[]`, `perks TEXT[]`, `bonuses JSONB`, `image_url TEXT`, `is_active BOOLEAN`, `hide_from_shop BOOLEAN`, `sort_order INT` | VIP membership subscriptions, dunning rules, and recurring client perks. |
| `public.loyalty_programs` | `id UUID` | `clinic_id -> clinics(id)` | `sign_up_reward INT`, `referral_reward INT`, `google_review_reward INT`, `check_in_reward INT`, `purchase_reward_per_dollar NUMERIC(5,2)`, `is_active BOOLEAN` | Gamification point allocation rules and reward tier multipliers. |
| `public.offers` | `id UUID` | `clinic_id -> clinics(id)` | `type TEXT ('automated'\|'one_time')`, `occasion TEXT`, `title TEXT`, `subtitle TEXT`, `date_window TEXT`, `banner_image_url TEXT`, `discount_type TEXT`, `discount_value NUMERIC`, `is_active BOOLEAN`, `target_products JSONB`, `audio_url TEXT` | Automated holiday campaigns and flash promotional banners. |
| `public.custom_plans` | `id UUID` | `clinic_id -> clinics(id)`<br>`client_id -> client_profiles(id)` | `name TEXT`, `status TEXT ('Available'\|'Purchased'\|'Removed')`, `price NUMERIC(10,2)`, `treatments_count INT`, `items JSONB`, `expires_at TIMESTAMPTZ` | Bespoke practitioner-prescribed treatment regimens for individual patients. |
| `public.team_members` | `id UUID` | `clinic_id -> clinics(id)` | `first_name TEXT`, `last_name TEXT`, `aka_name TEXT`, `job_title TEXT`, `biography TEXT`, `avatar_url TEXT`, `is_active BOOLEAN`, `sort_order INT` | Clinical practitioners, aesthetic injectors, and staff sales attribution. |
| `public.client_profiles` | `id UUID` | `clinic_id -> clinics(id)` | `first_name TEXT`, `last_name TEXT`, `name TEXT`, `email TEXT`, `phone TEXT`, `avatar_url TEXT`, `total_spend NUMERIC(10,2)`, `visits INT`, `beauty_bank_balance NUMERIC(10,2)`, `reward_points INT`, `membership_tier TEXT`, `membership_status TEXT`, `last_visit TIMESTAMPTZ` | Patient CRM, lifetime value ledger, VIP status, and loyalty balances. |
| `public.transactions` | `id UUID` | `clinic_id -> clinics(id)`<br>`client_id -> client_profiles(id)` | `stripe_payment_intent_id TEXT`, `amount NUMERIC(10,2)`, `currency VARCHAR`, `payment_method_type TEXT`, `payment_status TEXT`, `type TEXT`, `metadata JSONB`, `created_at TIMESTAMPTZ` | Immutable financial ledger of all orders, treatments, and subscription charges. |
| `public.clinic_checkins` | `id UUID` | `clinic_id -> clinics(id)`<br>`client_id -> client_profiles(id)` | `checked_in_at TIMESTAMPTZ`, `points_awarded INT` | In-clinic QR scan check-in records and automated loyalty distribution. |
| `public.user_interactions` | `id UUID` | `clinic_id -> clinics(id)`<br>`client_id -> client_profiles(id)`<br>`treatment_id -> treatments(id)` | `interaction_type TEXT ('view'\|'cart_add'\|'purchase')`, `weight INT`, `created_at TIMESTAMPTZ` | Behavioral analytics tracking feeding the dynamic recommendation engine. |
| `public.articles` | `id UUID` | `clinic_id -> clinics(id)` | `slug TEXT`, `title TEXT`, `snippet TEXT`, `body TEXT`, `image TEXT`, `author TEXT`, `created_at TIMESTAMPTZ` | Clinic educational blog posts, aftercare guides, and skincare advice. |
| `public.vouchers` | `id UUID` | `clinic_id -> clinics(id)` | `code TEXT`, `discount_amount NUMERIC`, `points_required INT`, `expiry_days INT`, `status TEXT ('active'\|'disabled')` | Catalog of unlockable reward vouchers exchangeable for points. |
| `public.client_vouchers` | `id UUID` | `client_id -> client_profiles(id)`<br>`voucher_id -> vouchers(id)` | `is_redeemed BOOLEAN`, `redeemed_at TIMESTAMPTZ`, `created_at TIMESTAMPTZ` | Ledger of vouchers issued to and redeemed by patients. |
| `public.packages` | `id UUID` | `clinic_id -> clinics(id)`<br>`treatment_id -> treatments(id)` | `name TEXT`, `session_count INT`, `bundle_price NUMERIC(10,2)`, `savings_percentage NUMERIC`, `is_active BOOLEAN` | Pre-purchased treatment series and multi-session clinical packages. |
| `public.client_reviews` | `id UUID` | `merchant_id -> clinics(id)`<br>`client_id -> client_profiles(id)` | `status TEXT ('not_started'\|'clicked_redirect'\|'pending_verification'\|'verified'\|'declined')`, `reward_claimed BOOLEAN`, `points_awarded INT`, `verified_at TIMESTAMPTZ` | Google review verification pipeline and patient review point distribution. |
| `public.device_tokens` | `id UUID` | `client_id -> client_profiles(id)` | `token TEXT UNIQUE`, `platform TEXT ('ios'\|'android')`, `updated_at TIMESTAMPTZ` | Push notification device token registry for FCM/APNs messaging. |
| `public.user_cookie_consents` | `id UUID` | `user_id -> auth.users(id)` | `consent_uuid TEXT`, `necessary BOOLEAN`, `analytics BOOLEAN`, `marketing BOOLEAN`, `ip_address TEXT`, `user_agent TEXT`, `consented_at TIMESTAMPTZ` | GDPR and ePrivacy directive consent tracking ledger. |
| `public.user_sessions` | `id UUID` | `user_id -> auth.users(id)` | `session_token_hash TEXT`, `ip_hash TEXT`, `device_type TEXT`, `expires_at TIMESTAMPTZ`, `is_revoked BOOLEAN` | Active administrative session security and token revocation tracking. |

---

## 2. Cloudflare Audit Findings & Remediation Ledger

The enterprise security audit conducted under Cloudflare Application Security Standards identified 10 findings (`FING-01` through `FING-10`). All 10 have been **100% remediated, verified, and locked in production code**.

```
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
|                                    AUDIT REMEDIATION LEDGER                                             |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
| FINDING ID | SEVERITY | STATUS     | TARGET COMPONENT               | REMEDIATION IMPLEMENTATION        |
|------------|----------|------------|--------------------------------|-----------------------------------|
| FING-01    | CRITICAL | REMEDIATED | Next.js API (nexcore V2)       | Route disabled with 410 Gone      |
| FING-02    | CRITICAL | REMEDIATED | public.client_profiles RLS     | Locked to auth.uid() & clinic staff|
| FING-03    | CRITICAL | REMEDIATED | create-stripe-connect-link     | Strict authorization header check |
| FING-04    | CRITICAL | REMEDIATED | stripe-connect-webhook         | Fail-closed on missing webhook sec|
| FING-05    | HIGH     | REMEDIATED | Catalog & Content RLS          | Multi-tenant scoping on all tables|
| FING-06    | HIGH     | REMEDIATED | create-payment-intent          | Server-side DB price validation   |
| FING-07    | HIGH     | REMEDIATED | Frontend .env files            | Live secret keys purged from repo  |
| FING-08    | HIGH     | REMEDIATED | public.custom_plans RLS        | Locked to client_id & clinic staff|
| FING-09    | MEDIUM   | REMEDIATED | Stripe OAuth Return Flow       | Cryptographic state CSRF check     |
| FING-10    | LOW      | REMEDIATED | Google Reviews Service (Mobile)| Strict https/http URI validation   |
+─────────────────────────────────────────────────────────────────────────────────────────────────────────+
```

### 2.1 Detailed Remediation Verification

#### FING-01: Pre-Auth Remote Account Takeover via Unauthenticated Password Reset
- **Original Vulnerability:** Public API route `/api/auth/reset-password` accepted arbitrary email and new password, mutating Clerk passwords directly without verification.
- **Remediation File:** [`nexcore V2/src/app/api/auth/reset-password/route.ts`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/nexcore%20V2/src/app/api/auth/reset-password/route.ts)
- **Status:** **REMEDIATED.** The endpoint is permanently disabled and returns HTTP `410 Gone`. Password resets are handled strictly client-side by Clerk's email challenge verification.

#### FING-02: Global Patient Health & PII Database Exposure via Permissive RLS
- **Original Vulnerability:** Overly permissive `USING (true)` policy allowed anonymous visitors to query all patient names, emails, phones, and spend history.
- **Remediation Migration:** [`20261026000000_p0_security_lockdown.sql`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/migrations/20261026000000_p0_security_lockdown.sql)
- **Status:** **REMEDIATED.** Permissive anonymous policies dropped. Patients can strictly read their own profile (`auth.uid() = id`). Staff can strictly view patients where `clinic_id` matches their verified JWT claim.

#### FING-03: Unauthenticated Remote Hijacking of Clinic Stripe Connect Accounts
- **Original Vulnerability:** Edge function `create-stripe-connect-link` lacked authentication, allowing unauthorized users to generate Stripe Express dashboard logins.
- **Remediation File:** [`supabase/functions/create-stripe-connect-link/index.ts`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/functions/create-stripe-connect-link/index.ts)
- **Status:** **REMEDIATED.** Function requires valid `Authorization` header and rejects unauthenticated callers with HTTP 401.

#### FING-04: Cryptographic Webhook Signature Bypass on Unset Secret
- **Original Vulnerability:** If `STRIPE_CONNECT_WEBHOOK_SECRET` was omitted from environment variables, verification was bypassed.
- **Remediation File:** [`supabase/functions/stripe-connect-webhook/index.ts`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/functions/stripe-connect-webhook/index.ts)
- **Status:** **REMEDIATED.** Function fails closed immediately if `STRIPE_CONNECT_WEBHOOK_SECRET` is unset, returning HTTP 500 without parsing payload.

#### FING-05: Cross-Tenant Insecure Direct Object Reference (IDOR) on Mutations
- **Original Vulnerability:** Permissive RLS policies on `treatments`, `memberships`, `articles`, and `packages` allowed any authenticated staff to modify entities across other clinics.
- **Remediation Migration:** [`20261026000000_p0_security_lockdown.sql`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/migrations/20261026000000_p0_security_lockdown.sql)
- **Status:** **REMEDIATED.** Strict tenant check installed: `clinic_id::text = (auth.jwt()->'app_metadata'->>'clinic_id') OR (auth.jwt()->'app_metadata'->>'role') = 'super_admin'`.

#### FING-06: Client-Controllable Payment Amount Tampering in Checkout
- **Original Vulnerability:** Checkout function accepted arbitrary `amount` from client request body.
- **Remediation File:** [`supabase/functions/create-payment-intent/index.ts`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/functions/create-payment-intent/index.ts)
- **Status:** **REMEDIATED.** Server-side price calculation queries `public.treatments` using the service role key and overrides client-supplied amounts.

#### FING-07: Live Clerk and Stripe Secret Keys Stored in Frontend `.env` Files
- **Original Vulnerability:** Production secret keys (`sk_live_...`, `CLERK_SECRET_KEY`) were present in frontend repository files.
- **Remediation Action:** Live keys purged from all client repository files; replaced with public publishable keys (`VITE_CLERK_PUBLISHABLE_KEY`, `VITE_SUPABASE_ANON_KEY`). Production secrets reside exclusively in Supabase Vault and Vercel Environment Variables.
- **Status:** **REMEDIATED.**

#### FING-08: Unauthenticated Leakage of Personalized Patient Custom Treatment Plans
- **Original Vulnerability:** `public.custom_plans` was accessible via public read policies.
- **Remediation Migration:** [`20261026000000_p0_security_lockdown.sql`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/supabase/migrations/20261026000000_p0_security_lockdown.sql)
- **Status:** **REMEDIATED.** RLS restricts reads strictly to `client_id = auth.uid()` or authorized clinic staff.

#### FING-09: Missing CSRF State Verification in Stripe Connect OAuth Return
- **Original Vulnerability:** Return URL accepted `account_id` without verifying OAuth state token.
- **Remediation File:** [`src/components/UserSettings.tsx`](file:///c:/Users/ASUS/Desktop/Nexcore%20app%20build/admin-dashboard/beter%20clone/src/components/UserSettings.tsx)
- **Status:** **REMEDIATED.** CSRF state nonce generated on redirect and validated upon callback.

#### FING-10: Unvalidated External URI Scheme Invocation in Patient Mobile App
- **Original Vulnerability:** `google_reviews_service.dart` executed `launchUrl` without verifying URI scheme.
- **Remediation File:** [`Patient app/lib/core/services/google_reviews_service.dart`](file:///D:/Project%20X/Nexcore%20app%20build/Patient%20app/lib/core/services/google_reviews_service.dart)
- **Status:** **REMEDIATED.** Validates that scheme is strictly `https` or `http` before delegating to system launcher.

---

## 3. Storage Bucket Security Matrix

| Bucket Name | Purpose | Public Access | Allowed MIME Types | RLS Policy Status |
|---|---|---|---|---|
| `merchant-assets` | Agency & Clinic Brand Assets (Logos, Favicons, Hero Images) | Public (`true`) | `image/png`, `image/webp`, `image/svg+xml`, `image/jpeg` | Restricted to authenticated clinic owners & super-admins. |
| `offer-media` | Automated Campaign & Holiday Flash Banners | Public (`true`) | `image/webp`, `image/png`, `image/jpeg` | Write access restricted to clinic tenant staff. |
| `treatment-media`| Clinical Photos & Before/After Proofs | Public (`true`) | `image/webp`, `image/jpeg`, `image/png` | Public read; write restricted to authenticated staff. |
| `membership-media`| VIP Membership Imagery & Tier Badges | Public (`true`) | `image/webp`, `image/jpeg` | Write access restricted to clinic tenant staff. |
| `team-and-blog` | Staff Avatars & Blog Article Media | Public (`true`) | `image/webp`, `image/jpeg`, `image/png` | Public read; write restricted to authenticated staff. |
| `clinic-assets` | General Uploads & Fallbacks | Public (`true`) | Image MIME types | Strict ownership checks on file paths. |

---
*End of Database Schema & Security Status Report.*
