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

            {/* ── MOBILE: full-bleed overlay ── */}
            <div className="md:hidden" style={{ position: "relative", height: "93svh" }}>
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
                <a href="/quiz" data-home-hero-cta="" style={{
                  display: "block", textAlign: "center",
                  background: `linear-gradient(135deg, ${ACC_L}, ${ACC}, ${ACC_D})`,
                  color: BG_DARK, fontWeight: 800, fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  borderRadius: 9999, padding: "14px", marginBottom: 14, textDecoration: "none",
                  width: "100%",
                }}>
                  {content.cta}
                </a>
              </div>
            </div>

            {/* ── DESKTOP: full-bleed overlay ── */}
            <div className="hidden md:block" style={{ position: "relative", minHeight: "100vh" }}>
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
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom, ${BG}66 0%, transparent 30%)`,
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
                <a href="/quiz" data-home-hero-cta="" style={{
                  display: "inline-block",
                  background: `linear-gradient(135deg, ${ACC_L}, ${ACC}, ${ACC_D})`,
                  color: BG_DARK, fontWeight: 800, fontSize: "1.05rem",
                  borderRadius: 9999, padding: "16px 52px",
                  textDecoration: "none", marginBottom: 22,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.25), 0 10px 28px rgba(0,0,0,0.35)`,
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
              3. PHILOSOPHY
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
              4. PRODUCTS
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

              {/* TODO: add real testimonials to the TESTIMONIALS array above */}
              {TESTIMONIALS.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.name}
                      className="rounded-3xl p-8 flex flex-col gap-6"
                      style={{
                        background: CARD,
                        border: `1px solid ${ACC}26`,
                        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill={ACC_L} viewBox="0 0 20 20">
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
            6. FOOTER
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
                { label: "בית",           href: "/" },
                { label: "אודות",         href: "/about" },
                { label: "הדרכה",         href: "/training" },
                ...(CLIENT.modules.quiz       ? [{ label: "אבחון",   href: "/quiz" }]      : []),
                ...(CLIENT.modules.challenge  ? [{ label: "אתגר",    href: "/challenge" }] : []),
                ...(CLIENT.modules.hive       ? [{ label: "קהילה",   href: "/hive" }]      : []),
                ...(CLIENT.modules.course     ? [{ label: "קורס",    href: "/course" }]    : []),
                ...(CLIENT.modules.workshop   ? [{ label: "סדנה",    href: "/workshop" }]  : []),
                { label: "אזור אישי",     href: "/my" },
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
    </>
  );
}
