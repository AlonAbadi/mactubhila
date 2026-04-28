import type { Metadata } from "next";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `מלגות ומסלולים חברתיים | ${CLIENT.name}`,
  description: "מסלולי מלגה לנפגעי 7.10, נשות מילואים, חיילות, גיבורי נובה וחברי קיבוצים שהותקפו. כתיבה ככלי ריפוי וחוסן.",
  alternates: { canonical: "/scholarships" },
};

const ACC   = CLIENT.colors.accent;
const ACC_L = CLIENT.colors.accent_light;
const ACC_D = CLIENT.colors.accent_dark;
const FG    = CLIENT.colors.fg;
const MUT   = CLIENT.colors.fg_muted;
const BG    = CLIENT.colors.bg;
const BG_D  = CLIENT.colors.bg_dark;
const CARD  = CLIENT.colors.card;
const BDR   = CLIENT.colors.border;

const TRACKS = [
  {
    title: "נפגעי ונפגעות 7.10",
    desc: "מי שנמצא/ת בתהליך עיבוד ופיסור מאירועי 7 באוקטובר.",
    icon: "🕊️",
  },
  {
    title: "גיבורי ומחלצי נובה",
    desc: "משתתפי פסטיבל נובה, מחלצים ומי שאיבד קרוב במסיבה.",
    icon: "🌅",
  },
  {
    title: "נשות מילואים",
    desc: "נשות חיילי מילואים שמתמודדות עם העורף בבדידות.",
    icon: "🫂",
  },
  {
    title: "חיילות משרתות",
    desc: "חיילות בשירות חובה ומילואים הזקוקות לחוסן ועיבוד.",
    icon: "💪",
  },
  {
    title: "חברי קיבוצים שהותקפו",
    desc: "תושבי קיבוצי עוטף עזה וקהילות שעברו טראומה קולקטיבית.",
    icon: "🏡",
  },
  {
    title: "הורים שכולים",
    desc: "משפחות שאיבדו ילדיהן בשמירה על המדינה.",
    icon: "🌹",
  },
  {
    title: "לוחמים ולוחמות",
    desc: "חיילים בפעילות מבצעית או אחרי שחרור, הזקוקים לחוסן ועיבוד.",
    icon: "🛡️",
  },
  {
    title: "נפגעי PTSD",
    desc: "מי שמתמודד/ת עם פוסט-טראומה ומחפש/ת כלים לריפוי דרך כתיבה.",
    icon: "🌿",
  },
];

const TESTIMONIALS = [
  {
    text: "הקורס ציל אותי ונתן לי כלים להתמודד ברגעים הכי קשים. אלו המפגשים הכי חשובים שהיו לי בחיים. הצלחתי אחרי הקורס לייצר שינויים בדרך שבה אני חיה: אני קמה, אני הולכת, אני כותבת, אני יותר אוהבת את עצמי.",
    author: "אם שכולה מישובי הדרום",
    role: "בוגרת קורס גיבורי נובה",
    initial: "א",
  },
  {
    text: "בקורס מכתוב למדתי על עצמי, הכרתי כוחות שלא ידעתי שקיימים בי. למדתי טכניקות כתיבה שונות, שעזרו לי להעמיק בחוויות קשות מבלי להיפגע.",
    author: "חברת קיבוץ רעים",
    role: "בוגרת קורס מכתוב המלא",
    initial: "ח",
  },
  {
    text: "אני קמה, הולכת, כותבת. הכתיבה נתנה לי מקום שבו אני מותרת להיות לא בסדר – ולמצוא שם גם כוח.",
    author: "משתתפת מקבוצת גיבורי נובה",
    role: "בוגרת מכתוב",
    initial: "מ",
  },
];

const SURVEY = CLIENT.survey_stats;

export default function ScholarshipsPage() {
  const waMelaga = `https://wa.me/${CLIENT.whatsapp}?text=${encodeURIComponent("שלום הילה, אני מעוניין/ת לברר זכאות למלגה לקורס מכתוב.")}`;

  return (
    <div dir="rtl" style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ background: `linear-gradient(160deg, ${ACC_L} 0%, ${BG} 60%)`, padding: "96px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: ACC, letterSpacing: "0.12em", marginBottom: 14 }}>
            מסלולים חברתיים ● מכתוב
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: FG, lineHeight: 1.2, marginBottom: 20 }}>
            הכתיבה היא לא רק לאלה שיש להם כוח
          </h1>
          <p style={{ fontSize: "1.05rem", color: MUT, lineHeight: 1.75, marginBottom: 32, maxWidth: 580, margin: "0 auto 32px" }}>
            שיטת מכתוב נולדה מעבודה עם אוכלוסיות בסיכון ועם נפגעי טראומה.
            אם את/ה עוברת תקופה קשה – יש כאן מקום גם בשבילך.
          </p>
          <a
            href={waMelaga}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
              color: "#fff",
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: 9999,
              padding: "14px 40px",
              textDecoration: "none",
              boxShadow: `0 8px 24px ${ACC}44`,
            }}
          >
            בואי נדבר – ווטסאפ ←
          </a>
          <p style={{ fontSize: "0.8rem", color: MUT, marginTop: 12 }}>
            כל פנייה מטופלת באופן אישי ובדיסקרטיות מלאה
          </p>
        </div>
      </section>

      {/* ── Survey stats ── */}
      <section style={{ background: BG_D, padding: "48px 24px", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.85rem", fontWeight: 600, color: ACC, marginBottom: 24, letterSpacing: "0.05em" }}>
            מה אמרו בוגרות ובוגרי קורסי הטראומה של מכתוב
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {SURVEY.map((s) => (
              <div
                key={s.label}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 16,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "2.2rem", fontWeight: 900, color: ACC, marginBottom: 6 }}>{s.number}</p>
                <p style={{ fontSize: "0.82rem", color: MUT, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <section style={{ padding: "64px 24px", background: BG }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, color: FG, marginBottom: 8 }}>
            מסלולי מלגה פתוחים ל
          </h2>
          <p style={{ textAlign: "center", color: MUT, marginBottom: 40 }}>
            אנחנו בוחנות כל פנייה באופן אישי ועושות ככל יכולתנו להנגיש את המסע
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {TRACKS.map((t) => (
              <div
                key={t.title}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 16,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{t.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: FG, margin: 0 }}>{t.title}</h3>
                <p style={{ fontSize: "0.85rem", color: MUT, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: BG_D, padding: "64px 24px", borderTop: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: FG, marginBottom: 32 }}>
            מה אמרו אחרי
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 20,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <p style={{ fontSize: "0.9rem", color: FG, lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${BDR}`, paddingTop: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: `${ACC}33`, color: ACC,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.85rem",
                    border: `1px solid ${ACC}4d`,
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", color: FG, margin: 0 }}>{t.author}</p>
                    <p style={{ fontSize: "0.75rem", color: MUT, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to apply ── */}
      <section style={{ padding: "64px 24px", background: BG }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: FG, marginBottom: 16 }}>
            איך מגישים בקשת מלגה?
          </h2>
          <p style={{ color: MUT, lineHeight: 1.75, marginBottom: 32 }}>
            הדרך הכי פשוטה היא לשלוח הודעת ווטסאפ קצרה לילה. ספר/י לה מי את/ה ומה הסיטואציה.
            אין צורך בניירת – רק בכנות. כל פנייה מקבלת מענה אישי.
          </p>

          <div style={{
            background: CARD,
            border: `1px solid ${BDR}`,
            borderRadius: 20,
            padding: "28px 24px",
            marginBottom: 28,
            textAlign: "right",
          }}>
            {[
              "שלחי הודעת ווטסאפ לילה עם קצת פרטים על עצמך",
              "הילה תחזור אליך בתוך 48 שעות",
              "תדברו ותחליטו יחד מה המסלול המתאים",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: `${ACC}22`, color: ACC,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.8rem",
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: "0.9rem", color: FG, lineHeight: 1.6, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>

          <a
            href={waMelaga}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.05rem",
              borderRadius: 9999,
              padding: "16px 48px",
              textDecoration: "none",
              boxShadow: `0 8px 24px ${ACC}44`,
            }}
          >
            שלחי הודעה לילה ←
          </a>
          <p style={{ fontSize: "0.78rem", color: MUT, marginTop: 12 }}>
            {CLIENT.next_course.scholarships}
          </p>
        </div>
      </section>

    </div>
  );
}
