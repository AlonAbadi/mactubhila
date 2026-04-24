import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { parseVariant, AB_CONTENT } from "@/lib/ab";
import { createServerClient } from "@/lib/supabase/server";
import { CLIENT } from "@/lib/client";
import { PageTracker } from "@/components/landing/PageTracker";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ProductsSection } from "@/components/ProductsSection";
import HomeStickyBar from "@/components/home/HomeStickyBar";
import SocialProofStrip from "@/components/SocialProofStrip";

export const metadata: Metadata = {
  title: CLIENT.meta.title,
  description: CLIENT.meta.description,
  alternates: { canonical: "/" },
};

async function getUserCount(): Promise<number> {
  try {
    const supabase = createServerClient();
    const { count } = await supabase.from("users").select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

const TESTIMONIALS: { text: string; name: string; date: string; initial: string }[] = [];

const BG      = CLIENT.colors.bg;
const BG_DARK = CLIENT.colors.bg_dark;
const CARD    = CLIENT.colors.card;
const BDR     = CLIENT.colors.border;
const ACC     = CLIENT.colors.accent;
const ACC_L   = CLIENT.colors.accent_light;
const ACC_D   = CLIENT.colors.accent_dark;
const FG      = CLIENT.colors.fg;
const MUT     = CLIENT.colors.fg_muted;

export default async function LandingPage() {
  const cookieStore = await cookies();
  const variant = parseVariant(cookieStore.get("ab_variant")?.value);
  const content = AB_CONTENT[variant];
  const userCount = await getUserCount();
  const displayCount = Math.max(userCount + 100, 500);

  return (
    <>
      <PageTracker abVariant={variant} />

      <div dir="rtl" className="min-h-screen flex flex-col" style={{ background: BG_DARK }}>

        <main className="flex-1">

          {/* ══════════════════════════════════════════════════════
              1. HERO
          ══════════════════════════════════════════════════════ */}
          <section style={{ overflow: "hidden", background: BG }}>

            {/* ── MOBILE ── */}
            <div className="md:hidden" style={{ position: "relative", height: "93svh", background: `linear-gradient(160deg, ${ACC_L} 0%, ${BG} 45%, ${BG_DARK} 100%)` }}>
              <Image
                src={CLIENT.hero.image}
                alt={CLIENT.hero.image_alt}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: CLIENT.hero.image_position ?? "center 25%" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, ${BG_DARK} 0%, ${BG_DARK}f2 20%, ${BG_DARK}d9 35%, ${BG_DARK}99 55%, ${BG_DARK}4d 70%, transparent 85%)`,
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom, ${BG}33 0%, transparent 25%)`,
              }} />
              <div style={{
                position: "absolute", bottom: "32px", left: 0, right: 0,
                padding: "0 24px", direction: "rtl", textAlign: "right",
              }}>
                <h1 style={{ color: FG, fontWeight: 800, fontSize: "clamp(1.7rem, 4.5vw, 2rem)", lineHeight: 1.18, marginBottom: 12, whiteSpace: "pre-line" }}>
                  {content.headline}
                </h1>
                <p style={{ color: MUT, fontSize: "clamp(0.9rem, 2vw, 1rem)", lineHeight: 1.72, marginBottom: 16 }}>
                  {content.description}
                </p>
                <a href="/training" data-home-hero-cta="" style={{
                  display: "block", textAlign: "center",
                  background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
                  color: "#FFFFFF", fontWeight: 800, fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  borderRadius: 9999, padding: "14px", marginBottom: 14, textDecoration: "none",
                  width: "100%",
                }}>
                  {content.cta}
                </a>
              </div>
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:block" style={{ position: "relative", minHeight: "100vh", background: `linear-gradient(160deg, ${ACC_L} 0%, ${BG} 45%, ${BG_DARK} 100%)` }}>
              {/* Portrait — visible when /hero.jpg is a real photo */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "-5%",
                height: "163%",
                width: "auto",
                display: "inline-block",
              }}>
                <Image
                  src={CLIENT.hero.image}
                  alt={CLIENT.hero.image_alt}
                  width={842}
                  height={1264}
                  priority
                  sizes="50vw"
                  quality={80}
                  style={{
                    height: "100%",
                    width: "auto",
                    maxWidth: "none",
                    display: "block",
                    WebkitMaskImage: "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
                    maskImage: "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
                  }}
                />
              </div>
              {/* Decorative letter shown while no portrait photo exists */}
              <div aria-hidden style={{
                position: "absolute",
                top: "50%",
                left: "3%",
                transform: "translateY(-50%)",
                fontSize: "clamp(180px, 22vw, 300px)",
                fontWeight: 900,
                color: `${ACC}12`,
                fontFamily: "var(--font-assistant), Assistant, sans-serif",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}>
                מ
              </div>
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom, ${BG}44 0%, transparent 30%)`,
              }} />
              <div style={{
                position: "absolute", top: "50%", right: 0,
                transform: "translateY(-50%)",
                width: "45%", padding: "0 72px 0 0",
                direction: "rtl", textAlign: "right",
              }}>
                <h1 style={{
                  color: FG, fontWeight: 800,
                  fontSize: "clamp(2rem, 2.6vw, 3rem)",
                  lineHeight: 1.2, marginBottom: 18, whiteSpace: "pre-line",
                }}>
                  {content.headline}
                </h1>
                <p style={{
                  color: MUT, fontSize: "1rem",
                  lineHeight: 1.78, marginBottom: 36,
                }}>
                  {content.description}
                </p>
                <a href="/training" data-home-hero-cta="" style={{
                  display: "inline-block",
                  background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
                  color: "#FFFFFF", fontWeight: 800, fontSize: "1.05rem",
                  borderRadius: 9999, padding: "16px 52px",
                  textDecoration: "none", marginBottom: 22,
                  boxShadow: `0 10px 28px ${ACC}55`,
                }}>
                  {content.cta}
                </a>
              </div>
            </div>

          </section>

          {/* ══════════════════════════════════════════════════════
              2. STATS
          ══════════════════════════════════════════════════════ */}
          <StatsSection />

          <SocialProofStrip />

          {/* ══════════════════════════════════════════════════════
              3. PHILOSOPHY / BIO
          ══════════════════════════════════════════════════════ */}
          <section
            className="px-6 py-20 md:py-28"
            style={{ background: BG }}
          >
            <div className="max-w-5xl mx-auto flex flex-col gap-14">
              <div className="text-center flex flex-col gap-3">
                <h2 className="text-3xl md:text-4xl font-black" style={{ color: FG }}>
                  {CLIENT.about.title}
                </h2>
                <p className="text-base font-semibold" style={{ color: ACC }}>
                  {CLIENT.about.tagline}
                </p>
              </div>

              {/* Bio card — Hila's name, avatar, credentials */}
              <div
                className="flex flex-col md:flex-row items-center gap-7 md:gap-10"
                style={{
                  background: CARD,
                  borderRadius: 24,
                  padding: "28px 32px",
                  border: `1px solid ${BDR}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ width: 96, height: 96, borderRadius: "50%", flexShrink: 0, overflow: "hidden", border: `3px solid ${ACC}4d`, boxShadow: `0 8px 24px ${ACC}33` }}>
                  <Image
                    src={CLIENT.about.image}
                    alt="הילה יגאל-איזון"
                    width={96}
                    height={96}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div style={{ textAlign: "right", direction: "rtl", flex: 1 }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: ACC, marginBottom: 5, letterSpacing: "0.07em" }}>
                    יוצרת שיטת מכתוב
                  </p>
                  <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: FG, lineHeight: 1.2, margin: "0 0 8px 0" }}>
                    הילה יגאל-איזון
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: MUT, lineHeight: 1.65, margin: 0 }}>
                    מומחית בליווי כתיבה להתפתחות אישית ועיבוד טראומות · 25 שנות ניסיון · תואר שני בייעוץ ארגוני · פסיכולוגיה חיובית · טיפול נרטיבי
                  </p>
                </div>
              </div>

              <PhilosophySection />

              <div
                className="rounded-3xl px-8 py-7 text-center"
                style={{ background: `${ACC}14`, border: `1px solid ${ACC}1f` }}
              >
                <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: FG }}>
                  &ldquo;{CLIENT.about.body}&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════
              4. START HERE — 4 paths
          ══════════════════════════════════════════════════════ */}
          <section className="px-6 py-16 md:py-24" style={{ background: BG_DARK }}>
            <div className="max-w-5xl mx-auto flex flex-col gap-10">
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-2xl md:text-4xl font-black" style={{ color: FG }}>
                  מאיפה מתחילים?
                </h2>
                <p className="text-sm md:text-base" style={{ color: MUT }}>
                  בחרי את הנקודה שמתאימה לך עכשיו
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    tag: "חינם",
                    tagBg: `${ACC}22`,
                    title: "חדשה לגמרי למכתוב",
                    desc: "שיעור מתנה של 20 דקות – טעימה ראשונה מהשיטה, בלי התחייבות.",
                    cta: "לשיעור המתנה ←",
                    href: "/training",
                    highlight: false,
                  },
                  {
                    tag: "₪149",
                    tagBg: `${ACC}22`,
                    title: "רוצה כלים בידיים",
                    desc: "קלפי מכתוב דיגיטליים – 30 קלפים + מדריך מוקלט. גישה מיידית.",
                    cta: "לקלפי מכתוב ←",
                    href: "/cards",
                    highlight: false,
                  },
                  {
                    tag: "₪575",
                    tagBg: `${ACC}33`,
                    title: "מוכנה להעמיק",
                    desc: "קורס דיגיטלי – 6 מפגשים מוקלטים עם כלי השיטה המלאים. בקצב שלך.",
                    cta: "לקורס הדיגיטלי ←",
                    href: "/course",
                    highlight: true,
                  },
                  {
                    tag: "ליווי אישי",
                    tagBg: `${ACC}22`,
                    title: "רוצה ליווי צמוד",
                    desc: "קורס עם ליווי אישי של הילה (₪1,100) או ליווי 1:1 בלבד (₪1,900).",
                    cta: "לפרטים ←",
                    href: "/workshop",
                    highlight: false,
                  },
                ].map((card) => (
                  <a
                    key={card.href}
                    href={card.href}
                    className="start-path-card"
                    style={{
                      display: "block",
                      background: card.highlight ? `linear-gradient(135deg, ${ACC}14, ${ACC}08)` : BG,
                      border: `1px solid ${card.highlight ? ACC + "55" : BDR}`,
                      borderRadius: 20,
                      padding: "24px",
                      textDecoration: "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{
                        fontSize: "0.75rem", fontWeight: 700, color: ACC,
                        background: card.tagBg, borderRadius: 999, padding: "3px 12px",
                      }}>
                        {card.tag}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: FG, marginBottom: 8 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: MUT, lineHeight: 1.65, marginBottom: 14 }}>
                      {card.desc}
                    </p>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: ACC }}>{card.cta}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════
              5. PRODUCTS (full ladder)
          ══════════════════════════════════════════════════════ */}
          <ProductsSection />

          {/* ══════════════════════════════════════════════════════
              5. SOCIAL PROOF
          ══════════════════════════════════════════════════════ */}
          <section className="px-6 py-24 md:py-36" style={{ background: BG_DARK }}>
            <div className="max-w-5xl mx-auto flex flex-col gap-16">

              <div className="text-center flex flex-col items-center gap-5">
                <h2 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: FG }}>
                  מעל {displayCount.toLocaleString("he-IL")} {CLIENT.social_proof.tagline}
                </h2>
              </div>

              {TESTIMONIALS.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.name}
                      className="rounded-3xl p-8 flex flex-col gap-6"
                      style={{
                        background: CARD,
                        border: `1px solid ${ACC}26`,
                        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill={ACC} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-base md:text-lg leading-relaxed flex-1" style={{ color: FG }}>
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-5" style={{ borderTop: `1px solid ${ACC}1f` }}>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                          style={{
                            background: `${ACC}33`,
                            color: ACC,
                            border: `1px solid ${ACC}4d`,
                          }}
                        >
                          {t.initial}
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: FG }}>{t.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: MUT }}>{t.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </section>

        </main>

        {/* ══════════════════════════════════════════════════════
            6. SPECIAL AUDIENCE BANNERS
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 py-12" style={{ background: BG_DARK }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href="/scholarships"
              style={{
                display: "block",
                background: BG,
                border: `1px solid ${BDR}`,
                borderRadius: 20,
                padding: "28px 28px",
                textDecoration: "none",
                borderRight: `4px solid ${ACC}`,
              }}
            >
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: ACC, letterSpacing: "0.1em", marginBottom: 8 }}>
                נפגעי 7.10 · נשות מילואים · גיבורי נובה
              </p>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: FG, marginBottom: 10 }}>
                יש מסלול מלגות בשבילך
              </h3>
              <p style={{ fontSize: "0.875rem", color: MUT, lineHeight: 1.65, marginBottom: 14 }}>
                שיטת מכתוב נולדה מעבודה עם נפגעי טראומה. אם את/ה עובר/ת תקופה קשה – יש כאן מקום גם בשבילך, בלי מחסום כלכלי.
              </p>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: ACC }}>
                למסלול המלגות ←
              </span>
            </a>
            <a
              href="/for-organizations"
              style={{
                display: "block",
                background: BG,
                border: `1px solid ${BDR}`,
                borderRadius: 20,
                padding: "28px 28px",
                textDecoration: "none",
                borderRight: `4px solid ${ACC}`,
              }}
            >
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: ACC, letterSpacing: "0.1em", marginBottom: 8 }}>
                חברות · עמותות · קיבוצים · מוסדות חינוך
              </p>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: FG, marginBottom: 10 }}>
                מכתוב לארגון שלך
              </h3>
              <p style={{ fontSize: "0.875rem", color: MUT, lineHeight: 1.65, marginBottom: 14 }}>
                סדנאות מותאמות אישית לבניית חוסן, תרבות ותקשורת. ניסיון עם Microsoft, עמותת עלם, ילדים בסיכוי ועוד.
              </p>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: ACC }}>
                לקבלת הצעה ←
              </span>
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. FOOTER
        ══════════════════════════════════════════════════════ */}
        <footer className="px-6 py-12" style={{ background: BG, paddingBottom: "100px" }}>
          <div className="max-w-5xl mx-auto flex flex-col gap-8">

            <div className="text-center">
              <a
                href="/my"
                className="inline-flex items-center gap-2 text-sm font-bold transition hover:opacity-80"
                style={{ color: ACC }}
              >
                יש לך זיכוי? בדוק באזור האישי שלך ←
              </a>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {[
                { label: "בית",             href: "/" },
                { label: "אודות",           href: "/about" },
                { label: "שיעור מתנה",     href: "/training" },
                { label: "קלפים",           href: "/cards" },
                ...(CLIENT.modules.course     ? [{ label: "קורס דיגיטלי",  href: "/course" }]      : []),
                ...(CLIENT.modules.workshop   ? [{ label: "קורס + ליווי",  href: "/workshop" }]    : []),
                ...(CLIENT.modules.strategy   ? [{ label: "קורס פרונטלי", href: "/strategy" }]    : []),
                ...(CLIENT.modules.partnership? [{ label: "ליווי 1:1",     href: "/partnership" }] : []),
                { label: "מלגות",           href: "/scholarships" },
                { label: "לארגונים",        href: "/for-organizations" },
                { label: "אזור אישי",       href: "/my" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="hover:opacity-80 transition" style={{ color: ACC }}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-2 text-xs" style={{ color: `${MUT}80` }}>
              <div className="flex gap-4">
                <a href="/privacy"       className="hover:text-white transition">מדיניות פרטיות</a>
                <a href="/terms"         className="hover:text-white transition">תנאי שימוש</a>
                <a href="/accessibility" className="hover:text-white transition">הצהרת נגישות</a>
              </div>
              <p>© 2026 {CLIENT.legal_name} | ח.פ. {CLIENT.company_id} · כל הזכויות שמורות</p>
              <p className="mt-1">
                <a href="/unsubscribe" className="hover:text-white transition">לביטול הסכמה לדיוור</a>
              </p>
            </div>

          </div>
        </footer>

      </div>
      <HomeStickyBar ctaText={content.cta} />
      <style>{`.start-path-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px ${ACC}22; }`}</style>
    </>
  );
}
