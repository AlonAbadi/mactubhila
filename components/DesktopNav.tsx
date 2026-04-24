"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { CLIENT } from "@/lib/client";

// ── Nav links — edit per client ──────────────────────────────────
// Add / remove items here. No hardcoded client content.
const NAV_LINKS = [
  { label: "אודות",         href: "/about" },
  { label: "שיעור מתנה",   href: "/training" },
  { label: "קלפים",         href: "/cards" },
  ...(CLIENT.modules.course     ? [{ label: "קורס דיגיטלי",   href: "/course" }]      : []),
  ...(CLIENT.modules.workshop   ? [{ label: "קורס + ליווי",   href: "/course-plus" }]    : []),
  ...(CLIENT.modules.strategy   ? [{ label: "קורס פרונטלי",   href: "/in-person" }]   : []),
  ...(CLIENT.modules.partnership? [{ label: "ליווי 1:1",      href: "/one-on-one" }] : []),
  { label: "מלגות",         href: "/scholarships" },
  { label: "לארגונים",      href: "/for-organizations" },
];

const ACC   = CLIENT.colors.accent;
const FG    = CLIENT.colors.fg;
const BG    = CLIENT.colors.bg_dark;
const BDR   = CLIENT.colors.border;

const LINK_STYLE = (active: boolean): React.CSSProperties => ({
  color: active ? ACC : FG,
  fontSize: 14,
  fontFamily: "var(--font-assistant), Assistant, sans-serif",
  fontWeight: active ? 700 : 400,
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "color 150ms",
});

interface DesktopNavProps {
  userInitial?: string | null;
}

export function DesktopNav({ userInitial = null }: DesktopNavProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <nav
      className="hidden md:flex"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 64,
        background: BG,
        borderBottom: `1px solid ${BDR}`,
      }}
    >
      {/* Logo + name */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
        <Image src="/logo.png" alt="מכתוב" width={72} height={36} style={{ objectFit: "contain", display: "block" }} priority />
        <span style={{ color: FG, fontWeight: 700, fontSize: 15, fontFamily: "var(--font-assistant), Assistant, sans-serif" }}>
          הילה יגאל איזון
        </span>
      </Link>

      {/* Auth capsule */}
      <div style={{ flexShrink: 0 }}>
        {userInitial ? (
          <button
            onClick={() => startTransition(() => router.push("/account"))}
            disabled={isPending}
            style={{
              border: `1px solid ${ACC}55`,
              background: isPending ? `${ACC}30` : `${ACC}14`,
              borderRadius: 999,
              padding: "5px 24px",
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 600, color: ACC,
              fontFamily: "inherit",
              cursor: isPending ? "default" : "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
            }}
          >
            {userInitial}
          </button>
        ) : (
          <a
            href="/login"
            style={{
              background: `linear-gradient(135deg, ${ACC}, ${CLIENT.colors.accent_dark})`,
              color: CLIENT.colors.bg_dark,
              fontSize: 13, fontWeight: 700,
              padding: "6px 18px", borderRadius: 20,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            התחבר
          </a>
        )}
      </div>

      {/* Center links */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, direction: "rtl", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={LINK_STYLE(pathname === link.href)}
            onMouseEnter={(e) => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = CLIENT.colors.accent; }}
            onMouseLeave={(e) => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = FG; }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
