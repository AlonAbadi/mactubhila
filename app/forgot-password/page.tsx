"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/browser";
import { CLIENT } from "@/lib/client";

const ACC = CLIENT.colors.accent;
const ACC_D = CLIENT.colors.accent_dark;
const BG  = CLIENT.colors.bg;
const BDR = CLIENT.colors.border;
const FG  = CLIENT.colors.fg;
const MUT = CLIENT.colors.fg_muted;
const CARD = CLIENT.colors.card;
const SOFT = CLIENT.colors.card_soft;

const S = {
  page: {
    minHeight: "100vh",
    background: BG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "Assistant, sans-serif",
  } as React.CSSProperties,
  card: {
    background: CARD,
    border: `1px solid ${BDR}`,
    borderRadius: 12,
    padding: "36px 32px",
    width: "100%",
    maxWidth: 400,
    direction: "rtl" as const,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  } as React.CSSProperties,
  logo: { textAlign: "center" as const, marginBottom: 24 },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: ACC,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: FG,
    textAlign: "center" as const,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: MUT,
    textAlign: "center" as const,
    marginBottom: 28,
  },
  label: {
    display: "block",
    fontSize: 13,
    color: MUT,
    marginBottom: 6,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    background: SOFT,
    border: `1px solid ${BDR}`,
    borderRadius: 8,
    padding: "10px 12px",
    color: FG,
    fontSize: 14,
    fontFamily: "Assistant, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  } as React.CSSProperties,
  submitBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: 8,
    border: "none",
    background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: "Assistant, sans-serif",
    marginTop: 4,
    transition: "opacity 0.15s",
  } as React.CSSProperties,
  infoBox: {
    background: `${ACC}10`,
    border: `1px solid ${ACC}44`,
    borderRadius: 8,
    padding: "10px 14px",
    color: ACC,
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 1.5,
    textAlign: "center" as const,
  },
  bottomLink: {
    textAlign: "center" as const,
    marginTop: 20,
    fontSize: 13,
    color: MUT,
  },
};

type Phase = "idle" | "loading" | "sent";

export default function ForgotPasswordPage() {
  const supabase = createBrowserClient();
  const [phase, setPhase] = useState<Phase>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "loading") return;
    setPhase("loading");

    // Always show the same success message regardless of whether email exists
    // This prevents email enumeration
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setPhase("sent");
  }

  if (phase === "sent") {
    return (
      <div style={S.page} dir="rtl" lang="he">
        <div style={S.card}>
          <div style={S.logo}><div style={S.logoText}>{CLIENT.name}</div></div>
          <div style={S.title}>בדוק את האימייל שלך</div>
          <div style={S.subtitle}>
            אם הכתובת <strong style={{ color: "#EDE9E1" }}>{email}</strong> רשומה אצלנו,
            תקבל קישור לאיפוס סיסמה בקרוב.
          </div>
          <div style={S.infoBox}>
            הקישור תקף ל-60 דקות. אם לא מצאת — בדוק תיקיית ספאם.
          </div>
          <div style={S.bottomLink}>
            <Link href="/login" style={{ color: "#E8B94A", textDecoration: "none", fontWeight: 700 }}>
              חזרה להתחברות
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page} dir="rtl" lang="he">
      <div style={S.card}>
        <div style={S.logo}><div style={S.logoText}>{CLIENT.name}</div></div>
        <div style={S.title}>שכחתי סיסמה</div>
        <div style={S.subtitle}>נשלח לך קישור לאיפוס הסיסמה</div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={S.label}>אימייל</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="israel@example.com"
              dir="ltr"
              style={S.input}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(201,150,74,0.6)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#2C323E"; }}
            />
          </div>

          <button
            type="submit"
            disabled={phase === "loading"}
            style={{ ...S.submitBtn, opacity: phase === "loading" ? 0.6 : 1, cursor: phase === "loading" ? "not-allowed" : "pointer" }}
          >
            {phase === "loading" ? "שולח..." : "שלח קישור לאיפוס"}
          </button>
        </form>

        <div style={S.bottomLink}>
          <Link href="/login" style={{ color: "#9E9990", textDecoration: "none" }}>
            חזרה להתחברות
          </Link>
        </div>
      </div>
    </div>
  );
}
