// Quiz display config — used by /quiz page and /account page.
export type Answer = "A" | "B" | "C" | "D";
export type BulletRule = { q: number; a: Answer; text: string };

export const PRODUCT_IMAGE: Record<string, string> = {
  free_training: "/training.jpg",
  challenge:     "/challenge.jpg",
  hive:          "/og-image.jpg",
};

export const PRODUCT_META: Record<string, string> = {
  free_training: "סרטון חינמי · 20 דקות",
  challenge:     "7 ימים · אונליין · ₪197",
  hive:          "קהילה חודשית · ₪97/חודש",
};

export const PRODUCT_DESC: Record<string, string> = {
  free_training: "טעימה ראשונה ממכתוב – להבין לפני שמתחייבים",
  challenge:     "שבעה ימים שפותחים את הכתיבה מחדש",
  hive:          "שגרת כתיבה שבועית עם קהילה שמבינה",
};

export const CTA_TEXT: Record<string, string> = {
  free_training: "לצפות עכשיו – חינם",
  challenge:     "להצטרף לאתגר",
  hive:          "להצטרף לקהילה",
};

// q = question index (0-based), a = "A"|"B"|"C"|"D"
// Questions: q0=מה מגביל, q1=קשר עם כתיבה, q2=מה רוצה להשיג
export const BULLET_RULES: Record<string, BulletRule[]> = {
  free_training: [
    { q: 0, a: "B", text: "20 דקות בלבד – מושלם גם כשהזמן מוגבל" },
    { q: 0, a: "D", text: "ללא התחייבות – תראה/י קודם מה זה מכתוב" },
    { q: 1, a: "D", text: "נקודת הפתיחה הכי נכונה למי שמתחיל/ה מאפס" },
    { q: 2, a: "B", text: "תגלה/י דרך הכתיבה מה באמת חשוב לך" },
  ],
  challenge: [
    { q: 0, a: "A", text: "7 ימים שמוכיחים לך שאתה/את כותב/ת טוב" },
    { q: 1, a: "A", text: "מבנה יומי ברור שעוזר לסיים את מה שמתחילים" },
    { q: 1, a: "B", text: "הנחיה יומית שמוציאה ממך את הכתיבה – גם כשלא יוצא" },
    { q: 2, a: "C", text: "7 ימים של הצלחות קטנות שמחזקות את הביטחון" },
    { q: 2, a: "D", text: "תצא/י עם 7 טקסטים שיצרת – משהו אמיתי" },
  ],
  hive: [
    { q: 0, a: "C", text: "הקהילה נותנת לך נושאים ורעיונות לכתיבה בכל שבוע" },
    { q: 1, a: "C", text: "הרגל כתיבה שמחזיר/ה אותך לכתוב – עם תמיכה" },
    { q: 2, a: "A", text: "מרחב בטוח לשתף ולהשתחרר דרך כתיבה" },
    { q: 2, a: "B", text: "בכל שבוע תגלה/י שכבה נוספת של עצמך" },
  ],
};

export function getPersonalizedReasons(answers: Answer[], productId: string): string[] {
  const rules = BULLET_RULES[productId] ?? [];
  const matched = rules.filter((r) => answers[r.q] === r.a).map((r) => r.text);
  const fallbacks: Record<string, string[]> = {
    free_training: ["ללא התחייבות", "20 דקות בלבד", "נקודת פתיחה מושלמת"],
    challenge:     ["7 ימים, 7 כלים", "עם קהילה תומכת", "ערבות החזר כספי"],
    hive:          ["שגרת כתיבה קבועה", "קהילה שמבינה", "ניתן לביטול בכל עת"],
  };
  return [...new Set([...matched, ...(fallbacks[productId] ?? [])])].slice(0, 3);
}
