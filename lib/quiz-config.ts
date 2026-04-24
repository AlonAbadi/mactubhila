// Quiz display config — used by /quiz page and /account page.
// PRODUCTS, QUESTIONS and SCORES live in app/quiz/QuizClient.tsx.
// This file contains display metadata per product — fill per client.

export type Answer = "A" | "B" | "C" | "D";
export type BulletRule = { q: number; a: Answer; text: string };

// ── Product display metadata ─────────────────────────────────────
// Keys must match the product IDs used in PRODUCTS inside QuizClient.tsx

export const PRODUCT_IMAGE: Record<string, string> = {
  // TODO: fill with real image paths after uploading to public/
  free_training: "/training.jpg",
  challenge:     "/challenge.jpg",
  hive:          "/og-image.jpg",
};

export const PRODUCT_META: Record<string, string> = {
  // Short descriptor shown under the product card
  free_training: "סרטון חינמי · 20 דקות",
  challenge:     "7 ימים · אונליין",
  hive:          "קהילה חודשית",
};

export const PRODUCT_DESC: Record<string, string> = {
  // One-sentence description for "Also consider" cards
  free_training: "נקודת הפתיחה — להבין לפני שמתחייבים",
  challenge:     "שבוע אחד שמשנה משהו בפנים",
  hive:          "שגרה קבועה עם קהילה שמבינה",
};

export const CTA_TEXT: Record<string, string> = {
  free_training: "לצפות עכשיו",
  challenge:     "להצטרף לאתגר",
  hive:          "להצטרף לקהילה",
};

// ── Personalized bullet rules ────────────────────────────────────
// Each rule maps a question index + answer to a personal reason text.
// Add rules that match patterns unique to each product.
// q = question index (0-based), a = "A"|"B"|"C"|"D"

export const BULLET_RULES: Record<string, BulletRule[]> = {
  free_training: [
    // TODO: fill per client quiz structure
  ],
  challenge: [
    // TODO: fill per client quiz structure
  ],
  hive: [
    // TODO: fill per client quiz structure
  ],
};

export function getPersonalizedReasons(answers: Answer[], productId: string): string[] {
  const rules = BULLET_RULES[productId] ?? [];
  const matched = rules.filter((r) => answers[r.q] === r.a).map((r) => r.text);
  const fallbacks: Record<string, string[]> = {
    // TODO: fill with 3 generic reasons per product
    free_training: ["ללא התחייבות", "פותח את הדלת", "20 דקות בלבד"],
    challenge:     ["שבוע שמשנה", "עם קהילה תומכת", "ערבות החזר"],
    hive:          ["שגרה קבועה", "קהילה שמבינה", "ניתן לביטול בכל עת"],
  };
  return [...new Set([...matched, ...(fallbacks[productId] ?? [])])].slice(0, 3);
}
