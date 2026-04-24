/**
 * Single source of truth for product config, prices, and scheduled dates.
 * All product pages import from here — never hardcode prices or dates.
 */
import { CLIENT } from "@/lib/client";

export const CHALLENGE_DATES = ["2026-04-16", "2026-05-14", "2026-06-11"] as const;
export const WORKSHOP_DATES  = ["2026-04-30", "2026-05-28", "2026-06-25"] as const;

/** Returns the first date in the array that hasn't passed yet (YYYY-MM-DD). */
export function getNextDate(dates: readonly string[]): string | null {
  const today = new Date().toISOString().split("T")[0];
  return dates.find((d) => d >= today) ?? null;
}

/** "2026-04-16" → "16.4" */
export function formatShort(d: string): string {
  const [, m, day] = d.split("-");
  return `${Number(day)}.${Number(m)}`;
}

/** "2026-04-16" → "16 באפריל" */
export function formatHebrew(d: string): string {
  const MONTHS = ["", "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
                       "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const [, m, day] = d.split("-");
  return `${Number(day)} ב${MONTHS[Number(m)]}`;
}

export const PRODUCT_MAP = {
  cards_149:      { name: "קלפי מכתוב דיגיטליים",          price: CLIENT.products.cards.price      },
  course_1800:    { name: "קורס מכתוב הדיגיטלי",            price: CLIENT.products.course.price     },
  workshop_1080:  { name: "קורס דיגיטלי + ליווי נרטיבי",   price: CLIENT.products.workshop.price   },
  strategy_4000:  { name: "קורס מכתוב המלא – פרדס חנה",    price: CLIENT.products.strategy.price   },
  challenge_197:  { name: "אתגר הכתיבה של מכתוב",          price: CLIENT.products.challenge.price  },
  premium_14000:  { name: "חבילה מלאה",                     price: CLIENT.products.premium.price    },
} as const;

export type ProductKey = keyof typeof PRODUCT_MAP;
