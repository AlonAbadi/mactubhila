import { CLIENT } from "@/lib/client";

export type AbVariant = "A" | "B";

export interface VariantContent {
  headline: string;
  description: string;
  cta: string;
}

// Homepage hero A/B test: "landing_headline"
export const AB_CONTENT: Record<AbVariant, VariantContent> = {
  A: {
    headline:    CLIENT.hero.headline_a,
    description: CLIENT.hero.desc_a,
    cta:         CLIENT.hero.cta_a,
  },
  B: {
    headline:    CLIENT.hero.headline_b,
    description: CLIENT.hero.desc_b,
    cta:         CLIENT.hero.cta_b,
  },
};

export function parseVariant(value: string | undefined): AbVariant {
  if (value === "A" || value === "B") return value;
  return "A";
}
