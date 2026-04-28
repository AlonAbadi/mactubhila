"use client";

import { useState } from "react";
import { BookingForm, type BookingSuccessData } from "@/app/in-person/book/BookingForm";
import { trackInitiateCheckout } from "@/lib/analytics";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1];
}

interface Props {
  bookedSlots:   { slot_date: string; slot_time: string }[];
  price:         string;
  credit:        number;
  whatsappPhone: string;
}

export function PremiumBookingFlow({ bookedSlots, price, credit, whatsappPhone }: Props) {
  const [phase, setPhase]     = useState<"booking" | "payment">("booking");
  const [booked, setBooked]   = useState<BookingSuccessData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const listPrice = Number(price);
  const toPay     = Math.max(0, listPrice - credit);

  function handleBooked(data: BookingSuccessData) {
    setBooked(data);
    setPhase("payment");
  }

  async function handlePayment() {
    if (!booked?.userId) return;
    setLoading(true);
    setError(null);
    try {
      trackInitiateCheckout("premium_14000", toPay);

      fetch("/api/events", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type:         "CHECKOUT_STARTED",
          anonymous_id: getCookie("anon_id"),
          metadata:     { product: "premium_14000", price: toPay },
        }),
      }).catch(() => {});

      const res = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ product: "premium_14000", user_id: booked.userId }),
      });

      if (res.status === 503) {
        const msg = encodeURIComponent(
          `היי הילה! קבעתי ל-${booked.date} ב-${booked.time} ורוצה לסיים את התשלום (₪${listPrice.toLocaleString("he-IL")})`
        );
        window.open(`https://wa.me/${whatsappPhone}?text=${msg}`, "_blank");
        return;
      }

      if (res.ok) {
        const { url } = await res.json();
        if (url) { window.location.href = url; return; }
      }

      setError("שגיאה בעת יצירת תשלום, נסה שוב");
    } catch {
      setError("שגיאת רשת, נסה שוב");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 1: Pick filming day ──────────────────────────────────
  if (phase === "booking") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold" style={{ color: "#EE7202" }}>
          שלב 1 מתוך 2 — בחירת תאריך ליום הצילום
        </p>
        <BookingForm bookedSlots={bookedSlots} onSuccess={handleBooked} />
      </div>
    );
  }

  // ── Step 2: Payment ───────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5">

      {/* Day confirmation */}
      <div
        className="rounded-2xl p-5 flex items-start gap-4"
        style={{ background: "rgba(45,122,95,0.06)", border: "1px solid rgba(238,114,2,0.2)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(238,114,2,0.12)", border: "1px solid rgba(238,114,2,0.3)" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="#EE7202" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-black" style={{ color: "#1A2E25" }}>יום הצילום נקבע!</p>
          <p className="text-sm" style={{ color: "#7A9E8E" }}>{booked?.date} · {booked?.time}</p>
          <p className="text-xs mt-0.5" style={{ color: "#7A9E8E" }}>שלב 2 מתוך 2 — השלמת תשלום</p>
        </div>
      </div>

      {/* Payment card */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: "linear-gradient(145deg, #FFFFFF, #D0E8DA)", border: "1px solid rgba(45,122,95,0.16)" }}
      >
        <div
          className="flex justify-between items-center pb-4"
          style={{ borderBottom: "1px solid #C5DDD2" }}
        >
          <span style={{ color: "#7A9E8E" }}>יום צילום פרמיום · 16 סרטונים</span>
          <div className="text-right">
            {credit > 0 && (
              <p className="text-xs line-through" style={{ color: "#7A9E8E" }}>
                ₪{listPrice.toLocaleString("he-IL")}
              </p>
            )}
            <p className="font-black text-2xl" style={{ color: "#1A2E25" }}>
              ₪{toPay.toLocaleString("he-IL")}
            </p>
            <p className="text-xs" style={{ color: "#7A9E8E" }}>+ מע״מ</p>
          </div>
        </div>

        <ul className="flex flex-col gap-1.5 text-sm" style={{ color: "#7A9E8E" }}>
          {[
            "אסטרטגיית תוכן לפני הצילום",
            "צוות מקצועי (צלם + במאי + מפיקה)",
            "16 סרטונים ערוכים תוך שבועיים",
            "3 חודשי ליווי לאחר הצילום",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span style={{ color: "#EE7202" }}>✓</span> {item}
            </li>
          ))}
        </ul>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full rounded-full py-4 text-lg font-bold active:scale-[0.98] disabled:opacity-60 btn-cta-gold"
        >
          {loading ? "מעביר לתשלום..." : `לתשלום ₪${toPay.toLocaleString("he-IL")} ←`}
        </button>

        <p className="text-center text-xs" style={{ color: "#7A9E8E" }}>
          תשלום מאובטח דרך Cardcom · ניתן לבטל עד 48 שעות לפני יום הצילום
        </p>
      </div>

    </div>
  );
}
