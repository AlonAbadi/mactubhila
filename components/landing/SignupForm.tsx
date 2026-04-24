"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackLead } from "@/lib/analytics";
import { ConsentCheckbox } from "@/components/landing/ConsentCheckbox";
import { getSessionUser, saveUserDetails } from "@/lib/quiz-session";
import { CLIENT } from "@/lib/client";

const ACC  = CLIENT.colors.accent;
const ACC_D = CLIENT.colors.accent_dark;
const FG   = CLIENT.colors.fg;
const MUT  = CLIENT.colors.fg_muted;
const BDR  = CLIENT.colors.border;

interface FormState {
  name: string;
  email: string;
  phone: string;
}

interface FieldError {
  name?: string;
  email?: string;
  phone?: string;
  general?: string;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}

interface SignupFormProps {
  ctaLabel: string;
}

export function SignupForm({ ctaLabel }: SignupFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      router.replace("/training/watch");
      return;
    }
    setChecking(false);

    const keys = ["utm_source", "utm_campaign", "utm_adset", "utm_ad", "fbclid", "gclid"];
    const data: Record<string, string> = {};
    for (const key of keys) {
      const val = getCookie(key);
      if (val) data[key === "fbclid" || key === "gclid" ? "click_id" : key] = val;
    }
    setUtmData(data);
  }, [router]);

  function validate(): boolean {
    const errs: FieldError = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "שם חייב להכיל לפחות 2 תווים";
    if (!form.email.includes("@") || !form.email.includes("."))
      errs.email = "כתובת אימייל לא תקינה";
    // Phone is optional — validate format only if provided
    if (form.phone.trim()) {
      const phone = form.phone.replace(/[\s-]/g, "");
      if (!/^05\d{8}$/.test(phone) && !/^\+9725\d{8}$/.test(phone))
        errs.phone = "מספר טלפון לא תקין (לדוגמה: 0501234567)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.replace(/[\s-]/g, "") || undefined,
          ab_variant: getCookie("ab_variant"),
          anonymous_id: getCookie("anon_id"),
          marketing_consent: consent,
          ...utmData,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? { general: json.error ?? "שגיאה, נסה שוב" });
        return;
      }
      trackLead();
      const userId = (json as Record<string, unknown>).user_id as string | undefined;
      if (userId) saveUserDetails({ name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.replace(/[\s-]/g, ""), userId });
      router.push("/training/watch");
    } catch {
      setErrors({ general: "שגיאת רשת, נסה שוב" });
    } finally {
      setLoading(false);
    }
  }

  if (checking) return null;

  const inputStyle = (hasError: boolean): React.CSSProperties => hasError
    ? { background: "#FFF5F5", border: "1px solid #F87171", color: FG, borderRadius: 12, padding: "14px 16px", width: "100%", fontSize: 15, outline: "none", boxSizing: "border-box" }
    : { background: "#FFFFFF", border: `1px solid ${BDR}`, color: FG, borderRadius: 12, padding: "14px 16px", width: "100%", fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border-color 150ms" };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
    if (!hasError) {
      e.target.style.borderColor = ACC;
      e.target.style.borderWidth = "2px";
    }
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
    if (!hasError) {
      e.target.style.borderColor = BDR;
      e.target.style.borderWidth = "1px";
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }} dir="rtl">
      {errors.general && (
        <div style={{ borderRadius: 12, border: "1px solid #F87171", background: "#FFF5F5", padding: "12px 16px", fontSize: 14, color: "#DC2626" }}>
          {errors.general}
        </div>
      )}

      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label htmlFor="sf-name" style={{ fontSize: 14, fontWeight: 600, color: FG }}>שם מלא</label>
        <input
          id="sf-name" type="text" autoComplete="name" placeholder="ישראל ישראלי"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          style={inputStyle(!!errors.name)}
          onFocus={(e) => handleFocus(e, !!errors.name)}
          onBlur={(e) => handleBlur(e, !!errors.name)}
        />
        {errors.name && <p style={{ fontSize: 12, color: "#DC2626", margin: 0 }}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label htmlFor="sf-email" style={{ fontSize: 14, fontWeight: 600, color: FG }}>כתובת אימייל</label>
        <input
          id="sf-email" type="email" autoComplete="email" placeholder="israel@example.com" dir="ltr"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          style={{ ...inputStyle(!!errors.email), textAlign: "left" }}
          onFocus={(e) => handleFocus(e, !!errors.email)}
          onBlur={(e) => handleBlur(e, !!errors.email)}
        />
        {errors.email && <p style={{ fontSize: 12, color: "#DC2626", margin: 0 }}>{errors.email}</p>}
      </div>

      {/* Phone — optional */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label htmlFor="sf-phone" style={{ fontSize: 14, fontWeight: 600, color: FG }}>טלפון נייד</label>
        <p style={{ fontSize: 13, color: MUT, margin: 0 }}>לפולו-אפ אישי בווטסאפ (לא חובה לקבלת השיעור)</p>
        <input
          id="sf-phone" type="tel" autoComplete="tel" placeholder="0501234567" dir="ltr"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          style={{ ...inputStyle(!!errors.phone), textAlign: "left" }}
          onFocus={(e) => handleFocus(e, !!errors.phone)}
          onBlur={(e) => handleBlur(e, !!errors.phone)}
        />
        {errors.phone && <p style={{ fontSize: 12, color: "#DC2626", margin: 0 }}>{errors.phone}</p>}
      </div>

      <ConsentCheckbox
        checked={consent}
        onChange={setConsent}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", borderRadius: 9999, padding: "16px 32px",
          background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
          color: "#FFFFFF", fontWeight: 800, fontSize: 17,
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.65 : 1,
          transition: "transform 150ms, box-shadow 150ms",
          boxShadow: loading ? "none" : `0 6px 20px ${ACC}44`,
        }}
        onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 10px 28px ${ACC}55`; } }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${ACC}44`; }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
            שולח...
          </span>
        ) : ctaLabel}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
