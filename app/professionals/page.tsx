import type { Metadata } from "next";
import Link from "next/link";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.professionals.title} | ${CLIENT.name}`,
  description: CLIENT.products.professionals.description,
  alternates: { canonical: "/professionals" },
};

const ACC   = CLIENT.colors.accent;
const ACC_D = CLIENT.colors.accent_dark;
const BG    = CLIENT.colors.bg;
const BG_D  = CLIENT.colors.bg_dark;
const CARD  = CLIENT.colors.card;
const SOFT  = CLIENT.colors.card_soft;
const BDR   = CLIENT.colors.border;
const FG    = CLIENT.colors.fg;
const MUT   = CLIENT.colors.fg_muted;

const WA_HREF = `https://wa.me/${CLIENT.whatsapp}?text=${encodeURIComponent("שלום הילה, אני מעוניין/ת לשמוע עוד על הכשרת אנשי מקצוע בשיטת מכתוב")}`;

const SYLLABUS = [
  { n: "01", title: "מבוא לשיטת מכתוב והטיפול הנרטיבי",      desc: "הכרת יסודות השיטה, עקרונות הטיפול הנרטיבי וכיצד כתיבה יוצרת שינוי פנימי." },
  { n: "02", title: "נרטיבים חוסמים ומחזקים",                 desc: "זיהוי הסיפורים שמגבילים ואלה שמעצימים — ולמידת כלים לעבודה עם שניהם." },
  { n: "03", title: "מסע הגיבור/ה",                           desc: "שימוש בקשת הגיבור ככלי לסיפור מחדש של חוויות ואתגרים." },
  { n: "04", title: "\"החלום שלי\" – מילים יוצרות מציאות",    desc: "תרגול כתיבה חזיונית ויסודות נוירו-פסיכולוגיים של שפה וציפייה. [פרונטלי]" },
  { n: "05", title: "אוטוביוגרפיה ב-5 פרקים ונוירופלסטיות",   desc: "מיפוי הסיפור האישי ולמידה כיצד הכתיבה מחוללת שינויים מוחיים ממשיים." },
  { n: "06", title: "כתיבה אינטואיטיבית",                     desc: "שחרור הקול הפנימי דרך כתיבה ללא שיפוט — טכניקה מרכזית להעברה עם מטופלים. [פרונטלי]" },
  { n: "07", title: "לגעת בכאב דרך כתיבה",                   desc: "כיצד הכתיבה מאפשרת מגע בטוח עם חומרים כואבים — כולל גבולות בטיחות לעבודה בשטח." },
  { n: "08", title: "חוזקות — כלים פנימיים",                  desc: "כתיבה ממוקדת חוזקות ואיך שיטת מכתוב משלבת פסיכולוגיה חיובית בתרגול יומי. [פרונטלי]" },
  { n: "09", title: "שילוב ורפלקציה",                         desc: "אינטגרציה של כל הכלים לתפיסה מעשית שניתן להתחיל ליישם מחר." },
  { n: "10", title: "חגיגת סיום ותעודה",                      desc: "הצגת יישומים אישיים, חגיגת השינוי וקבלת תעודת הכשרה בשיטת מכתוב. [פרונטלי]" },
];

const STATS = [
  { val: "100%", label: "שביעות רצון מהקורס" },
  { val: "100%", label: "ימליצו לעמיתים" },
  { val: "93%",  label: "יישמו כלים בשטח" },
  { val: "17",   label: "אנשי מקצוע שכבר מטפלים בשיטה" },
];

const TESTIMONIALS = [
  {
    text:    "מרצה נדירה שמצליחה לשלב ידע תיאורטי עמוק עם כלים מעשיים בצורה שמגיעה ישר ללב. יצאתי מכל מפגש עם משהו שאני מיישמת כבר למחרת.",
    author:  "מורה בחינוך מיוחד",
    role:    "בוגרת הכשרת מכתוב",
  },
  {
    text:    "15 שנה של הוראה — וזו ההכשרה המשמעותית ביותר שעברתי. היא נתנה לי שפה חדשה לעבודה עם ילדים שעברו טראומה.",
    author:  "מחנכת כיתה ז׳",
    role:    "בוגרת הכשרת מכתוב",
  },
  {
    text:    "הילה הביאה שיטה שמגשרת בין הצוות לתלמידים. אחרי ההכשרה התחלתי להנחות מפגשי כתיבה בכיתה — התוצאות פשוט הדהימו אותי.",
    author:  "יועצת בית ספרית",
    role:    "בוגרת הכשרת מכתוב",
  },
];

const FOR_WHO = [
  { icon: "📚", label: "מורים ומחנכים", desc: "לשלב כלי כתיבה בכיתה, שיעורי ביטוי ועבודה רגשית עם תלמידים." },
  { icon: "🤝", label: "עובדים סוציאלים", desc: "לטפל ולהנחות קבוצות עם כלים מוכחים שמגיעים לאנשים גם בשעה קשה." },
  { icon: "🧠", label: "פסיכולוגים ומטפלים", desc: "להוסיף ממד טיפול נרטיבי ממוקד כתיבה לסל הכלים הטיפולי." },
  { icon: "💛", label: "מאמנים וקואצ׳רים", desc: "לעבות תהליכים עם שיטה מובנית שמניבה תובנות עמוקות במהירות." },
];

export default function ProfessionalsPage() {
  return (
    <main dir="rtl" lang="he" style={{ background: BG, fontFamily: "Assistant, sans-serif", color: FG }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(160deg, ${SOFT} 0%, ${BG} 100%)`, borderBottom: `1px solid ${BDR}`, padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: `${ACC}18`, border: `1px solid ${ACC}44`, borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 700, color: ACC, marginBottom: 20 }}>
            המוצר הדגל של מכתוב — B2B
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 20, color: FG }}>
            תלמד/י את שיטת מכתוב —<br />
            <span style={{ color: ACC }}>ותשלב/י אותה עם המטופלים שלך</span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: MUT, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
            הכשרה מקצועית ל-10 מפגשים למורים, עובדים סוציאלים, פסיכולוגים ומטפלים.
            תצא עם כלים מוכחים, תעודת הכשרה — ויכולת להנחות כתיבה טיפולית בכל הגדרה.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
                color: "#fff", fontWeight: 800, fontSize: 16,
                border: "none", borderRadius: 10, padding: "16px 32px", cursor: "pointer",
                textDecoration: "none",
              }}
            >
              אני רוצה לדעת עוד ←
            </a>
            <a href="#syllabus" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CARD, border: `1px solid ${BDR}`, color: FG, fontWeight: 700, fontSize: 15, borderRadius: 10, padding: "16px 28px", textDecoration: "none" }}>
              לסילבוס המלא ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section style={{ background: CARD, borderBottom: `1px solid ${BDR}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 900, color: ACC, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: MUT, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────── */}
      <section style={{ padding: "64px 24px", background: BG }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900, marginBottom: 20, color: FG, textAlign: "center" }}>
            אנשי מקצוע שמגיעים לאנשים —<br />
            <span style={{ color: ACC }}>ראויים לכלים שמגיעים לעומק</span>
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.8, textAlign: "center", marginBottom: 32 }}>
            את/ה כבר יודע/ת שיש לך השפעה. אבל כמה פעמים ישבת מול מטופל, תלמיד, מי שצריך אותך — ורצית כלי שפשוט&nbsp;<em>עובד</em>?
            כתיבה טיפולית היא אחת הגישות עם הבסיס המחקרי החזק ביותר לשינוי נרטיבי. שיטת מכתוב הפכה אותה למובנית, מעשית, וניתנת להעברה.
          </p>
          <div style={{ background: SOFT, border: `1px solid ${BDR}`, borderRadius: 14, padding: "28px 32px", borderRight: `4px solid ${ACC}` }}>
            <p style={{ fontSize: 16, color: FG, lineHeight: 1.8, margin: 0 }}>
              17 בוגרי ההכשרה שלנו כבר מיישמים את הכלים — בגנים, בבתי ספר, בטיפול פרטי ובמסגרות רווחה.
              <strong style={{ color: ACC }}> המשפיע הבא יכול להיות אתה.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── For who ──────────────────────────────────────────── */}
      <section style={{ background: BG_D, padding: "64px 24px", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: FG }}>
            למי ההכשרה מיועדת?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {FOR_WHO.map((w) => (
              <div key={w.label} style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 12, padding: "24px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{w.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: FG, marginBottom: 8 }}>{w.label}</div>
                <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Syllabus ─────────────────────────────────────────── */}
      <section id="syllabus" style={{ padding: "72px 24px", background: BG }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900, color: FG, marginBottom: 12 }}>
              10 מפגשים — מסע שלם
            </h2>
            <p style={{ fontSize: 15, color: MUT }}>30 שעות | שילוב זום ופרונטלי | קבוצות של 8–20 אנשי מקצוע</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SYLLABUS.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 16, background: CARD, border: `1px solid ${BDR}`, borderRadius: 12, padding: "20px 24px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: `${ACC}18`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: ACC }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: FG, marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section style={{ background: BG_D, padding: "64px 24px", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: FG }}>
            מה אומרים הבוגרים?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.author} style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 12, padding: "24px 20px" }}>
                <p style={{ fontSize: 15, color: FG, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ fontSize: 13, fontWeight: 700, color: ACC }}>{t.author}</div>
                <div style={{ fontSize: 12, color: MUT }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Format & logistics ───────────────────────────────── */}
      <section style={{ padding: "64px 24px", background: BG }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: FG }}>
            פרטים מעשיים
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "מספר מפגשים",    val: "10 מפגשים" },
              { label: "היקף שעות",       val: "30 שעות סה״כ" },
              { label: "פורמט",           val: "זום + פרונטלי" },
              { label: "גודל קבוצה",      val: "8–20 משתתפים" },
              { label: "תעודה",           val: "הכשרה מוכרת" },
              { label: "ניתן להתאמה",     val: "לצרכי הארגון" },
            ].map((item) => (
              <div key={item.label} style={{ background: SOFT, border: `1px solid ${BDR}`, borderRadius: 10, padding: "18px 20px" }}>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: FG }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Hila ───────────────────────────────────────── */}
      <section style={{ background: SOFT, padding: "64px 24px", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, color: FG, marginBottom: 16 }}>
            {CLIENT.about.title}
          </h2>
          <p style={{ fontSize: 15, color: MUT, lineHeight: 1.8, marginBottom: 24 }}>
            {CLIENT.about.body}
          </p>
          <p style={{ fontSize: 14, color: MUT, lineHeight: 1.7 }}>
            שיטת מכתוב נכללה בספר אקדמי בארה&quot;ב (2023) שסקר 13 שיטות אוריינות חדשניות מכל העולם —
            יחד עם פרויקטים מעירק, קמבודיה וארה&quot;ב.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="cta" style={{ padding: "72px 24px", background: BG, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: FG, marginBottom: 16 }}>
            מוכן/ה להפוך את הכתיבה לכלי הטיפולי שלך?
          </h2>
          <p style={{ fontSize: 15, color: MUT, lineHeight: 1.7, marginBottom: 32 }}>
            השאר/י פרטים ונדבר על התאמת ההכשרה לצרכים שלך — בין אם מדובר בהכשרה אישית, לצוות ארגוני, או שיתוף פעולה מתמשך.
          </p>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
              color: "#fff", fontWeight: 800, fontSize: 17,
              border: "none", borderRadius: 12, padding: "18px 40px", cursor: "pointer",
              textDecoration: "none",
            }}
          >
            שלח/י לי הודעה בוואצאפ ←
          </a>
          <div style={{ marginTop: 20, fontSize: 13, color: MUT }}>
            ללא התחייבות · תגובה תוך יום עסקים
          </div>
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${BDR}`, fontSize: 13, color: MUT }}>
            מחפש/ת קורס לעצמך (לא כאיש מקצוע)?{" "}
            <Link href="/" style={{ color: ACC, textDecoration: "none", fontWeight: 700 }}>
              לכל המוצרים ←
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
