# NEXCORE PLATFORM — ACCOUNTS & CREDENTIALS MATRIX
**Document Reference:** `ACCOUNTS_AND_CREDENTIALS.md`  
**Classification:** Internal Operations & Testing Credentials Reference  
**Production Status:** Active System Accounts (November 2026)  

---

## 1. The Core Rule for Logins & Passwords

> [!IMPORTANT]
> **All testing and clinic accounts use YOUR single Gmail address (`voidstone.vip@gmail.com`) using Gmail `+` tags.**
> Whenever Clerk prompts for a 6-digit verification code for ANY `voidstone.vip+...@gmail.com` address, the email code lands directly in your primary **`voidstone.vip@gmail.com`** inbox.
> 
> **Password Rule:**
> - **All Clinic & Agency Test Accounts:** `NexcoreClinic2026!`
> - **Master Admin Account:** Your personal Clerk account password (or Google One-Click SSO).

---

## 2. Complete Account Directory

### Tier 1: Master Super-Admin (Platform Owner)
*Has 100% unrestricted access to the entire ecosystem: all clinics, the Agency Super-Portal, and global tenant provisioning.*

| Parameter | Value |
|---|---|
| **Email Login** | `voidstone.vip@gmail.com` *(or `wissemwchtiba@gmail.com`)* |
| **Password** | Your personal Clerk password / Google SSO |
| **Role** | `super_admin` (`is_agency_admin: true`) |
| **Access Scope** | All 5 Regional Clinics + Agency Super-Portal + White-Label CMS |
| **Workspace Switching** | One-click instant switching via the top/sidebar workspace picker without logging out |

---

### Tier 2: The White-Label Agency Owner ("The Agency Dude")
*Has access to the Agency Super-Portal: manage sub-accounts, switch between Sandbox/Live clinics, configure white-label logo/favicon, set brand colors, and map custom CNAME domains.*

| Parameter | Value |
|---|---|
| **Testing Email Login** | `voidstone.vip+agency@gmail.com` |
| **Password** | `NexcoreClinic2026!` |
| **Role** | `agency_admin` |
| **Verification Code Destination** | Lands directly in your `voidstone.vip@gmail.com` inbox |
| **Live Production Agency Owner** | When onboarding an external agency (e.g. GetDemor), invite their business email (`owner@getdemor.com`) in Clerk with role `agency_admin`. They choose their own password upon first login. |

---

### Tier 3: Regional Clinic Owner Accounts (Scoped Tenant Logins)
*When logged into these accounts, the dashboard is strictly isolated to that specific clinic's operations, analytics, CRM, treatments, and settings.*

* **Global Password for All Clinic Accounts:** `NexcoreClinic2026!`
* **All Verification Codes:** Delivered to `voidstone.vip@gmail.com`

| Region / Location | Email Login | Password | Scoped Clinic in Supabase | Clinic ID |
|---|---|---|---|---|
| **Switzerland (CH)** | `voidstone.vip+ch@gmail.com` | `NexcoreClinic2026!` | Nexcore Zurich Enge | `c3333333-3333-4333-8333-333333333333` |
| **United Kingdom (UK)** | `voidstone.vip+uk@gmail.com` | `NexcoreClinic2026!` | Nexcore Mayfair London | `c2222222-2222-4222-8222-222222222222` |
| **United States (US)** | `voidstone.vip+us@gmail.com` | `NexcoreClinic2026!` | Nexcore Beverly Hills | `c1111111-1111-4111-8111-111111111111` |
| **Germany (DE)** | `voidstone.vip+de@gmail.com` | `NexcoreClinic2026!` | Nexcore Munich Brienner | `c4444444-4444-4444-8444-444444444444` |
| **Ireland (IE)** | `voidstone.vip+ie@gmail.com` | `NexcoreClinic2026!` | Nexcore Dublin Fitzwilliam | `c5555555-5555-4555-8555-555555555555` |

---

## 3. Patient Mobile App (Flutter) Logins

*The native consumer mobile application uses Supabase Auth rather than Clerk.*

- **Guest Mode:** Tap *"Continue as Guest"* on the mobile welcome screen to browse catalogs and add treatments to cart without entering an email.
- **Patient Sign-In:** Any patient email created via the mobile app's Sign-Up screen (or created in Supabase Authentication) can log in with their chosen password.

---
*Maintained and synchronized across all Nexcore workspaces.*
