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
      style={{ background: "#101520", color: "#EDE9E1" }}
    >
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b px-4"
        style={{
          background: "rgba(16,21,32,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "#2C323E",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center h-14">
          <Link
            href="/hive"
            className="text-sm transition hover:opacity-80"
            style={{ color: "#9E9990" }}
          >
            ← חזור לכוורת
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Page title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black" style={{ color: "#EDE9E1" }}>
            תנאי מנוי הכוורת
          </h1>
          <p className="text-sm" style={{ color: "#9E9990" }}>
            {CLIENT.legal_name}
          </p>
        </div>

        {/* ── Section 1 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            1. מהו המנוי וכיצד הוא עובד
          </h2>
          <p className="leading-relaxed" style={{ color: "#9E9990" }}>
            הכוורת היא קהילה חודשית בתשלום המופעלת על ידי {CLIENT.legal_name}. המנוי מקנה גישה לתכנים
            בלעדיים, מפגשי זום חודשיים, וקהילת WhatsApp פעילה. ישנם שני מסלולים: מסלול פתוח לכולם
            (₪97/חודש) ומסלול מיוחד ללקוחות {CLIENT.name} (₪{CLIENT.products.hive.price_discounted}/חודש).
          </p>
        </section>

        {/* ── Section 2 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            2. מה כולל המנוי
          </h2>
          <ul className="flex flex-col gap-2 leading-relaxed" style={{ color: "#9E9990" }}>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>
                מפגש זום חודשי עם {CLIENT.name} - שעה אחת בחודש לשאלות, אסטרטגיה, ותוכן
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>תכנים בלעדיים לחברי הכוורת בלבד</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>גישה לקבוצת WhatsApp פעילה של חברי הכוורת</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>
                עדיפות בזום (במסלול ₪29 בלבד)
              </span>
            </li>
          </ul>
        </section>

        {/* ── Section 3 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            3. תנאי תשלום
          </h2>
          <p className="leading-relaxed" style={{ color: "#9E9990" }}>
            החיוב מתבצע חודשי באופן אוטומטי באמצעות Cardcom. החיוב הראשון מתבצע עם ההצטרפות.
            החיוב הבא מתבצע 30 יום לאחר ההצטרפות ובכל 30 יום לאחר מכן. המחיר כולל מע״מ.
          </p>
        </section>

        {/* ── Section 4 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            4. מדיניות ביטול
          </h2>
          <ul className="flex flex-col gap-3 leading-relaxed" style={{ color: "#9E9990" }}>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>
                <strong style={{ color: "#EDE9E1" }}>ביטול תוך 14 יום מיום ההצטרפות:</strong> זכאי
                להחזר כספי מלא, ללא שאלות.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>
                <strong style={{ color: "#EDE9E1" }}>ביטול לאחר 14 יום:</strong> המנוי יסתיים
                בסוף תקופת החיוב הנוכחית. לא יתבצע חיוב נוסף.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>
                לביטול יש לפנות ל:{" "}
                <a
                  href={`mailto:${CLIENT.email.from_email}`}
                  className="underline hover:opacity-80"
                  style={{ color: "#C9964A" }}
                >
                  {CLIENT.email.from_email}
                </a>{" "}
                או ללחוץ &#39;בטל מנוי&#39; באזור האישי.
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#C9964A" }}>•</span>
              <span>הודעת הביטול תטופל תוך 2 ימי עסקים.</span>
            </li>
          </ul>
        </section>

        {/* ── Section 5 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            5. מדיניות החזרים
          </h2>
          <p className="leading-relaxed" style={{ color: "#9E9990" }}>
            החזרים יינתנו בהתאם למדיניות הביטול המפורטת לעיל. החזר כספי יבוצע לאמצעי התשלום
            המקורי תוך 7-14 ימי עסקים.
          </p>
        </section>

        {/* ── Section 6 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            6. שינויים בתנאים
          </h2>
          <p className="leading-relaxed" style={{ color: "#9E9990" }}>
            {CLIENT.legal_name} שומרת לעצמה את הזכות לשנות את תנאי המנוי עם הודעה מוקדמת של 30 יום.
            ההודעה תישלח לאימייל הרשום.
          </p>
        </section>

        {/* ── Section 7 ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black" style={{ color: "#C9964A" }}>
            7. יצירת קשר
          </h2>
          <p className="leading-relaxed" style={{ color: "#9E9990" }}>
            לכל שאלה:{" "}
            <a
              href={`mailto:${CLIENT.email.from_email}`}
              className="underline hover:opacity-80"
              style={{ color: "#C9964A" }}
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
        style={{ background: "#101520", borderColor: "#2C323E", color: "#9E9990" }}
      >
        <p className="mb-2">
          <Link href="/hive" className="hover:text-[#EDE9E1] transition">
            ← חזור לכוורת
          </Link>
        </p>
        <p>
          © {new Date().getFullYear()} {CLIENT.legal_name} ·{" "}
          <Link href="/privacy" className="hover:text-[#EDE9E1] transition">
            מדיניות פרטיות
          </Link>
        </p>
      </footer>
    </div>
  );
}
