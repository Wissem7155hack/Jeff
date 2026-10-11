# Nexcore Authentication & Dynamic Tenancy Audit Report

## 1. Executive Summary & Root Cause Analysis

### A. Password Reset Failure on `https://www.nexcore-app.com/login/`
- **Root Cause 1 (Outdated Deployed Commit):** The production website (`nexcore-website` / GitHub Pages) was running commit `b3ae39e`, where clicking *"Forgot password?"* was hardcoded to display a static placeholder notice:
  > *"Password reset instructions are sent to authorized clinic administrators. For help, contact support@nexcore-app.com."*
  Recent local code implementing Clerk password resets had never been committed and pushed to `origin/main`.
- **Root Cause 2 (Clerk SDK API Mismatch):** When Clerk password reset was attempted client-side, the handler was calling `attemptFirstFactor({ strategy: 'reset_password_email_code', code, password })` simultaneously. In Clerk's Web SDK, `attemptFirstFactor` only takes `{ strategy: 'reset_password_email_code', code }`. Setting the new password requires subsequently calling `signIn.resetPassword({ password })` and `setActive({ session: result.createdSessionId })`.
- **Root Cause 3 (Static Host Topology):** `https://www.nexcore-app.com` is configured with `output: "export"` in `next.config.ts` and deployed to GitHub Pages. GitHub Pages does not support Node.js API routes (POST requests return HTTP 405). The Clerk password reset flow must run entirely through Clerk's client SDK in the browser.

### B. Clerk vs. Supabase Architecture Clarification
- **Clerk Identity & Authentication:** Used strictly for portal administrator authentication (session tokens, MFA, password resets, organization roles). Patrick Lüönd's account (`user_3KTNvAwX4fFR4SUK1Q49IhC3brR`, `voidstone.vip@gmail.com`) is verified and active in production Clerk with `isAgencyAdmin` super-user privileges.
- **Supabase Multi-Tenant Data & Storage:** Used for all clinic entities (`clinics`), treatments, vouchers, loyalty programs, client records, and Row-Level Security (RLS). Changes made in the dashboard or app persist directly to Supabase PostgREST.

---

## 2. Hardcoded Mock Data Purged

All static mock clinic names, mock IDs, and brand overrides (`Beauty2Go Zürich`, `SLA Medical Clinic`, `ELA`, `Refined Skin & Body`) have been removed across both the Admin Dashboard and Patient App:

### Admin Dashboard (`beter clone`)
1. **`src/App.tsx`**:
   - Removed static `initialMerchants` (`Beauty2Go Zürich` and `SLA Medical`).
   - Initialized `merchants` state to empty array `[]` with full loading guards.
   - All tenant data is dynamically populated from `useClinics()` via `public.clinics` in Supabase.
2. **`src/components/AgencyDashboard.tsx`**:
   - Removed hardcoded logo matchers (`beauty2go`, `abela`, `eva`, `evolvmd`, `good skin`).
   - Replaced with dynamic logo renderer (`m.raw_logo_url || m.logoUrl`) with clean initials fallback.
   - Dynamic user greeting pulling first name directly from Clerk's `useUser()`.
3. **`src/components/ViewAppModal.tsx`**:
   - Replaced hardcoded `'Beauty2Go Clinic'` default with `currentMerchant?.name || 'Clinic'`.
4. **`src/components/AppBuilder/CustomPlansTab.tsx`**:
   - Removed hardcoded SLA UUID fallback (`4ecac81d-3472-4dfd-99a8-57a72f7a0bb3`).
5. **`src/components/AppBuilder/SettingsTab.tsx`**:
   - Removed static `'Refined Skin & Body'` defaults; state initializes dynamically from the selected clinic.
6. **`src/components/AppBuilder/CreateMembershipSheet.tsx` & `AppBuilderMembership.tsx`**:
   - Removed static clinic names and hardcoded fallbacks.
7. **`src/hooks/useSupabaseData.ts`**:
   - Replaced all hardcoded SLA clinic ID fallbacks with dynamic clinic resolution.

### Patient Flutter App (`Patient app`)
1. **`lib/data/models/clinic_model.dart`**:
   - Removed hardcoded SLA logo path fallback (`assets/clinics logos/sla logo.png`).
   - Dynamic coordinate resolution: extracts `lat` and `lng` directly from Google Maps iframe embed (`!3d` and `!2d` regex matching) or database columns.
2. **`lib/data/repositories/clinic_repository.dart`**:
   - Removed static SLA fallback in `fetchClinicById`.
   - `getDefaultClinicId()` dynamically returns the first active clinic from Supabase or empty string.
3. **`lib/presentation/screens/auth/find_location_step.dart`**:
   - Removed static `_allClinicItems` (`SLA Medical`, `Sage & Pure`).
   - Removed hardcoded "Pair SLA Medical Directly" development shortcut.
4. **`lib/presentation/screens/auth/auth_screen.dart`**:
   - Removed hardcoded `'SLA Medical Clinic'` and `'SLA'` branding fallbacks.
   - Dynamic step initialization: if `savedClinicIdProvider` is present, routes directly to clinic sign-in (`email`); otherwise routes to `location` discovery.
5. **`lib/presentation/screens/auth/login_screen.dart`**:
   - Replaced static clinic name fallback with dynamic clinic branding.
6. **`lib/presentation/router/app_router.dart`**:
   - Removed hardcoded `'sla_medical'` fallback in route parameters.
7. **`lib/presentation/widgets/membership_promo_card.dart`**:
   - Removed hardcoded clinic title.
8. **`lib/presentation/state/packages_provider.dart`**:
   - Removed static `_defaultSlaPackages`; returns `[]` if the clinic has no packages in Supabase.
9. **`lib/core/services/push_notification_service.dart`**:
   - Removed hardcoded SLA logo override in notification payload handler.
10. **`lib/core/services/google_reviews_service.dart`**:
    - Removed hardcoded SLA Google Place ID fallback (`ChIJdd4hrwug2EcRmSrV3Vo6llI`).
11. **`lib/core/services/dynamic_icon_service.dart`**:
    - Removed hardcoded `sla` and `beauty2go` brand checks.

---

## 3. Dynamic Multi-Tenancy Architecture

When a new merchant/clinic is created in Supabase (`public.clinics`):
1. **Admin Dashboard (`beter clone`):**
   - Fetches the clinic via `useClinics()` / Supabase PostgREST.
   - Appears immediately in the Agency Clinic Switcher and Merchant Dashboard.
   - Themes, memberships, loyalty points, and treatments load dynamically for that clinic's UUID.
2. **Patient Mobile App (`Patient app`):**
   - Fetches active clinics via `fetchAllClinics()`.
   - Appears immediately in the **Find Location** screen and QR code scanning pairing.
   - App dynamically re-themes (colors, logo, typography, currency symbol, membership tiers, rewards) without requiring an app rebuild or hardcoded constants.

---

## 4. Verification & Testing Results

| System | Component | Verification Command / Method | Status |
|---|---|---|---|
| **nexcore-app.com** | Password Reset Flow | Live browser test on production URL (`voidstone.vip@gmail.com`) | **VERIFIED LIVE** (Verification code dispatched, set password UI active) |
| **nexcore V2** | GitHub Pages Deployment | GitHub Actions Workflow run on commit `73bf2b5` | **COMPLETED & SUCCESS** |
| **beter clone** | Admin Dashboard Build | `npm run build` (`vite build`) | **PASSED** (0 errors, 10.97s) |
| **Patient app** | Dart Static Analysis | `flutter analyze lib/` | **PASSED** (0 issues found) |
| **Patient app** | Widget Integration Tests | `flutter test test/widget_test.dart` | **PASSED** (5/5 tests passed) |
| **Patient app** | Coordinates & Vouchers | `flutter test test/rewards_and_map_embed_test.dart` | **PASSED** (4/4 tests passed) |
| **Patient app** | Dynamic Icon Service | `flutter test test/dynamic_icon_service_test.dart` | **PASSED** (2/2 tests passed) |
