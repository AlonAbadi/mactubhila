"use client";

import { useEffect, useState } from "react";

interface HomeStickyBarProps {
  ctaText: string;
  heroSelector?: string;
}

export default function HomeStickyBar({
  ctaText,
  heroSelector = "[data-home-hero-cta]",
}: HomeStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  // IntersectionObserver על כפתורי ה-hero
  useEffect(() => {
    const targets = document.querySelectorAll(heroSelector);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setHeroInView(anyVisible);
      },
      { threshold: 0.1 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [heroSelector]);

  // Scroll listener — מופיע אחרי 400px + רק אם hero לא נראה
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400 && !heroInView);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroInView]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "rgba(228,240,234,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #C5DDD2",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
        boxShadow: "0 -2px 12px rgba(45,122,95,0.15)",
        fontFamily: "var(--font-assistant), Assistant, sans-serif",
        direction: "rtl",
      }}
    >
      <div style={{ color: "#1A2E25", fontSize: 14, fontWeight: 600, lineHeight: 1.3, flex: 1 }}>
        רוצה לטעום את השיטה?
        <br />
        <span style={{ color: "#7A9E8E", fontWeight: 400, fontSize: 12 }}>
          שיעור מתנה של 20 דקות – בלי התחייבות
        </span>
      </div>
      <a
        href="/training"
        style={{
          background: "linear-gradient(135deg, #2D7A5F, #1E5642)",
          color: "#F5FAF7",
          fontSize: 13,
          fontWeight: 800,
          padding: "10px 20px",
          borderRadius: 24,
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {ctaText}
      </a>
    </div>
  );
}
