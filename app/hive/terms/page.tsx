import type { Metadata } from "next";
import Link from "next/link";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `תנאי מנוי הכוורת | ${CLIENT.name}`,
};

export default function HiveTermsPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen font-assistant"
      style={{ background: "#E4F0EA", color: "#1A2E25" }}
    >
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b px-4"
        style={{
          background: "rgba(16,21,32,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "#C5DDD2",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center h-14">
          <Link
            href="/hive"
            className="text-sm transition hover:opacity-80"
            style={{ color: "#7A9E8E" }}
          >
            ← חזור לכוורת
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Page title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black" style={{ color: "#1A2E25" }}>
            תנאי מנוי הכוורת
          </h1>
          <p className="text-sm" style={{ color: "#7A9E8E" }}>
            {CLIENT.legal_name}
          </p>
        </div>

        {/* ── Section 1 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            1. מהו המנוי וכיצד הוא עובד
          </h2>
          <p className="leading-relaxed" style={{ color: "#7A9E8E" }}>
            הכוורת היא קהילה חודשית בתשלום המופעלת על ידי {CLIENT.legal_name}. המנוי מקנה גישה לתכנים
            בלעדיים, מפגשי זום חודשיים, וקהילת WhatsApp פעילה. ישנם שני מסלולים: מסלול פתוח לכולם
            (₪97/חודש) ומסלול מיוחד ללקוחות {CLIENT.name} (₪{CLIENT.products.hive.price_discounted}/חודש).
          </p>
        </section>

        {/* ── Section 2 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            2. מה כולל המנוי
          </h2>
          <ul className="flex flex-col gap-2 leading-relaxed" style={{ color: "#7A9E8E" }}>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>
                מפגש זום חודשי עם {CLIENT.name} - שעה אחת בחודש לשאלות, אסטרטגיה, ותוכן
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>תכנים בלעדיים לחברי הכוורת בלבד</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>גישה לקבוצת WhatsApp פעילה של חברי הכוורת</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>
                עדיפות בזום (במסלול ₪29 בלבד)
              </span>
            </li>
          </ul>
        </section>

        {/* ── Section 3 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            3. תנאי תשלום
          </h2>
          <p className="leading-relaxed" style={{ color: "#7A9E8E" }}>
            החיוב מתבצע חודשי באופן אוטומטי באמצעות Cardcom. החיוב הראשון מתבצע עם ההצטרפות.
            החיוב הבא מתבצע 30 יום לאחר ההצטרפות ובכל 30 יום לאחר מכן. המחיר כולל מע״מ.
          </p>
        </section>

        {/* ── Section 4 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            4. מדיניות ביטול
          </h2>
          <ul className="flex flex-col gap-3 leading-relaxed" style={{ color: "#7A9E8E" }}>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>
                <strong style={{ color: "#1A2E25" }}>ביטול תוך 14 יום מיום ההצטרפות:</strong> זכאי
                להחזר כספי מלא, ללא שאלות.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>
                <strong style={{ color: "#1A2E25" }}>ביטול לאחר 14 יום:</strong> המנוי יסתיים
                בסוף תקופת החיוב הנוכחית. לא יתבצע חיוב נוסף.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>
                לביטול יש לפנות ל:{" "}
                <a
                  href={`mailto:${CLIENT.email.from_email}`}
                  className="underline hover:opacity-80"
                  style={{ color: "#EE7202" }}
                >
                  {CLIENT.email.from_email}
                </a>{" "}
                או ללחוץ &#39;בטל מנוי&#39; באזור האישי.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#EE7202" }}>•</span>
              <span>הודעת הביטול תטופל תוך 2 ימי עסקים.</span>
            </li>
          </ul>
        </section>

        {/* ── Section 5 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            5. מדיניות החזרים
          </h2>
          <p className="leading-relaxed" style={{ color: "#7A9E8E" }}>
            החזרים יינתנו בהתאם למדיניות הביטול המפורטת לעיל. החזר כספי יבוצע לאמצעי התשלום
            המקורי תוך 7-14 ימי עסקים.
          </p>
        </section>

        {/* ── Section 6 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            6. שינויים בתנאים
          </h2>
          <p className="leading-relaxed" style={{ color: "#7A9E8E" }}>
            {CLIENT.legal_name} שומרת לעצמה את הזכות לשנות את תנאי המנוי עם הודעה מוקדמת של 30 יום.
            ההודעה תישלח לאימייל הרשום.
          </p>
        </section>

        {/* ── Section 7 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#EE7202" }}>
            7. יצירת קשר
          </h2>
          <p className="leading-relaxed" style={{ color: "#7A9E8E" }}>
            לכל שאלה:{" "}
            <a
              href={`mailto:${CLIENT.email.from_email}`}
              className="underline hover:opacity-80"
              style={{ color: "#EE7202" }}
            >
              {CLIENT.email.from_email}
            </a>
          </p>
        </section>

        {/* ── Last updated ── */}
        <p className="text-sm" style={{ color: "rgba(158,153,144,0.5)" }}>
          תאריך עדכון אחרון: מרץ 2026
        </p>

      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        className="border-t px-4 py-8 text-center text-xs"
        style={{ background: "#E4F0EA", borderColor: "#C5DDD2", color: "#7A9E8E" }}
      >
        <p className="mb-2">
          <Link href="/hive" className="hover:text-[#1A2E25] transition">
            ← חזור לכוורת
          </Link>
        </p>
        <p>
          © {new Date().getFullYear()} {CLIENT.legal_name} ·{" "}
          <Link href="/privacy" className="hover:text-[#1A2E25] transition">
            מדיניות פרטיות
          </Link>
        </p>
      </footer>
    </div>
  );
}
