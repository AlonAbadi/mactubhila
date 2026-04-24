import Image from "next/image";
import { CLIENT } from "@/lib/client";

const ACC  = CLIENT.colors.accent;
const BDR  = CLIENT.colors.border;
const CARD = CLIENT.colors.card;
const SOFT = CLIENT.colors.card_soft;
const FG   = CLIENT.colors.fg;
const MUT  = CLIENT.colors.fg_muted;

export function TeamSection() {
  const founder = CLIENT.team.filter((m) => m.is_founder);
  const rest    = CLIENT.team.filter((m) => !m.is_founder);

  return (
    <section dir="rtl" style={{ padding: "64px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: ACC, letterSpacing: "0.08em", marginBottom: 8 }}>
            הצוות שלנו
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: FG, lineHeight: 1.25 }}>
            האנשים מאחורי מכתוב
          </h2>
          <p style={{ fontSize: 15, color: MUT, marginTop: 10, lineHeight: 1.6 }}>
            מסע של מילים, סיפורים והתבוננות פנימית – והכוח הגדול שלו הוא האנשים.
          </p>
        </div>

        {/* Founder – wide card */}
        {founder.map((m) => (
          <div
            key={m.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              background: CARD,
              border: `1px solid ${BDR}`,
              borderRadius: 20,
              padding: "28px 32px",
              marginBottom: 32,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              {/* Avatar */}
              <div style={{
                width: 88, height: 88, borderRadius: "50%", flexShrink: 0,
                overflow: "hidden",
                border: `3px solid ${ACC}55`,
                boxShadow: `0 6px 20px ${ACC}33`,
                background: SOFT,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, fontWeight: 900, color: ACC,
              }}>
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={88}
                    height={88}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : m.initial}
              </div>
              <div style={{ flex: 1, minWidth: 180, textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: ACC, letterSpacing: "0.07em", marginBottom: 4 }}>
                  {m.role}
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: FG, lineHeight: 1.2, margin: "0 0 6px 0" }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: 14, color: MUT, lineHeight: 1.65, margin: 0 }}>
                  {m.bio}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Rest of team – grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}>
          {rest.map((m) => (
            <div
              key={m.name}
              style={{
                background: CARD,
                border: `1px solid ${BDR}`,
                borderRadius: 16,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Avatar + name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                  overflow: "hidden",
                  border: `2px solid ${ACC}44`,
                  background: SOFT,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 900, color: ACC,
                }}>
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      width={56}
                      height={56}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : m.initial}
                </div>
                <div style={{ textAlign: "right", flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ACC, marginBottom: 2, letterSpacing: "0.06em" }}>
                    {m.role}
                  </p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: FG, margin: 0 }}>
                    {m.name}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: MUT, lineHeight: 1.65, margin: 0, textAlign: "right" }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
