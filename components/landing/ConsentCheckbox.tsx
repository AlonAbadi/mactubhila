"use client";

import { CLIENT } from "@/lib/client";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  dark?: boolean;
}

export function ConsentCheckbox({ checked, onChange }: ConsentCheckboxProps) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, cursor: "pointer", accentColor: CLIENT.colors.accent }}
      />
      <span style={{ fontSize: 12, lineHeight: 1.7, color: CLIENT.colors.fg_muted }}>
        {`אני מאשר/ת קבלת עדכונים, מבצעים ותוכן שיווקי מ${CLIENT.legal_name} באמצעות אימייל, SMS ווואטסאפ. ניתן לבטל בכל עת.`}
        {" "}
        <a href="/unsubscribe" style={{ color: CLIENT.colors.accent, textDecoration: "underline" }}>הסרה מהרשימה</a>
      </span>
    </label>
  );
}
