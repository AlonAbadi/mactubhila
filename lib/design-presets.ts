/**
 * Design presets — one line in lib/client.ts determines the entire visual identity.
 * Each preset defines ALL CSS tokens: backgrounds, accent palette, text, shape radius.
 *
 * Choosing a preset:
 *   dark_gold   — dark navy + warm gold.  Premium coaches, high-ticket offers.
 *   warm_earth  — off-white + terracotta. Wellness, nutrition, yoga, organic brands.
 *   cool_slate  — near-black + electric blue. Business coaches, executives, tech.
 *   rose_blush  — cream + deep rose. Women's coaching, lifestyle, beauty.
 */

export type DesignPreset = "dark_gold" | "warm_earth" | "cool_slate" | "rose_blush";

export interface PresetTokens {
  // ── Backgrounds ──────────────────────────────────────────────
  bg:           string;
  bg_dark:      string;
  card:         string;
  card_soft:    string;
  border:       string;
  muted:        string;
  // ── Accent (replaces "gold" in all utility classes) ──────────
  accent:       string;
  accent_light: string;
  accent_dark:  string;
  // ── Text ─────────────────────────────────────────────────────
  fg:           string;
  fg_muted:     string;
  btn_text:     string;   // text on filled accent buttons
  // ── Shape ────────────────────────────────────────────────────
  radius_card:  string;
  radius_btn:   string;
  radius_input: string;
  // ── Meta ─────────────────────────────────────────────────────
  is_dark:      boolean;
  label:        string;
  mood:         string;
}

export const PRESETS: Record<DesignPreset, PresetTokens> = {

  dark_gold: {
    label:        "Dark Gold",
    mood:         "פרמיום, high-contrast, אוטוריטטיבי",
    bg:           "#0D1018",
    bg_dark:      "#080C14",
    card:         "#141820",
    card_soft:    "#1D2430",
    border:       "#2C323E",
    muted:        "#272D38",
    accent:       "#C9964A",
    accent_light: "#E8B94A",
    accent_dark:  "#9E7C3A",
    fg:           "#EDE9E1",
    fg_muted:     "#9E9990",
    btn_text:     "#1A1206",
    radius_card:  "16px",
    radius_btn:   "12px",
    radius_input: "10px",
    is_dark:      true,
  },

  warm_earth: {
    label:        "Warm Earth",
    mood:         "אורגני, חמים, אנושי, ווליבאינג",
    bg:           "#FAF7F2",
    bg_dark:      "#F0EAE0",
    card:         "#FFFFFF",
    card_soft:    "#F5F0E8",
    border:       "#E5DDD0",
    muted:        "#EDE4D8",
    accent:       "#C4622D",
    accent_light: "#E07840",
    accent_dark:  "#9A4A20",
    fg:           "#1E1208",
    fg_muted:     "#7A6A58",
    btn_text:     "#FFFFFF",
    radius_card:  "20px",
    radius_btn:   "14px",
    radius_input: "10px",
    is_dark:      false,
  },

  cool_slate: {
    label:        "Cool Slate",
    mood:         "מקצועי, מודרני, אסטרטגי, עסקי",
    bg:           "#0A0F1C",
    bg_dark:      "#06090F",
    card:         "#111828",
    card_soft:    "#1A2238",
    border:       "#253050",
    muted:        "#1E2840",
    accent:       "#4F7FF5",
    accent_light: "#7099FF",
    accent_dark:  "#2E5CD4",
    fg:           "#E8EEF8",
    fg_muted:     "#8A9BBD",
    btn_text:     "#FFFFFF",
    radius_card:  "12px",
    radius_btn:   "8px",
    radius_input: "8px",
    is_dark:      true,
  },

  rose_blush: {
    label:        "Rose Blush",
    mood:         "נשי, חם, אינטימי, ליייפסטייל",
    bg:           "#FDF8F6",
    bg_dark:      "#F5EDE8",
    card:         "#FFFFFF",
    card_soft:    "#FBF2EE",
    border:       "#F0D8CE",
    muted:        "#F5E4DC",
    accent:       "#B84A64",
    accent_light: "#D46080",
    accent_dark:  "#8A3650",
    fg:           "#1A0810",
    fg_muted:     "#8A6878",
    btn_text:     "#FFFFFF",
    radius_card:  "24px",
    radius_btn:   "16px",
    radius_input: "12px",
    is_dark:      false,
  },

};

/** Returns a CSS string of :root variable overrides for the given preset. */
export function getPresetCSS(
  preset: DesignPreset,
  overrides?: Partial<Pick<PresetTokens,
    "accent" | "accent_light" | "accent_dark" | "btn_text"
  >>
): string {
  const t = { ...PRESETS[preset], ...overrides };

  const gradGold   = `linear-gradient(135deg, ${t.accent_light} 0%, ${t.accent} 50%, ${t.accent_dark} 100%)`;
  const gradHero   = t.is_dark
    ? `linear-gradient(180deg, ${t.bg_dark} 0%, ${t.bg} 100%)`
    : `linear-gradient(180deg, ${t.bg_dark} 0%, ${t.bg} 100%)`;
  const gradCard   = `linear-gradient(145deg, ${t.card_soft}, ${t.card})`;
  const gradText   = `linear-gradient(135deg, ${t.accent_light} 0%, ${t.accent} 100%)`;
  const glowAccent = `0 0 60px ${t.accent}26`;
  const shadowCard = t.is_dark
    ? "0 8px 40px rgba(0,0,0,0.4)"
    : "0 4px 24px rgba(0,0,0,0.08)";

  return `
    --bg:           ${t.bg};
    --bg-dark:      ${t.bg_dark};
    --card:         ${t.card};
    --card-soft:    ${t.card_soft};
    --border:       ${t.border};
    --muted:        ${t.muted};
    --gold:         ${t.accent};
    --gold-light:   ${t.accent_light};
    --gold-dark:    ${t.accent_dark};
    --brand-gold-1: ${t.accent_light};
    --brand-gold-2: ${t.accent};
    --brand-gold-3: ${t.accent_dark};
    --fg:           ${t.fg};
    --fg-muted:     ${t.fg_muted};
    --btn-text:     ${t.btn_text};
    --radius-card:  ${t.radius_card};
    --radius-btn:   ${t.radius_btn};
    --radius-input: ${t.radius_input};
    --grad-gold:      ${gradGold};
    --grad-hero:      ${gradHero};
    --grad-card:      ${gradCard};
    --grad-text-gold: ${gradText};
    --glow-gold:      ${glowAccent};
    --shadow-card:    ${shadowCard};
    --background:     ${t.bg};
    --foreground:     ${t.fg};
    --color-primary:  ${t.accent};
  `.trim();
}
