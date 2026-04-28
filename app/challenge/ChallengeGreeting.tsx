"use client";

import { useEffect, useState } from "react";
import { getSessionUser } from "@/lib/quiz-session";

export function ChallengeGreeting() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const user = getSessionUser();
    if (user?.name) {
      setName(user.name.split(" ")[0]);
    }
  }, []);

  if (!name) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(45,122,95,0.1)",
        border: "1px solid rgba(238,114,2,0.3)",
        borderRadius: 9999,
        padding: "6px 18px",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>👋</span>
      <span style={{ color: "#EE7202", fontWeight: 700, fontSize: "0.95rem" }}>
        {name}, המקום שלך שמור
      </span>
    </div>
  );
}
