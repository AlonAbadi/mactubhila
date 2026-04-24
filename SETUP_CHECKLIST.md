# New Client Setup Checklist

Work through this in order. Do not skip steps.

---

## Phase 1 — Content collection (before touching code)

- [ ] Fill in `client-brief.md` completely
- [ ] Get all images from client (hero, about/profile, product cards, og-image)
- [ ] Confirm active modules (quiz / challenge / hive / course / workshop / etc.)
- [ ] Get real testimonials (name, role, quote)
- [ ] Confirm brand colors (or generate palette from logo)

---

## Phase 2 — Fork and configure

- [ ] Fork `atelier-client-template` on GitHub → name it `client-slug`
- [ ] Clone locally
- [ ] Edit `lib/client.ts` — fill every field from `client-brief.md`
- [ ] Place images in `public/` (og-image.jpg, hero.jpg, about.jpg, etc.)
- [ ] Run `npx tsc --noEmit` — must be zero errors before continuing

---

## Phase 3 — Page copy (replace all TODO placeholders)

- [ ] `app/page.tsx` — home hero philosophy quote, testimonials array
- [ ] `app/about/page.tsx` — PRINCIPLES array, section heading, closing quote
- [ ] `app/training/page.tsx` — problemItems, solutionItems, forItems, notForItems, FAQs, finalTitle
- [ ] `app/challenge/page.tsx` — same fields
- [ ] `app/hive/page.tsx` — same fields
- [ ] `app/quiz/QuizClient.tsx` — QUESTIONS, PRODUCTS, SCORES (if quiz module active)
- [ ] `lib/quiz-narrative.ts` — buildNarrative() (if quiz module active)
- [ ] `lib/quiz-config.ts` — BULLET_RULES, PRODUCT_IMAGE paths
- [ ] `lib/email/templates.ts` — review and update all body copy (subjects, CTAs, body text)
- [ ] `components/landing/PhilosophySection.tsx` — check for hardcoded content
- [ ] `components/ProductsSection.tsx` — check for hardcoded content
- [ ] `data/reviews.ts` — add real reviews if using review component

---

## Phase 4 — Infrastructure

- [ ] Create Supabase project
- [ ] Run all migrations in `supabase/migrations/` in order (001 → latest)
- [ ] Set all env vars in Vercel (see `CLAUDE.md` env section)
- [ ] Connect domain in Vercel
- [ ] Verify Resend sending domain (DNS)
- [ ] Configure Cardcom terminal credentials
- [ ] Set up cron-job.org → `GET /api/cron/jobs` every 5 min

---

## Phase 5 — Pre-launch audit

Run from project root:

```bash
# TypeScript — must be zero errors
npx tsc --noEmit 2>&1 | grep "error TS"

# Find remaining TODO placeholders in pages
grep -r "TODO" app/ components/landing/ lib/quiz-narrative.ts lib/quiz-config.ts --include="*.tsx" --include="*.ts" -l

# Find any remaining old-client names (replace CLIENT_SLUG with the old client)
grep -r "beegood_logo\|TrueSignal\|TODO" app/ components/ lib/ --include="*.tsx" --include="*.ts" -l
```

All three must return clean output before going live.

---

## Phase 6 — Launch

- [ ] Push to `main` → Vercel deploys automatically
- [ ] Smoke-test all active pages in production
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Cardcom test payment goes through
- [ ] Verify welcome email arrives on signup
