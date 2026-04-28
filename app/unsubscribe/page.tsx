import { CLIENT } from "@/lib/client";
import type { Metadata } from "next";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: `ביטול הסכמה לדיוור | ${CLIENT.name}`,
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function UnsubscribePage({ searchParams }: Props) {
  const { email } = await searchParams;

  return (
    <div
      dir="rtl"
      className="font-assistant min-h-screen"
      style={{ background: "#E4F0EA", color: "#1A2E25", paddingTop: 80, paddingBottom: 80 }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px" }}>

        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>
            ✉️
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "#1A2E25",
          marginBottom: 12,
        }}>
          ביטול הסכמה לדיוור
        </h1>
        <p style={{
          textAlign: "center",
          color: "#7A9E8E",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          marginBottom: 36,
        }}>
          הזן את כתובת האימייל שלך כדי להסיר אותה מרשימת הדיוור שלנו.
        </p>

        {/* Form */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #C5DDD2",
          borderRadius: 16,
          padding: "28px 24px",
        }}>
          <UnsubscribeForm initialEmail={email ?? ""} />
        </div>

        {/* Note */}
        <p style={{
          textAlign: "center",
          color: "rgba(158,153,144,0.5)",
          fontSize: "0.8rem",
          lineHeight: 1.6,
          marginTop: 20,
        }}>
          שים לב: הודעות מערכת הנוגעות לרכישות ולחשבונך ימשיכו להישלח.
        </p>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href="/"
            style={{ color: "#EE7202", fontSize: "0.875rem", textDecoration: "none" }}
          >
            ← חזרה לאתר
          </a>
        </div>

      </div>
    </div>
  );
}
