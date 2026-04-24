# BeeGood Template — Hebrew Marketing OS

## What this is

A production-ready Next.js template for Hebrew influencer/coach marketing sites.
Fork this repo for each new client — then edit **only `lib/client.ts`**.
Everything else (nav, meta, emails, schema, payments) reads from that single file.

**Template repo:** https://github.com/AlonAbadi/atelier-client-template

**Before starting any work on a new client deployment, read `client-brief.md`** — it contains all the client-specific content (copy, products, philosophy, testimonials) you will need.

---

## Per-client setup checklist

1. **Fork** this repo on GitHub
2. **Edit `lib/client.ts`** — fill in all fields (name, domain, colors, products, hero, etc.)
3. **Replace public assets** — `/og-image.jpg`, hero images, product card images, logo files
4. **Create Supabase project** — run all migrations in `supabase/migrations/` in order
5. **Set env vars in Vercel** (see section below)
6. **Connect domain** in Vercel
7. **Verify Resend domain** for email sending
8. **Configure Cardcom** with new terminal credentials

---

## lib/client.ts — the only file that changes

```ts
export const CLIENT = {
  name:        "שם הלקוח",          // shown in nav, emails, footer
  name_en:     "client-slug",        // used in class names / slugs
  legal_name:  "שם הלקוח בע״מ",
  company_id:  "XXXXXXXXX",          // ח.פ / עוסק מורשה
  domain:      "example.com",
  whatsapp:    "972XXXXXXXXX",

  meta: { title, description, og_image },
  colors: { bg, bg_dark, card, card_soft, border, accent, accent_light, accent_dark, fg, fg_muted },
  hero: { image, image_alt, headline_a, headline_b, desc_a, desc_b, cta_a, cta_b },
  social_proof: { stat1, stat2, stat3, tagline },
  products: { training, challenge, workshop, course, strategy, premium, partnership, hive },
  about: { title, tagline, body, image },
  email: { from_name, from_email, signature },
  modules: { quiz, hive, challenge, course, workshop, strategy, premium, partnership, deals, ab_testing, video_analytics },
} as const;
```

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Email | Resend (domain-verified, DNS in Vercel) |
| Payments | Cardcom LowProfile API |
| Deployment | Vercel (GitHub auto-deploy on push) |
| External cron | cron-job.org → `/api/cron/jobs` every 5 minutes |

---

## Design system — Presets

`CLIENT.design_preset` determines the entire visual identity. One field → all CSS variables swap.

| Preset | מצב | מתאים ל |
|---|---|---|
| `"dark_gold"` | רקע כהה + זהב | פרמיום, high-ticket, high-contrast |
| `"warm_earth"` | off-white + טרקוטה | ווליבאינג, תזונה, יוגה, אורגני |
| `"cool_slate"` | כהה + כחול-פלדה | עסקי, מנכ"לים, אסטרטגי, טכנולוגי |
| `"rose_blush"` | קרם + ורוד עמוק | קואצ'ינג נשי, ליייפסטייל, ביוטי |

**כיצד להשתמש ב-CSS tokens בקוד:**
```tsx
// ✅ נכון — משתנה גלובלי, משתנה עם ה-preset
<div style={{ background: "var(--bg)", color: "var(--fg)" }}>
<button className="btn-cta-gold">                    {/* accent gradient */}
<div style={{ border: "1px solid var(--border)" }}>

// ❌ שגוי — hardcode לא מגיב ל-preset
<div style={{ background: "#0D1018" }}>
```

**טוקנים עיקריים:**
| CSS Var | שימוש |
|---|---|
| `--bg` / `--bg-dark` | רקע דף / סקשן כהה |
| `--card` / `--card-soft` | רקע כרטיסים |
| `--border` | גבולות וקווי הפרדה |
| `--gold` / `--gold-light` / `--gold-dark` | הטוקן "accent" של ה-preset |
| `--grad-gold` | גרדיאנט — כפתורים, highlights |
| `--fg` / `--fg-muted` | טקסט ראשי / משני |
| `--btn-text` | צבע טקסט על כפתורי accent |
| `--radius-card` / `--radius-btn` | border-radius לפי preset |

**אופציונלי — דרוס צבע accent בלבד:**
```ts
color_overrides: { accent: "#FF6B35", accent_light: "#FF8C55", accent_dark: "#CC5528", btn_text: "#FFFFFF" }
```

**Font:** `Assistant` (Google Fonts) — הפונט היחיד.

---

---

## Database migrations

Run in Supabase SQL Editor in order. Next migration: **025**.

| # | File | Contents |
|---|---|---|
| 001 | `schema.sql` | Core tables |
| 002–023 | Included in `schema.sql` (cumulative) | All features |
| 024 | `024_deals.sql` | Deals / coupon management |

---

## Environment variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
NEXT_PUBLIC_FROM_EMAIL=          # noreply@<domain>

# Cardcom
CARDCOM_TERMINAL=
CARDCOM_API_NAME=

# App
NEXT_PUBLIC_APP_URL=https://<domain>
NEXT_PUBLIC_PRICE_CHALLENGE=     # from CLIENT.products.challenge.price
NEXT_PUBLIC_PRICE_WORKSHOP=      # from CLIENT.products.workshop.price
NEXT_PUBLIC_PRICE_CALL=          # from CLIENT.products.strategy.price

# Auth / secrets
ADMIN_USERNAME=
ADMIN_PASSWORD=
CRON_SECRET=
MEMBERS_SECRET=

# WhatsApp
WHATSAPP_PHONE=                  # from CLIENT.whatsapp
NEXT_PUBLIC_WHATSAPP_PHONE=      # from CLIENT.whatsapp

# Analytics (optional)
NEXT_PUBLIC_META_PIXEL_ID=       # Meta Pixel ID — leave empty to disable
META_CAPI_TOKEN=                  # Meta Conversions API token (server-side only)
NEXT_PUBLIC_GA_MEASUREMENT_ID=   # Google Analytics 4 measurement ID
```

---

## Deployment

- Push to `main` → Vercel auto-deploys
- Before committing: `npx tsc --noEmit 2>&1 | grep "error TS" | grep -v ".next"`
- External cron: cron-job.org → `GET /api/cron/jobs` every 5 min with `Authorization: Bearer <CRON_SECRET>`

---

## Coding conventions

**Always:**
- Hebrew RTL for all user-facing text
- Import brand strings from `CLIENT` — never hardcode client name, domain, or legal name
- Use `createServerClient()` for all DB access (exception: auth pages use `createBrowserClient()`)
- Log errors to `error_logs` table in every API route catch block

**Never:**
- Hardcode client name, domain, legal name, company ID — use `CLIENT.*`
- Introduce new fonts or color palettes
- Skip TypeScript check before deploying
- Commit `.env.local` or secrets
