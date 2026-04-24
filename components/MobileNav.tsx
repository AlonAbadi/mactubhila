"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Menu, X } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { CLIENT } from "@/lib/client";

// ── Nav items — edit per client ──────────────────────────────────
const NAV_ITEMS = [
  { label: "אודות",         href: "/about" },
  { label: "הדרכה חינמית", href: "/training" },
  ...(CLIENT.modules.quiz       ? [{ label: "אבחון",  href: "/quiz" }]      : []),
  ...(CLIENT.modules.challenge  ? [{ label: "אתגר",   href: "/challenge" }] : []),
  ...(CLIENT.modules.hive       ? [{ label: "קהילה",  href: "/hive" }]      : []),
  ...(CLIENT.modules.course     ? [{ label: "קורס",   href: "/course" }]    : []),
  ...(CLIENT.modules.workshop   ? [{ label: "סדנה",   href: "/workshop" }]  : []),
  { label: "האזור האישי",   href: "/account" },
];

const ACC     = CLIENT.colors.accent_light;
const FG      = CLIENT.colors.fg;
const NAV_BG  = CLIENT.colors.bg_dark;
const BDR     = CLIENT.colors.border;
const CARD_BG = CLIENT.colors.card;

interface MobileNavProps {
  userInitial?: string | null;
}

export function MobileNav({ userInitial = null }: MobileNavProps) {
  const [open, setOpen]              = useState(false);
  const [signingOut, setSigningOut]  = useState(false);
  const pathname                     = usePathname();
  const router                       = useRouter();
  const [isPending, startTransition] = useTransition();
  const supabase                     = createBrowserClient();

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────── */}
      <nav
        className="md:hidden"
        dir="ltr"
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", height: 64,
          background: NAV_BG, borderBottom: `1px solid ${BDR}`,
        }}
      >
        {/* Hamburger */}
        <button
          aria-label="פתח תפריט"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{ lineHeight: 0, padding: 4, background: "none", border: "none", flexShrink: 0 }}
        >
          <Menu color={FG} size={28} />
        </button>

        {/* Auth capsule */}
        <div style={{ marginRight: 8, flexShrink: 0 }}>
          {userInitial ? (
            <button
              onClick={() => startTransition(() => router.push("/account"))}
              disabled={isPending}
              style={{
                border: `1px solid ${ACC}55`,
                background: isPending ? `${ACC}30` : `${ACC}14`,
                borderRadius: 999, padding: "5px 24px",
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 600, color: ACC,
                fontFamily: "inherit", cursor: isPending ? "default" : "pointer",
                whiteSpace: "nowrap", transition: "all 0.15s ease",
              }}
            >
              {userInitial}
            </button>
          ) : (
            <a
              href="/login"
              style={{
                background: `linear-gradient(135deg, ${ACC}, ${CLIENT.colors.accent_dark})`,
                color: NAV_BG, fontSize: 12, fontWeight: 700,
                padding: "5px 14px", borderRadius: 20,
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              התחבר
            </a>
          )}
        </div>

        {/* Brand name */}
        <Link href="/" style={{ flex: 1, textAlign: "center", textDecoration: "none" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: FG, fontFamily: "var(--font-assistant), Assistant, sans-serif" }}>
            {CLIENT.name}
          </span>
        </Link>
      </nav>

      {/* ── Overlay ──────────────────────────────────────── */}
      {open && (
        <div
          aria-hidden
          onClick={close}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }}
        />
      )}

      {/* ── Drawer ───────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
        dir="rtl"
        style={{
          position: "fixed", top: 0, right: 0,
          height: "100vh", width: "80vw", maxWidth: 320,
          background: CARD_BG, borderLeft: `1px solid ${BDR}`,
          zIndex: 50, overflow: "hidden",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: 64, borderBottom: `1px solid ${BDR}`, flexShrink: 0,
        }}>
          <button
            aria-label="סגור תפריט"
            onClick={close}
            style={{ lineHeight: 0, padding: 4, background: "none", border: "none" }}
          >
            <X color={FG} size={22} />
          </button>
          <span style={{ color: FG, fontWeight: 700, fontSize: 15 }}>תפריט</span>
        </div>

        {/* Links */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "14px 24px",
                  borderBottom: `1px solid ${BDR}`,
                  color: active ? ACC : FG,
                  fontWeight: active ? 700 : 400,
                  fontSize: 15,
                  fontFamily: "var(--font-assistant), Assistant, sans-serif",
                  textDecoration: "none",
                  background: active ? `${ACC}10` : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        {userInitial && (
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${BDR}`, flexShrink: 0 }}>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              style={{
                width: "100%", padding: "12px", borderRadius: 8,
                border: `1px solid ${BDR}`, background: "transparent",
                color: FG, fontSize: 14, cursor: "pointer",
                fontFamily: "var(--font-assistant), Assistant, sans-serif",
              }}
            >
              {signingOut ? "מתנתק..." : "התנתק"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
