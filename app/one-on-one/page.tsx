import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.partnership.title} | ${CLIENT.name}`,
  description: CLIENT.products.partnership.description,
  alternates: { canonical: "/one-on-one" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default function PartnershipPage() {
  const pg    = CLIENT.pages.partnership;
  const price = CLIENT.products.partnership.price;

  const faqItems = pg.faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.partnership.title}
        description={CLIENT.products.partnership.description}
        url={`${APP_URL}/one-on-one`}
        price={price}
        imageUrl={`${APP_URL}${CLIENT.products.partnership.image}`}
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.partnership.title, url: `${APP_URL}/one-on-one` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.partnership.title}
        price={price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.partnership.title}</em></>}
        heroSub={CLIENT.products.partnership.description}
        stats={[
          { val: String(price),                          label: "₪" },
          { val: CLIENT.social_proof.stat1.number,       label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number,       label: CLIENT.social_proof.stat2.label },
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
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
        ]}
        testimonials={pg.testimonials.map(t => ({ text: t.text, author: t.author, role: t.role }))}

        faqSectionTitle="שאלות נפוצות"
        faqs={pg.faqs.map(f => ({ q: f.q, a: f.a }))}

        finalTitle={pg.final_title}
        finalSub={pg.final_sub}

        hideMicroCommitment
      />
    </>
  );
}
