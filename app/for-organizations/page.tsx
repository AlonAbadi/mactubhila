"use client";

import { useState } from "react";
import { CLIENT } from "@/lib/client";

const ACC   = CLIENT.colors.accent;
const ACC_L = CLIENT.colors.accent_light;
const ACC_D = CLIENT.colors.accent_dark;
const FG    = CLIENT.colors.fg;
const MUT   = CLIENT.colors.fg_muted;
const BG    = CLIENT.colors.bg;
const BG_D  = CLIENT.colors.bg_dark;
const CARD  = CLIENT.colors.card;
const BDR   = CLIENT.colors.border;

const SERVICE_TYPES = [
  {
    title: "חברות ותאגידים",
    desc: "סדנאות כתיבה לבניית תרבות ארגונית, חיזוק חוסן עובדים ושיפור התקשורת הפנימית. ניסיון עם Microsoft ועוד.",
    icon: "🏢",
    example: "1–3 ימי סדנה | עד 25 משתתפים",
  },
  {
    title: "עמותות ומגזר שלישי",
    desc: "ליווי אוכלוסיות בסיכון, נוער ממוקד קשב, מהגרים, נפגעי טראומה. ניסיון עם עלם, ילדים בסיכוי, מקום ועוד.",
    icon: "🤝",
    example: "סדרת מפגשים | גמישות לפי תקציב",
  },
  {
    title: "קיבוצים וקהילות",
    desc: "עיבוד טראומה קהילתית, בניית חוסן וחיבור מחדש לנרטיב הקהילתי. ניסיון עם קיבוצי עוטף עזה.",
    icon: "🌱",
    example: "מותאם אישית לכל קהילה",
  },
  {
    title: "מוסדות חינוך",
    desc: "סדנאות לפנימיות, בתי ספר ותכניות חוסן לנוער. ניסיון עם פנימיית עלמה, חסות הנוער ועוד.",
    icon: "📚",
    example: "מחזור שנתי | תכנית מורחבת",
  },
];

const ORG_TESTIMONIALS = CLIENT.org_testimonials;

export default function ForOrganizationsPage() {
  const [form, setForm] = useState({
    org: "",
    contact: "",
    type: "",
    size: "",
    budget: "",
    date: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.org || !form.contact || !form.type) return;
    setStatus("sending");
    try {
      const wa = `https://wa.me/${CLIENT.whatsapp}?text=${encodeURIComponent(
        `שלום הילה! פנייה מארגון לסדנת מכתוב.\n\nשם ארגון: ${form.org}\nאיש קשר: ${form.contact}\nסוג ארגון: ${form.type}\nמספר משתתפים: ${form.size}\nתקציב: ${form.budget}\nמועד מועדף: ${form.date}\nפרטים נוספים: ${form.notes}`
      )}`;
      window.open(wa, "_blank");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const INPUT_STYLE: React.CSSProperties = {
    width: "100%",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: "0.9rem",
    background: BG,
    border: `1px solid ${BDR}`,
    color: FG,
    outline: "none",
    boxSizing: "border-box",
  };

  const LABEL_STYLE: React.CSSProperties = {
    fontSize: "0.82rem",
    fontWeight: 600,
    color: MUT,
    display: "block",
    marginBottom: 6,
  };

  return (
    <div dir="rtl" style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ background: `linear-gradient(160deg, ${ACC_L} 0%, ${BG} 60%)`, padding: "96px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: ACC, letterSpacing: "0.12em", marginBottom: 14 }}>
            שירותים לארגונים ● מכתוב
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: FG, lineHeight: 1.2, marginBottom: 20 }}>
            כתיבה ככלי לבניית חוסן, תרבות וחיבור
          </h1>
          <p style={{ fontSize: "1rem", color: MUT, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 32px" }}>
            שיטת מכתוב מלווה חברות, עמותות וקהילות עם סדנאות מותאמות אישית.
            כל סדנה בנויה סביב הצרכים הספציפיים של הארגון שלך.
          </p>
          <a
            href="#form"
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
            לפרטים ולקבלת הצעה ←
          </a>
        </div>
      </section>

      {/* ── Service types ── */}
      <section style={{ padding: "64px 24px", background: BG }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.7rem", fontWeight: 800, color: FG, marginBottom: 8 }}>
            סוגי שירותים
          </h2>
          <p style={{ textAlign: "center", color: MUT, marginBottom: 40 }}>
            כל ארגון מקבל הצעה מותאמת לצרכיו, לגודלו ולתקציבו
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {SERVICE_TYPES.map((s) => (
              <div
                key={s.title}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 18,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", color: FG, margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: MUT, lineHeight: 1.65, margin: 0, flex: 1 }}>{s.desc}</p>
                <p style={{
                  fontSize: "0.78rem", fontWeight: 700,
                  color: ACC,
                  background: `${ACC}14`,
                  borderRadius: 8,
                  padding: "5px 12px",
                  margin: 0,
                  display: "inline-block",
                }}>{s.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Org testimonials ── */}
      <section style={{ background: BG_D, padding: "64px 24px", borderTop: `1px solid ${BDR}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: FG, marginBottom: 32 }}>
            ארגונים שעבדו עם מכתוב
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {ORG_TESTIMONIALS.map((t) => (
              <div
                key={t.person}
                style={{
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 20,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <p style={{ fontSize: "0.88rem", color: FG, lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${BDR}`, paddingTop: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: `${ACC}22`, color: ACC,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.85rem",
                    border: `1px solid ${ACC}3d`,
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.82rem", color: FG, margin: 0 }}>{t.person}</p>
                    <p style={{ fontSize: "0.75rem", color: ACC, margin: 0 }}>{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="form" style={{ padding: "72px 24px", background: BG }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: FG, marginBottom: 8 }}>
            לקבלת הצעה מותאמת
          </h2>
          <p style={{ textAlign: "center", color: MUT, marginBottom: 36 }}>
            מלאו את הפרטים ונחזור אליכם תוך 48 שעות
          </p>

          {status === "sent" ? (
            <div style={{
              background: `${ACC}14`, border: `1px solid ${ACC}33`,
              borderRadius: 20, padding: "40px 24px", textAlign: "center",
            }}>
              <p style={{ fontSize: "2rem", marginBottom: 12 }}>✓</p>
              <h3 style={{ fontWeight: 800, color: FG, marginBottom: 8 }}>ההודעה נשלחה!</h3>
              <p style={{ color: MUT, fontSize: "0.9rem" }}>נחזור אליך תוך 48 שעות</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={LABEL_STYLE}>שם הארגון *</label>
                  <input name="org" required value={form.org} onChange={handleChange} placeholder="שם הארגון / החברה" style={INPUT_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>שם איש קשר *</label>
                  <input name="contact" required value={form.contact} onChange={handleChange} placeholder="שם + תפקיד" style={INPUT_STYLE} />
                </div>
              </div>

              <div>
                <label style={LABEL_STYLE}>סוג הארגון *</label>
                <select name="type" required value={form.type} onChange={handleChange} style={INPUT_STYLE}>
                  <option value="">בחרו...</option>
                  <option value="חברה / תאגיד">חברה / תאגיד</option>
                  <option value="עמותה / מגזר שלישי">עמותה / מגזר שלישי</option>
                  <option value="קיבוץ / מושב / קהילה">קיבוץ / מושב / קהילה</option>
                  <option value="מוסד חינוכי">מוסד חינוכי (בית ספר, פנימייה)</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={LABEL_STYLE}>מספר משתתפים משוער</label>
                  <select name="size" value={form.size} onChange={handleChange} style={INPUT_STYLE}>
                    <option value="">בחרו...</option>
                    <option value="עד 15">עד 15</option>
                    <option value="15–30">15–30</option>
                    <option value="30–60">30–60</option>
                    <option value="60+">60+</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>תקציב משוער</label>
                  <select name="budget" value={form.budget} onChange={handleChange} style={INPUT_STYLE}>
                    <option value="">בחרו...</option>
                    <option value="עד ₪5,000">עד ₪5,000</option>
                    <option value="₪5,000–₪15,000">₪5,000–₪15,000</option>
                    <option value="₪15,000+">₪15,000+</option>
                    <option value="תלוי בהצעה">תלוי בהצעה</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={LABEL_STYLE}>מועד מועדף</label>
                <input name="date" value={form.date} onChange={handleChange} placeholder="חודש / רבעון" style={INPUT_STYLE} />
              </div>

              <div>
                <label style={LABEL_STYLE}>פרטים נוספים (אופציונלי)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="ספרו לנו על הארגון, הצרכים, האתגרים..."
                  rows={4}
                  style={{ ...INPUT_STYLE, resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#e05555", fontSize: "0.85rem", textAlign: "center" }}>
                  שגיאה בשליחה – אנא נסו שנית או פנו ישירות בווטסאפ
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: 9999,
                  padding: "15px",
                  border: "none",
                  cursor: status === "sending" ? "wait" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "שולח..." : "שליחה לקבלת הצעה ←"}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.8rem", color: MUT }}>
                או דברו ישירות עם הילה:{" "}
                <a
                  href={`https://wa.me/${CLIENT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: ACC, fontWeight: 700 }}
                >
                  ווטסאפ ←
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
