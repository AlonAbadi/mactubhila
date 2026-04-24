"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CLIENT } from "@/lib/client";

const ACC   = CLIENT.colors.accent;
const ACC_L = CLIENT.colors.accent_light;
const ACC_D = CLIENT.colors.accent_dark;
const BG    = CLIENT.colors.bg_dark;
const BDR   = CLIENT.colors.border;
const MUT   = CLIENT.colors.fg_muted;

const STATS = [
  { display: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
  { display: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
  { display: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
] as const;

export function StatsSection() {
  const ref     = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lineStyle: React.CSSProperties = {
    width:      36,
    height:     2,
    margin:     "0 auto",
    background: `linear-gradient(90deg, ${ACC_L}, ${ACC_D})`,
    opacity:    visible ? 1 : 0,
    transition: "opacity 0.8s ease 0.4s",
  };

  const sepStyle: React.CSSProperties = {
    width:      1,
    alignSelf:  "stretch",
    flexShrink: 0,
    background: `linear-gradient(180deg, transparent 0%, ${BDR} 30%, ${BDR} 70%, transparent 100%)`,
  };

  return (
    <section
      ref={ref}
      className="font-assistant py-6 md:py-14 px-6"
      style={{ background: BG }}
    >
      {/* Accent line — top */}
      <div style={lineStyle} aria-hidden />

      {/* Stats row */}
      <div
        className="my-5 md:my-10"
        style={{
          display:      "flex",
          maxWidth:     680,
          marginLeft:   "auto",
          marginRight:  "auto",
          alignItems:   "center",
        }}
      >
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div style={sepStyle} aria-hidden />}

            <div
              style={{
                flex:      1,
                textAlign: "center",
                padding:   "0 12px",
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.65s ease ${i * 0.18}s, transform 0.65s ease ${i * 0.18}s`,
              }}
            >
              {/* Number */}
              <div
                dir="ltr"
                style={{
                  unicodeBidi: "embed",
                  display:     "inline-flex",
                  alignItems:  "baseline",
                  lineHeight:  1,
                }}
              >
                <span
                  style={{
                    fontWeight:            800,
                    fontSize:              "clamp(30px, 6vw, 48px)",
                    letterSpacing:         "-0.02em",
                    lineHeight:            1,
                    background:            `linear-gradient(160deg, ${ACC_L} 0%, ${ACC} 50%, ${ACC_D} 100%)`,
                    WebkitBackgroundClip:  "text",
                    WebkitTextFillColor:   "transparent",
                    backgroundClip:        "text",
                  }}
                >
                  {stat.display}
                </span>
              </div>

              {/* Label */}
              <p
                style={{
                  fontSize:      "clamp(13px, 2vw, 15px)",
                  color:         MUT,
                  letterSpacing: "0.06em",
                  marginTop:     8,
                  opacity:       visible ? 1 : 0,
                  transition:    `opacity 0.65s ease ${i * 0.18 + 0.25}s`,
                }}
              >
                {stat.label}
              </p>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Accent line — bottom */}
      <div style={lineStyle} aria-hidden />
    </section>
  );
}
