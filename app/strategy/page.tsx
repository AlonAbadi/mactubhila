import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.strategy.title} | ${CLIENT.name}`,
  description: CLIENT.products.strategy.description,
  alternates: { canonical: "/strategy" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

const ACC  = CLIENT.colors.accent;
const ACC_D = CLIENT.colors.accent_dark;
const ACC_L = CLIENT.colors.accent_light;
const FG   = CLIENT.colors.fg;
const MUT  = CLIENT.colors.fg_muted;
const CARD = CLIENT.colors.card;
const BDR  = CLIENT.colors.border;
const BG   = CLIENT.colors.bg;

export default async function StrategyPage() {
  const price = String(PRODUCT_MAP.strategy_4000.price);
  const pg    = CLIENT.pages.strategy;
  const nc    = CLIENT.next_course;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.strategy.title}
        description={CLIENT.products.strategy.description}
        url={`${APP_URL}/strategy`}
        price={CLIENT.products.strategy.price}
        imageUrl={`${APP_URL}${CLIENT.products.strategy.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.strategy.title, url: `${APP_URL}/strategy` },
      ]} />

      {/* ── Next course date banner ── */}
      <div dir="rtl" style={{ background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`, color: "#fff", padding: "0", paddingTop: 72 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.85, marginBottom: 8 }}>
            ✦ המסע הבא מתחיל ✦
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            {nc.date} · {nc.day} בשעה {nc.time}
          </h2>
          <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 10 }}>
            📍 {nc.location} · קבוצה אינטימית של 8–10 משתתפים
          </p>
          <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 18 }}>
            🎖️ {nc.scholarships}
          </p>
          <a
            href={`https://wa.me/${CLIENT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#fff",
              color: ACC_D,
              fontWeight: 800,
              fontSize: 15,
              borderRadius: 999,
              padding: "12px 32px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            פרטים נוספים בווטסאפ ←
          </a>
        </div>
      </div>

      {/* ── Nova survivors social proof strip ── */}
      <div dir="rtl" style={{ background: `${ACC}0d`, borderBottom: `1px solid ${ACC}22`, padding: "20px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", alignItems: "center" }}>
          {[
            "100% דיווחו על השפעה חיובית",
            "100% הרגישו מקום בטוח",
            "91% עשו שינויים חיוביים בחייהם",
            "ליוינו גיבורי נובה · קיבוצים שהותקפו · נפגעי טראומה",
          ].map((s, i) => (
            <div key={i} style={{
              background: CARD,
              border: `1px solid ${BDR}`,
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: FG,
            }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <ProductLandingPage
        productName={CLIENT.products.strategy.title}
        price={PRODUCT_MAP.strategy_4000.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.strategy.title}</em></>}
        heroSub={CLIENT.products.strategy.description}
        stats={[
          { val: "10",   label: "מפגשים" },
          { val: price,  label: "₪" },
          { val: "100%", label: "ערבות" },
        ]}

        problemItems={pg.pain_points.map(t => ({ icon: "🔸", text: t }))}
        agitationText={pg.agitation}

        solutionTitle={pg.solution_title}
        solutionItems={pg.steps.map(s => ({ num: s.num, title: s.title, desc: s.desc }))}

        notForItems={[...pg.not_for]}
        forItems={[...pg.for_who]}

        whoName={CLIENT.name}
        whoRole={CLIENT.about.tagline}
        whoText={CLIENT.about.body}

        proofStats={[
          { val: CLIENT.survey_stats[0].number, label: CLIENT.survey_stats[0].label },
          { val: CLIENT.survey_stats[2].number, label: CLIENT.survey_stats[2].label },
        ]}
        testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}
      />
    </>
  );
}
