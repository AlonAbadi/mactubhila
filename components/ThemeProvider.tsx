import { CLIENT }        from "@/lib/client";
import { getPresetCSS }  from "@/lib/design-presets";

/**
 * Injects CSS variable overrides into <head> based on CLIENT.design_preset.
 * Place inside <head> in app/layout.tsx — runs server-side, zero JS bundle cost.
 */
export function ThemeProvider() {
  const css = getPresetCSS(CLIENT.design_preset, CLIENT.color_overrides);
  return (
    <style
      id="theme-preset"
      dangerouslySetInnerHTML={{ __html: `:root { ${css} }` }}
    />
  );
}
