"use client";

import { useState } from "react";
import { CLIENT } from "@/lib/client";

type Tier = "basic_97" | "discounted_29";

const FEATURES_STANDARD = [
  "מפגש זום חודשי עם הילה",
  "תוכן בלעדי",
  "קבוצת WhatsApp פעילה",
];

const FEATURES_DISCOUNTED = [
  "מפגש זום חודשי עם הילה",
  "תוכן בלעדי",
  "קבוצת WhatsApp פעילה",
  "עדיפות בזום עם הילה",
];

export function HivePricingSection() {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<Tier>("basic_97");

  function handleOpenStandard() {
    setTier("basic_97");
    setOpen(true);
  }

  function handleOpenDiscounted() {
    setTier("discounted_29");
    setOpen(true);
  }

  return (
    <>
      <section
        id="pricing"
        className="max-w-3xl mx-auto px-4 pb-20"
        dir="rtl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Card 1: Standard ── */}
          <div
            className="rounded-3xl p-8 flex flex-col gap-6"
            style={{ background: "#E4F0EA", border: "1px solid #C5DDD2" }}
          >
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: "#7A9E8E" }}>
                פתוח לכולם
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black" style={{ color: "#1A2E25" }}>
                  ₪97
                </span>
                <span className="text-sm" style={{ color: "#7A9E8E" }}>
                  /חודש כולל מע״מ
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {FEATURES_STANDARD.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#1A2E25" }}>
                  <span style={{ color: "#EE7202" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleOpenStandard}
              className="w-full py-4 rounded-2xl font-black text-lg active:scale-[0.98] btn-navy-secondary"
            >
              הצטרף לכוורת ←
            </button>
          </div>

          {/* ── Card 2: Discounted ── */}
          <div
            className="rounded-3xl p-8 flex flex-col gap-6 relative"
            style={{
              background: "linear-gradient(145deg, #FFFFFF, #D0E8DA)",
              border: "1px solid rgba(238,114,2,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            {/* Badge */}
            <div
              className="absolute -top-3 right-6 text-xs font-black px-4 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #EE7202 0%, #EE7202 50%, #C55E00 100%)",
                color: "#FFFFFF",
              }}
            >
              לקוחות {CLIENT.name} 🐝
            </div>

            <div>
              <p className="text-xs font-semibold mb-3 mt-2" style={{ color: "rgba(45,122,95,0.7)" }}>
                מסלול מיוחד
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black" style={{ color: "#EE7202" }}>
                  ₪29
                </span>
                <span className="text-sm" style={{ color: "#7A9E8E" }}>
                  /חודש כולל מע״מ
                </span>
                <span
                  className="text-base line-through"
                  style={{ color: "rgba(158,153,144,0.5)" }}
                >
                  ₪97
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {FEATURES_DISCOUNTED.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#1A2E25" }}>
                  <span style={{ color: "#EE7202" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleOpenDiscounted}
                className="w-full py-4 rounded-full font-bold text-lg active:scale-[0.98] btn-cta-gold"
              >
                הצטרף עם ההטבה שלך ←
              </button>
              <p className="text-xs text-center" style={{ color: "rgba(158,153,144,0.6)" }}>
                זמין למי שעבר לפחות מוצר אחד של הילה
              </p>
            </div>
          </div>

        </div>
      </section>

      {open && (
        <HiveJoinFormModal
          tier={tier}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

// Modal that manages join flow state, pre-opened with a selected tier
function HiveJoinFormModal({ tier, onClose }: { tier: Tier; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<
    "form" | "checking" | "not_eligible" | "legal" | "submitting" | "success" | "pending_payment"
  >("form");

  const tierPrice = tier === "discounted_29" ? "₪29" : "₪97";

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !name.trim()) {
      setError("יש למלא שם ואימייל");
      return;
    }

    if (tier === "discounted_29") {
      setStep("checking");
      try {
        const res = await fetch("/api/hive/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = (await res.json()) as { eligible?: boolean };
        if (!data.eligible) {
          setStep("not_eligible");
          return;
        }
      } catch {
        setError("שגיאה בבדיקת הזכאות. נסה שוב.");
        setStep("form");
        return;
      }
    }

    setStep("legal");
  }

  async function handleConsentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;

    setStep("submitting");
    setError(null);

    try {
      const res = await fetch("/api/hive/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, tier }),
      });
      const data = (await res.json()) as { status?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "שגיאה בהצטרפות. נסה שוב.");
        setStep("legal");
        return;
      }

      if (data.status === "pending_payment") {
        setStep("pending_payment");
      } else {
        setStep("success");
      }
    } catch {
      setError("שגיאה בהצטרפות. נסה שוב.");
      setStep("legal");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 font-assistant"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8"
        style={{ background: "#E4F0EA", border: "1px solid #C5DDD2", color: "#1A2E25" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full transition hover:opacity-70"
          style={{ background: "#FFFFFF", color: "#7A9E8E" }}
          aria-label="סגור"
        >
          ✕
        </button>

        {/* ── FORM / CHECKING ── */}
        {(step === "form" || step === "checking") && (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5" dir="rtl">
            <div>
              <h2 className="text-2xl font-black mb-1" style={{ color: "#1A2E25" }}>
                הצטרף לכוורת 🐝
              </h2>
              <p className="text-sm" style={{ color: "#7A9E8E" }}>
                {tier === "discounted_29"
                  ? `מסלול לקוחות ${CLIENT.name} - ₪${CLIENT.products.hive.price_discounted}/חודש`
                  : "מסלול פתוח - ₪97/חודש"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#7A9E8E" }}>
                שם מלא
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ישראל ישראלי"
                required
                disabled={step === "checking"}
                className="rounded-xl px-4 py-3 text-base outline-none transition"
                style={{ background: "#FFFFFF", border: "1px solid #C5DDD2", color: "#1A2E25" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#EE7202")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#C5DDD2")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#7A9E8E" }}>
                אימייל
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={step === "checking"}
                className="rounded-xl px-4 py-3 text-base outline-none transition"
                style={{ background: "#FFFFFF", border: "1px solid #C5DDD2", color: "#1A2E25" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#EE7202")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#C5DDD2")}
              />
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: "#f87171" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={step === "checking"}
              className="w-full py-4 rounded-full font-bold text-lg active:scale-[0.98] disabled:opacity-50 btn-cta-gold"
            >
              {step === "checking" ? "בודק זכאות..." : "המשך ←"}
            </button>
          </form>
        )}

        {/* ── NOT_ELIGIBLE ── */}
        {step === "not_eligible" && (
          <div className="flex flex-col gap-6 text-center" dir="rtl">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
              style={{ background: "rgba(45,122,95,0.1)" }}
            >
              🐝
            </div>
            <div>
              <h2 className="text-xl font-black mb-2" style={{ color: "#1A2E25" }}>
                המחיר המיוחד הזה שמור ללקוחות הילה
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#7A9E8E" }}>
                רוצה להתחיל? בוא נכיר.
              </p>
            </div>
            <a
              href="/quiz"
              className="w-full py-4 rounded-full font-bold text-lg text-center transition hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #EE7202 0%, #EE7202 50%, #C55E00 100%)",
                color: "#FFFFFF",
                display: "block",
              }}
            >
              בוא נתחיל ←
            </a>
            <button
              onClick={onClose}
              className="text-sm transition hover:opacity-70"
              style={{ color: "#7A9E8E" }}
            >
              חזור
            </button>
          </div>
        )}

        {/* ── LEGAL / SUBMITTING ── */}
        {(step === "legal" || step === "submitting") && (
          <form onSubmit={handleConsentSubmit} className="flex flex-col gap-5" dir="rtl">
            <div>
              <h2 className="text-xl font-black mb-1" style={{ color: "#1A2E25" }}>
                פרטי המנוי
              </h2>
              <p className="text-sm" style={{ color: "#7A9E8E" }}>
                אנא קרא בעיון לפני האישור
              </p>
            </div>

            <div
              className="rounded-2xl p-5 flex flex-col gap-2 text-sm leading-relaxed"
              style={{
                background: "#E4F0EA",
                border: "1px solid rgba(238,114,2,0.08)",
                color: "#7A9E8E",
              }}
            >
              <p className="font-bold mb-1" style={{ color: "#1A2E25" }}>
                פרטי המנוי:
              </p>
              <p>• חיוב חודשי אוטומטי של {tierPrice} כולל מע״מ</p>
              <p>• ניתן לביטול בכל עת - ללא קנס</p>
              <p>• ביטול תוך 14 יום מההצטרפות: החזר מלא</p>
              <p>• ביטול לאחר 14 יום: המנוי יסתיים בסוף תקופת החיוב הנוכחית</p>
              <p>
                • לביטול:{" "}
                <a
                  href={`mailto:${CLIENT.email.from_email}`}
                  className="underline hover:opacity-80"
                  style={{ color: "#EE7202" }}
                >
                  {CLIENT.email.from_email}
                </a>{" "}
                או לחץ &#39;בטל מנוי&#39; באזור האישי
              </p>
              <p>• החיוב מתבצע דרך Cardcom בתשלום מאובטח</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={step === "submitting"}
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded cursor-pointer"
                style={{ accentColor: "#EE7202" }}
              />
              <span className="text-sm leading-relaxed" style={{ color: "#7A9E8E" }}>
                קראתי והבנתי את תנאי המנוי החודשי ואת מדיניות הביטול{" "}
                <a
                  href="/hive/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: "#EE7202" }}
                >
                  ← תנאי מנוי
                </a>
              </span>
            </label>

            {error && (
              <p className="text-sm text-center" style={{ color: "#f87171" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!consent || step === "submitting"}
              className="w-full py-4 rounded-full font-bold text-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed btn-cta-gold"
            >
              {step === "submitting" ? "שולח..." : "אשר והצטרף ←"}
            </button>
          </form>
        )}

        {/* ── PENDING_PAYMENT ── */}
        {step === "pending_payment" && (
          <div className="flex flex-col gap-5 text-center" dir="rtl">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
              style={{ background: "rgba(45,122,95,0.1)" }}
            >
              📧
            </div>
            <div>
              <h2 className="text-xl font-black mb-2" style={{ color: "#1A2E25" }}>
                הבקשה שלך התקבלה!
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#7A9E8E" }}>
                נחזור אליך עם פרטי תשלום בקרוב.
              </p>
              {email && (
                <p className="text-sm mt-2" style={{ color: "#7A9E8E" }}>
                  אימייל:{" "}
                  <span className="font-semibold" style={{ color: "#1A2E25" }}>
                    {email}
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl font-bold text-sm transition hover:opacity-70"
              style={{ background: "#FFFFFF", border: "1px solid #C5DDD2", color: "#7A9E8E" }}
            >
              סגור
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && (
          <div className="flex flex-col gap-5 text-center" dir="rtl">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
              style={{
                background: "rgba(238,114,2,0.08)", border: "1px solid rgba(238,114,2,0.20)",
              }}
            >
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#1A2E25" }}>
                ברוך הבא לכוורת 🐝
              </h2>
              {email && (
                <p className="text-sm" style={{ color: "#7A9E8E" }}>
                  פרטים נשלחו לאימייל:{" "}
                  <span className="font-semibold" style={{ color: "#1A2E25" }}>
                    {email}
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl font-bold text-sm transition hover:opacity-70"
              style={{ background: "#FFFFFF", border: "1px solid #C5DDD2", color: "#7A9E8E" }}
            >
              סגור
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
