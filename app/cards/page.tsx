import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";
import { PRODUCT_MAP } from "@/lib/products";

export const metadata: Metadata = {
  title: `${CLIENT.products.cards.title} | ${CLIENT.name}`,
  description: CLIENT.products.cards.description,
  alternates: { canonical: "/cards" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

const ACC   = CLIENT.colors.accent;
const FG    = CLIENT.colors.fg;
const MUT   = CLIENT.colors.fg_muted;
const CARD  = CLIENT.colors.card;
const BDR   = CLIENT.colors.border;
const ACC_L = CLIENT.colors.accent_light;

function UpsellBanner() {
  return (
    <div
      dir="rtl"
      style={{
        background: ACC_L,
        border: `1px solid ${BDR}`,
        borderRadius: 16,
        padding: "20px 24px",
        margin: "0 auto 32px",
        maxWidth: 640,
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.85rem", color: MUT, marginBottom: 6 }}>
        רוצה את שיטת מכתוב המלאה בצורה מובנית?
      </p>
      <a
        href="/course"
        style={{
          fontWeight: 700,
          fontSize: "0.95rem",
          color: ACC,
          textDecoration: "none",
        }}
      >
        הקורס הדיגיטלי – 6 מפגשים מוקלטים – ₪575 ←
      </a>
    </div>
  );
}

function SampleCards() {
  const samples = [
    { title: "קלף ה'לפני'", desc: "מה אני מרגיש/ה ממש עכשיו, לפני שאני מתחיל/ה?" },
    { title: "קלף 'הסיפור שאני מספר/ת'", desc: "מה הסיפור שאני מספר/ת לעצמי על המצב הזה? האם הוא נכון?" },
    { title: "קלף 'הקול הפנימי'", desc: "אם הקול הפנימי הכי חכם שלי היה מדבר – מה הוא היה אומר?" },
    { title: "קלף 'סוף פרק'", desc: "אם הפרק הזה בחייי היה מסתיים עכשיו – מה הייתי רוצה שכתוב בו?" },
  ];

  return (
    <div
      dir="rtl"
      style={{
        maxWidth: 720,
        margin: "0 auto 48px",
        padding: "0 16px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: 800,
          color: FG,
          marginBottom: 20,
        }}
      >
        4 קלפים לדוגמה
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {samples.map((c) => (
          <div
            key={c.title}
            style={{
              background: CARD,
              border: `1px solid ${BDR}`,
              borderRadius: 14,
              padding: "18px 20px",
              borderTop: `3px solid ${ACC}`,
            }}
          >
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: ACC, marginBottom: 8 }}>
              {c.title}
            </p>
            <p style={{ fontSize: "0.875rem", color: MUT, lineHeight: 1.65, margin: 0 }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CardsPage() {
  const pg    = CLIENT.pages.cards;
  const price = PRODUCT_MAP.cards_149.price;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Product"
        name={CLIENT.products.cards.title}
        description={CLIENT.products.cards.description}
        url={`${APP_URL}/cards`}
        price={price}
        imageUrl={`${APP_URL}${CLIENT.products.cards.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.cards.title, url: `${APP_URL}/cards` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.cards.title}
        price={price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.cards.title}</em></>}
        heroSub={CLIENT.products.cards.description}
        stats={[
          { val: "30",    label: "קלפים" },
          { val: "5",     label: "תרגילים מודרכים" },
          { val: "45",    label: "דקות מדריך מוקלט" },
          { val: "מיידי", label: "גישה דיגיטלית" },
        ]}

        problemItems={pg.pain_points.map(t => ({ icon: "✓", text: t }))}
        agitationText={pg.agitation}

        solutionTitle={pg.solution_title}
        solutionDesc={pg.solution_desc}
        solutionItems={pg.steps.map(s => ({ num: s.num, title: s.title, desc: s.desc }))}

        notForItems={[...pg.not_for]}
        forItems={[...pg.for_who]}

        whoName={CLIENT.name}
        whoRole={CLIENT.about.tagline}
        whoText={CLIENT.about.body}

        proofStats={[
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
          { val: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
        ]}
        testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}

        bottomSlot={<><SampleCards /><UpsellBanner /></>}
      />
    </>
  );
}
