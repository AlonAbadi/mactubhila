import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { TeamSection } from "@/components/landing/TeamSection";
import { CLIENT } from "@/lib/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export const metadata: Metadata = {
  title: `${CLIENT.about.title} | ${CLIENT.name}`,
  description: CLIENT.about.body.slice(0, 160),
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": CLIENT.name,
  "url": APP_URL,
  "jobTitle": CLIENT.about.tagline,
  "description": CLIENT.about.body,
  "sameAs": [],
  "worksFor": { "@type": "Organization", "name": CLIENT.legal_name, "url": APP_URL },
};

const BG   = CLIENT.colors.bg;
const BG_D = CLIENT.colors.bg_dark;
const FG   = CLIENT.colors.fg;
const ACC  = CLIENT.colors.accent;
const ACC_L = CLIENT.colors.accent_light;
const BDR  = CLIENT.colors.border;
const CARD = CLIENT.colors.card;
const SOFT = CLIENT.colors.card_soft;
const MUT  = CLIENT.colors.fg_muted;

export default function AboutPage() {
  return (
    <div dir="rtl" className="font-assistant" style={{ background: BG, color: FG, minHeight: "100vh", paddingTop: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.about.title, url: `${APP_URL}/about` },
      ]} />

      {/* ── Hero ── */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "56px 20px 40px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: ACC, letterSpacing: "0.08em", marginBottom: 10 }}>
          אודות מכתוב
        </p>
        <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.2, color: FG, marginBottom: 10 }}>
          {CLIENT.about.title}
        </h1>
        <p style={{ fontSize: 18, color: ACC, fontWeight: 600, marginBottom: 16 }}>
          {CLIENT.about.tagline}
        </p>
        <p style={{ fontSize: 16, color: MUT, lineHeight: 1.75 }}>
          {CLIENT.about.body}
        </p>
      </section>

      {/* ── Survey stats strip ── */}
      <section style={{ background: `${ACC}10`, borderTop: `1px solid ${ACC}22`, borderBottom: `1px solid ${ACC}22`, padding: "28px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, textAlign: "center" }}>
          {CLIENT.survey_stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 30, fontWeight: 900, color: ACC }}>{s.number}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 5, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: `${MUT}99`, marginTop: 16 }}>
          * על פי סקר בוגרים שנתי של מכתוב
        </p>
      </section>

      {/* ── Principles ── */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "56px 20px 0" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 28, color: FG }}>
          {CLIENT.pages.about.section_title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CLIENT.pages.about.principles.map((p) => (
            <div key={p.n} style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 14, padding: "20px 22px" }}>
              <p style={{ fontSize: 12, color: ACC, fontWeight: 700, marginBottom: 6, letterSpacing: "0.06em" }}>עקרון {p.n}</p>
              <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: FG }}>{p.q}</p>
              <p style={{ fontSize: 14, color: MUT, lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sign-off quote ── */}
      <section style={{ maxWidth: 520, margin: "0 auto", padding: "48px 20px 0", textAlign: "center" }}>
        <div style={{ background: `${ACC}10`, border: `1px solid ${ACC}22`, borderRadius: 16, padding: "28px 32px" }}>
          <p style={{ fontSize: 17, fontStyle: "italic", color: FG, lineHeight: 1.75 }}>
            &ldquo;{CLIENT.pages.about.quote}&rdquo;
          </p>
          <p style={{ marginTop: 14, fontWeight: 700, color: ACC }}>— הילה יגאל-איזון</p>
        </div>
      </section>

      {/* ── Team ── */}
      <div style={{ background: BG_D, borderTop: `1px solid ${BDR}`, marginTop: 56 }}>
        <TeamSection />
      </div>

      {/* ── Research & credibility ── */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "64px 20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: ACC, letterSpacing: "0.08em", marginBottom: 8 }}>
            מחקר ואקדמיה
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: FG, lineHeight: 1.25, marginBottom: 10 }}>
            {CLIENT.research.headline}
          </h2>
          <p style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>
            {CLIENT.research.subline}
          </p>
        </div>

        <div style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 18, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Book badge */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 56, height: 72, borderRadius: 8, flexShrink: 0,
              background: `linear-gradient(135deg, ${ACC}, ${CLIENT.colors.accent_dark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 22,
            }}>
              📖
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <p style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{CLIENT.research.publisher}</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: FG, lineHeight: 1.4, marginBottom: 6 }}>
                {CLIENT.research.book_en}
              </p>
              <p style={{ fontSize: 13, color: MUT, fontStyle: "italic", lineHeight: 1.5 }}>
                {CLIENT.research.book_he}
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${BDR}`, paddingTop: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: ACC, marginBottom: 6 }}>
              {CLIENT.research.chapter}
            </p>
            <p style={{ fontSize: 13, color: MUT, lineHeight: 1.65, marginBottom: 14 }}>
              {CLIENT.research.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {CLIENT.research.researchers.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                  <p style={{ fontSize: 12, color: MUT }}>{r}</p>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACC, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Media coverage ── */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "56px 20px 0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: FG, marginBottom: 20, textAlign: "center" }}>
          מכתוב בתקשורת
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {CLIENT.media.map((m, i) => (
            <div
              key={i}
              style={{
                background: SOFT,
                border: `1px solid ${BDR}`,
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 700,
                color: FG,
              }}
            >
              {m.outlet}
            </div>
          ))}
        </div>
      </section>

      {/* ── Org testimonials ── */}
      <section style={{ background: BG_D, borderTop: `1px solid ${BDR}`, marginTop: 56, padding: "56px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: ACC, letterSpacing: "0.08em", marginBottom: 8 }}>
              המלצות ארגונים
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: FG }}>
              מה אומרים עלינו מנהלי עמותות ואנשי טיפול
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {CLIENT.org_testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 16,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 20 20" fill={ACC}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: FG, lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: `1px solid ${ACC}1f` }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                    background: `${ACC}30`, color: ACC, border: `1px solid ${ACC}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 900,
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: FG }}>{t.person}</p>
                    <p style={{ fontSize: 12, color: ACC, marginTop: 2 }}>{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ maxWidth: 480, margin: "0 auto", padding: "64px 20px 80px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: FG, marginBottom: 12 }}>
          בא לך לכתוב מחדש את הסיפור שלך?
        </h2>
        <p style={{ fontSize: 15, color: MUT, marginBottom: 28, lineHeight: 1.6 }}>
          בחר/י את הדרך שמתאימה לך – ונתחיל יחד
        </p>
        <a
          href="/quiz"
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${ACC}, ${CLIENT.colors.accent_dark})`,
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
            borderRadius: 999,
            padding: "15px 40px",
            textDecoration: "none",
            boxShadow: `0 8px 24px ${ACC}44`,
          }}
        >
          מצא/י את הדרך שלך ←
        </a>
      </section>

    </div>
  );
}
