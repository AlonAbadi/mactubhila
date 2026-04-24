import Link from "next/link";
import type { Metadata } from "next";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `תנאי שימוש | ${CLIENT.name}`,
  description: `תנאי השימוש של ${CLIENT.legal_name} – מדיניות ביטולים, גישה לתוכן, תשלום וקניין רוחני.`,
};

const FG  = CLIENT.colors.fg;
const MUT = CLIENT.colors.fg_muted;
const ACC = CLIENT.colors.accent;
const BG  = CLIENT.colors.bg;
const BDR = CLIENT.colors.border;
const BG_D = CLIENT.colors.bg_dark;

export default function TermsPage() {
  return (
    <div dir="rtl" className="font-assistant min-h-screen" style={{ background: BG, color: MUT }}>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: FG, marginBottom: 8 }}>תנאי שימוש</h1>
          <p style={{ fontSize: 14, color: MUT }}>עדכון אחרון: אפריל 2026</p>
        </div>

        <Section title="1. הסכמה לתנאים">
          <p>
            השימוש באתר ובשירותים המוצעים על ידי {CLIENT.legal_name} (&quot;החברה&quot;) מהווה הסכמה מלאה לתנאי שימוש אלה. אם אינך מסכים לתנאים, אנא הפסק את השימוש באתר.
          </p>
        </Section>

        <Section title="2. השירותים">
          <p>החברה מציעה את השירותים הדיגיטליים הבאים:</p>
          <ul style={{ paddingRight: 20, display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            <li><B>שיעור מתנה</B> – שיעור וידאו חינמי של 20 דקות, ללא התחייבות</li>
            <li><B>קלפי מכתוב דיגיטליים (₪149)</B> – 30 קלפים + מדריך מוקלט + 5 תרגילי כתיבה, גישה מיידית</li>
            <li><B>קורס מכתוב הדיגיטלי (₪575)</B> – 6 מפגשים מוקלטים, צפייה בקצב עצמאי</li>
            <li><B>קורס דיגיטלי + ליווי אישי (₪1,100)</B> – הקורס הדיגיטלי + 2 מפגשי ליווי נרטיבי + קריאת טקסטים</li>
            <li><B>קורס מכתוב המלא – פרדס חנה (₪4,100)</B> – 10 מפגשים פרונטליים בני שעתיים בקבוצה אינטימית</li>
            <li><B>ליווי נרטיבי אישי (₪1,900)</B> – 6 מפגשים אישיים בני שעה + קורס דיגיטלי במתנה</li>
          </ul>
        </Section>

        <Section title="3. חשבון משתמש">
          <p><B>3.1 יצירת חשבון:</B> ניתן להירשם עם אימייל וסיסמה, או דרך Google Sign-In. אתה אחראי לשמור את פרטי הגישה לחשבונך בסודיות.</p>
          <p><B>3.2 דיוק המידע:</B> אתה מתחייב לספק מידע מדויק ועדכני בעת ההרשמה.</p>
          <p><B>3.3 סגירת חשבון:</B> ניתן לסגור את חשבונך בכל עת. סגירת חשבון לא מזכה בהחזר כספי על רכישות שבוצעו.</p>
        </Section>

        <Section title="4. תשלום, קרדיט וביטולים">
          <p><B>4.1 מחירים:</B> כל המחירים מצוינים בשקלים חדשים וכוללים מע״מ בהתאם לחוק.</p>
          <p><B>4.2 מערכת קרדיט:</B> כל רכישה מזכה בקרדיט השווה לסכום ששולם. הקרדיט מנוצל ברכישה הבאה ואינו ניתן להמרה למזומן.</p>
          <p><B>4.3 תנאי ביטול לפי מוצר:</B></p>
          <div style={{ background: BG_D, border: `1px solid ${BDR}`, borderRadius: 8, padding: 16, marginTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ color: FG, fontWeight: 700, marginBottom: 4 }}>קלפי מכתוב דיגיטליים (₪149)</p>
              <p>מוצר דיגיטלי עם גישה מיידית. לאחר הורדת הקלפים אין החזר כספי. ביטול תוך שעה מהרכישה ולפני גישה לתוכן – החזר מלא.</p>
            </div>
            <div>
              <p style={{ color: FG, fontWeight: 700, marginBottom: 4 }}>קורס מכתוב הדיגיטלי (₪575)</p>
              <p>ביטול תוך 48 שעות מרגע הרכישה ובתנאי שנצפה פחות ממפגש אחד – החזר מלא. לאחר מכן אין החזר.</p>
            </div>
            <div>
              <p style={{ color: FG, fontWeight: 700, marginBottom: 4 }}>קורס דיגיטלי + ליווי אישי (₪1,100)</p>
              <p>ביטול עד 48 שעות לפני המפגש הראשון – החזר מלא. לאחר תחילת הליווי אין החזר.</p>
            </div>
            <div>
              <p style={{ color: FG, fontWeight: 700, marginBottom: 4 }}>קורס מכתוב המלא – פרדס חנה (₪4,100)</p>
              <p>ביטול עד 14 יום לפני תחילת הקורס – החזר מלא. ביטול בין 14-3 ימים לפני – החזר 50%. פחות מ-3 ימים לפני או לאחר תחילת הקורס – אין החזר.</p>
            </div>
            <div>
              <p style={{ color: FG, fontWeight: 700, marginBottom: 4 }}>ליווי נרטיבי אישי (₪1,900)</p>
              <p>ביטול עד 24 שעות לפני המפגש הראשון – החזר מלא. לאחר המפגש הראשון – החזר יחסי בניכוי מפגשים שנוצלו.</p>
            </div>
          </div>
          <p style={{ marginTop: 8 }}><B>4.4 אופן ההחזר:</B> החזרים יינתנו לאמצעי התשלום המקורי תוך 14 ימי עסקים.</p>
        </Section>

        <Section title="5. גישה לתוכן דיגיטלי">
          <p><B>5.1 רישיון שימוש:</B> ברכישת מוצר דיגיטלי, ניתנת לך רישיון אישי, לא-בלעדי ולא-עביר לצפייה בתכנים לשימוש אישי בלבד.</p>
          <p><B>5.2 הגבלות – אסור:</B></p>
          <ul style={{ paddingRight: 20, display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            <li>לשתף פרטי גישה עם אחרים</li>
            <li>להקליט, להעתיק או להפיץ תכנים</li>
            <li>לעשות שימוש מסחרי בתכנים</li>
          </ul>
          <p><B>5.3 זמינות תוכן:</B> התכנים זמינים כל עוד החשבון פעיל. החברה שומרת לעצמה את הזכות לעדכן ולשנות תכנים מעת לעת.</p>
        </Section>

        <Section title="6. קניין רוחני">
          <p>
            כל התכנים באתר, לרבות שיטת מכתוב, טקסטים, תמונות, סרטונים ומצגות, הינם רכושה הבלעדי של {CLIENT.legal_name} ומוגנים בזכויות יוצרים ובדיני קניין רוחני. אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי בתכנים ללא אישור מפורש בכתב.
          </p>
        </Section>

        <Section title="7. הגבלת אחריות">
          <p>
            החברה אינה אחראית לתוצאות שיצמחו או לא יצמחו מהשימוש בתכנים ובשירותים. התוצאות תלויות במאמץ, בנסיבות ובגורמים רבים שאינם בשליטת החברה. האחריות המקסימלית של החברה לא תעלה על הסכום ששולם בפועל עבור השירות הספציפי.
          </p>
        </Section>

        <Section title="8. שינויים בשירות ובתנאים">
          <p>
            החברה רשאית לעדכן תנאים אלה ולשנות את השירותים המוצעים מעת לעת. במקרה של שינוי מהותי, תישלח הודעה לכתובת האימייל הרשומה לפחות 14 ימים מראש.
          </p>
        </Section>

        <Section title="9. דין וסמכות שיפוט">
          <p>
            תנאים אלה כפופים לדיני מדינת ישראל. סמכות השיפוט הבלעדית לכל סכסוך הנובע מתנאים אלה תהיה לבתי המשפט המוסמכים במחוז תל אביב.
          </p>
        </Section>

        <Section title="10. יצירת קשר">
          <p>{CLIENT.legal_name} | ח.פ. {CLIENT.company_id}</p>
          <p>אימייל: {CLIENT.email.from_email}</p>
          <p>
            <a href={`https://wa.me/${CLIENT.whatsapp}`} style={{ color: ACC }}>WhatsApp</a>
          </p>
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${BDR}`, textAlign: "center", fontSize: 13, color: MUT }}>
          <Link href="/" style={{ color: ACC, textDecoration: "none" }}>חזרה לדף הבית</Link>
          {" · "}
          <Link href="/privacy" style={{ color: ACC, textDecoration: "none" }}>מדיניות פרטיות</Link>
          {" · "}
          <Link href="/accessibility" style={{ color: ACC, textDecoration: "none" }}>הצהרת נגישות</Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const BDR_C = CLIENT.colors.border;
  return (
    <section style={{ marginTop: 40, paddingBottom: 32, borderBottom: `1px solid ${BDR_C}` }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: CLIENT.colors.fg, marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </section>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: CLIENT.colors.fg }}>{children}</strong>;
}
