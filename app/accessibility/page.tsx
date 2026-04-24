import type { Metadata } from "next";
import Link from "next/link";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `הצהרת נגישות | ${CLIENT.name}`,
  description: `הצהרת נגישות האתר של ${CLIENT.legal_name} – עמידה בתקן ישראלי ת"י 5568 ו-WCAG 2.1 AA.`,
};

const FG  = CLIENT.colors.fg;
const MUT = CLIENT.colors.fg_muted;
const ACC = CLIENT.colors.accent;
const BG  = CLIENT.colors.bg;
const BG_D = CLIENT.colors.bg_dark;
const BDR = CLIENT.colors.border;
const CARD = CLIENT.colors.card;

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen font-assistant" style={{ background: BG, color: FG }} dir="rtl">
      <main id="main-content" className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-black mb-2" style={{ color: FG }}>הצהרת נגישות</h1>
        <p className="text-sm mb-10" style={{ color: MUT }}>תאריך עדכון אחרון: אפריל 2026</p>

        {/* Legal statement */}
        <section aria-labelledby="legal-heading" className="mb-10 rounded-2xl p-6" style={{ background: BG_D, border: `1px solid ${ACC}33` }}>
          <h2 id="legal-heading" className="text-lg font-bold mb-3" style={{ color: ACC }}>הצהרה לפי חוק</h2>
          <p className="leading-relaxed" style={{ color: FG }}>
            אתר זה עומד בדרישות{" "}
            <strong>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) תשע״ג 2013</strong>.
            הנגשת האתר בוצעה בהתאם לתקן הישראלי{" "}
            <strong>ת״י 5568</strong> ולתקן הבינלאומי <strong>WCAG 2.1 ברמה AA</strong>.
          </p>
        </section>

        {/* Conformance level */}
        <section aria-labelledby="conformance-heading" className="mb-10">
          <h2 id="conformance-heading" className="text-xl font-bold mb-4" style={{ color: FG }}>רמת נגישות</h2>
          <dl className="flex flex-col gap-3">
            {[
              { term: "תקן",          def: "ת״י 5568 / WCAG 2.1" },
              { term: "רמת עמידה",    def: "AA" },
              { term: "תאריך הנגשה", def: "אפריל 2026" },
              { term: "גורם מנגיש",   def: CLIENT.legal_name },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-4 items-baseline pb-3" style={{ borderBottom: `1px solid ${BDR}` }}>
                <dt className="text-sm font-semibold w-36 flex-shrink-0" style={{ color: MUT }}>{term}</dt>
                <dd className="font-medium" style={{ color: FG }}>{def}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Accessibility features */}
        <section aria-labelledby="features-heading" className="mb-10">
          <h2 id="features-heading" className="text-xl font-bold mb-4" style={{ color: FG }}>תכונות הנגישות באתר</h2>
          <ul className="flex flex-col gap-2 leading-relaxed" role="list" style={{ color: FG }}>
            {[
              "כפתור נגישות קבוע בפינת המסך – שינוי גודל טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, עצירת אנימציות ומצב קריאה",
              "קישור דילוג לתוכן הראשי (Skip to main content) בכל עמוד",
              "מבנה כותרות היררכי תקין (H1 ← H2 ← H3) בכל עמוד",
              "כל שדות הטופס מוגדרים עם תוויות (labels) נגישות",
              "כל הכפתורים כוללים תיאור aria-label",
              "כל תמונות האתר כוללות תיאור טקסטואלי alt",
              "ניווט מלא באמצעות מקלדת",
              "מדד ניגודיות צבעים עומד בתקן AA (4.5:1 מינימום)",
              "תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)",
              "ממשק מלא בעברית עם כיווניות RTL תקינה",
              "תגית lang='he' על תגית ה-HTML הראשית",
              "הגדרות הנגישות נשמרות בדפדפן לביקורים עתידיים",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0" style={{ color: ACC }} aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Supported browsers */}
        <section aria-labelledby="browsers-heading" className="mb-10">
          <h2 id="browsers-heading" className="text-xl font-bold mb-4" style={{ color: FG }}>דפדפנים ותוכנות נתמכות</h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${BDR}` }}>
            <table className="w-full text-sm border-collapse" aria-label="דפדפנים ותוכנות נתמכות">
              <thead>
                <tr style={{ background: BG_D }}>
                  <th scope="col" className="text-right px-4 py-2 font-semibold" style={{ color: MUT, borderBottom: `1px solid ${BDR}` }}>דפדפן / תוכנה</th>
                  <th scope="col" className="text-right px-4 py-2 font-semibold" style={{ color: MUT, borderBottom: `1px solid ${BDR}` }}>מערכת הפעלה</th>
                  <th scope="col" className="text-right px-4 py-2 font-semibold" style={{ color: MUT, borderBottom: `1px solid ${BDR}` }}>גרסה מינימלית</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Chrome",             "Windows / macOS / Android", "עדכנית"],
                  ["Firefox",            "Windows / macOS",            "עדכנית"],
                  ["Safari",             "macOS / iOS",                "גרסה 15+"],
                  ["Edge",               "Windows",                    "עדכנית"],
                  ["NVDA + Chrome",      "Windows",                    "NVDA 2022+"],
                  ["VoiceOver + Safari", "macOS / iOS",                "מובנה במערכת"],
                ].map(([browser, os, version], idx) => (
                  <tr key={browser} style={{ background: idx % 2 === 0 ? CARD : BG_D }}>
                    <td className="px-4 py-2 font-medium" style={{ borderTop: `1px solid ${BDR}`, color: FG }}>{browser}</td>
                    <td className="px-4 py-2" style={{ borderTop: `1px solid ${BDR}`, color: MUT }}>{os}</td>
                    <td className="px-4 py-2" style={{ borderTop: `1px solid ${BDR}`, color: MUT }}>{version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Known limitations */}
        <section aria-labelledby="limitations-heading" className="mb-10">
          <h2 id="limitations-heading" className="text-xl font-bold mb-4" style={{ color: FG }}>מגבלות ידועות</h2>
          <ul className="flex flex-col gap-2 leading-relaxed" role="list" style={{ color: FG }}>
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0" style={{ color: "#D97706" }} aria-hidden="true">⚠</span>
              <span>תוכן וידאו חיצוני (Vimeo) עשוי שלא לכלול כתוביות – מוגבלות של הפלטפורמה החיצונית.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0" style={{ color: "#D97706" }} aria-hidden="true">⚠</span>
              <span>עמוד סליקת האשראי (Cardcom) הוא שירות צד-שלישי ונגישותו נמצאת באחריות הספק.</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="mb-10 rounded-2xl p-6" style={{ background: BG_D, border: `1px solid ${BDR}` }}>
          <h2 id="contact-heading" className="text-xl font-bold mb-3" style={{ color: FG }}>יצירת קשר בנושא נגישות</h2>
          <p className="leading-relaxed mb-4" style={{ color: MUT }}>
            נתקלתם בבעיית נגישות? נשמח לשמוע ולתקן. ניתן לפנות אלינו:
          </p>
          <dl className="flex flex-col gap-2" style={{ color: FG }}>
            <div className="flex gap-3">
              <dt className="font-semibold flex-shrink-0">אימייל:</dt>
              <dd>
                <a href={`mailto:${CLIENT.email.from_email}`} className="underline hover:opacity-70 transition" style={{ color: ACC }}>
                  {CLIENT.email.from_email}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-semibold flex-shrink-0">וואטסאפ:</dt>
              <dd>
                <a href={`https://wa.me/${CLIENT.whatsapp}`} className="underline hover:opacity-70 transition" style={{ color: ACC }}>
                  שלח הודעה
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-semibold flex-shrink-0">זמן מענה:</dt>
              <dd style={{ color: MUT }}>עד 5 ימי עסקים</dd>
            </div>
          </dl>
        </section>

        {/* Complaint process */}
        <section aria-labelledby="complaint-heading" className="mb-12">
          <h2 id="complaint-heading" className="text-xl font-bold mb-3" style={{ color: FG }}>הגשת תלונה</h2>
          <p className="leading-relaxed" style={{ color: MUT }}>
            אם לא קיבלתם מענה מספק לאחר פנייתכם אלינו, ניתן לפנות לנציב שוויון זכויות לאנשים עם מוגבלות במשרד המשפטים.
          </p>
        </section>

        {/* Footer nav */}
        <nav aria-label="ניווט בתחתית הצהרת הנגישות" className="pt-6 flex gap-4 text-sm flex-wrap" style={{ borderTop: `1px solid ${BDR}`, color: MUT }}>
          <Link href="/" className="hover:opacity-70 transition" style={{ color: ACC }}>דף הבית</Link>
          <Link href="/privacy" className="hover:opacity-70 transition" style={{ color: ACC }}>מדיניות פרטיות</Link>
          <Link href="/terms" className="hover:opacity-70 transition" style={{ color: ACC }}>תנאי שימוש</Link>
        </nav>

      </main>
    </div>
  );
}
