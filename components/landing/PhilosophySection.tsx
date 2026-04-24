"use client";

import { useRef, useState } from "react";
import { Compass, Flame, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CLIENT } from "@/lib/client";

const ACC = CLIENT.colors.accent;
const BDR = CLIENT.colors.border;
const FG  = CLIENT.colors.fg;
const MUT = CLIENT.colors.fg_muted;
const CRD = CLIENT.colors.card;

const ICONS: LucideIcon[] = [Compass, Flame, TrendingUp];

const PRINCIPLES = CLIENT.pages.about.principles.map((p, i) => ({
  icon:  ICONS[i] ?? Compass,
  title: p.q.replace(/^["“״]|["”״]$/g, ""),
  body:  p.body,
}));

function Card({ p, snap }: { p: typeof PRINCIPLES[number]; snap?: boolean }) {
  const Icon = p.icon;
  return (
    <div
      className="card-hover"
      style={{
        background: CRD,
        border: `1px solid ${BDR}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        borderRadius: 20,
        ...(snap ? { scrollSnapAlign: "start", width: "65vw", minWidth: "65vw", height: "65vw", flexShrink: 0, overflow: "hidden" } : {}),
      }}
    >
      <div style={{
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 14,
        height: snap ? "100%" : undefined,
        boxSizing: "border-box",
      }}>
        <div style={{
          width: 38, height: 38,
          background: `${ACC}14`,
          border: `1px solid ${ACC}33`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-start",
        }}>
          <Icon size={18} color={ACC} strokeWidth={2} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: FG, textAlign: "right", margin: 0 }}>
            {p.title}
          </h3>
          <p style={{ fontSize: "0.85rem", color: MUT, lineHeight: 1.6, textAlign: "right", margin: 0 }}>
            {p.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PhilosophySection() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const containerLeft = el.getBoundingClientRect().left;
    const items = Array.from(el.children) as HTMLElement[];
    let minDist = Infinity;
    let idx = 0;
    items.forEach((child, i) => {
      const dist = Math.abs(child.getBoundingClientRect().left - containerLeft);
      if (dist < minDist) { minDist = dist; idx = i; }
    });
    setActive(idx);
  };

  return (
    <>
      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:hidden"
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: "16px",
          paddingBottom: "8px",
          paddingRight: "24px",
          paddingLeft: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {PRINCIPLES.map((p) => (
          <Card key={p.title} p={p} snap />
        ))}
      </div>

      {/* Scroll dots - mobile only */}
      <div className="flex md:hidden justify-center gap-2" style={{ marginTop: 12 }}>
        {PRINCIPLES.map((_, i) => (
          <div
            key={i}
            style={{
              background: active === i ? ACC : BDR,
              width: active === i ? 24 : 8,
              height: 7,
              borderRadius: 9999,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {PRINCIPLES.map((p) => (
          <Card key={p.title} p={p} />
        ))}
      </div>
    </>
  );
}
