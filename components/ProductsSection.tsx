import { CLIENT } from "@/lib/client";
import { PRODUCT_MAP } from "@/lib/products";

export function ProductsSection({ excludeTraining = false }: { excludeTraining?: boolean }) {
  const BG_DARK = CLIENT.colors.bg_dark;
  const ACC     = CLIENT.colors.accent;
  const ACC_L   = CLIENT.colors.accent_light;
  const ACC_D   = CLIENT.colors.accent_dark;
  const FG      = CLIENT.colors.fg;
  const MUT     = CLIENT.colors.fg_muted;
  const BDR     = CLIENT.colors.border;
  const CARD    = CLIENT.colors.card;

  const overlay   = `linear-gradient(to top, ${BG_DARK}ff 0%, ${BG_DARK}e6 18%, ${BG_DARK}8c 35%, ${BG_DARK}26 55%, transparent 70%)`;
  const nameStyle: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: FG, marginBottom: 6 };
  const priceStyle: React.CSSProperties = { fontSize: 19, fontWeight: 800, color: ACC, marginBottom: 2 };
  const descStyle: React.CSSProperties = { fontSize: 14, color: `${FG}cc`, lineHeight: 1.6, marginBottom: 14 };
  const ctaStyle: React.CSSProperties = { display: "inline-block", padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 700, border: `1px solid ${ACC}8c`, color: FG };

  // Build ladder steps dynamically from active modules
  const steps: { href: string; price: string; name: string; desc: string; image: string; cta: string; tag?: string }[] = [];

  if (!excludeTraining) {
    steps.push({
      href: "/training", price: "חינם",
      name: CLIENT.products.training.title,
      desc: CLIENT.products.training.description,
      image: CLIENT.products.training.image || "/og-image.jpg",
      cta: "התחל כאן ←", tag: "מתחילים כאן",
    });
  }
  if (CLIENT.modules.challenge) {
    steps.push({
      href: "/challenge",
      price: `₪${CLIENT.products.challenge.price}`,
      name: CLIENT.products.challenge.title,
      desc: CLIENT.products.challenge.description,
      image: CLIENT.products.challenge.image || "/og-image.jpg",
      cta: "להתחיל ←",
    });
  }
  if (CLIENT.modules.workshop) {
    steps.push({
      href: "/workshop",
      price: `₪${PRODUCT_MAP.workshop_1080.price.toLocaleString("he-IL")}`,
      name: CLIENT.products.workshop.title,
      desc: CLIENT.products.workshop.description,
      image: CLIENT.products.workshop.image || "/og-image.jpg",
      cta: "קבע יום ←",
    });
  }
  if (CLIENT.modules.course) {
    steps.push({
      href: "/course",
      price: `₪${CLIENT.products.course.price.toLocaleString("he-IL")}`,
      name: CLIENT.products.course.title,
      desc: CLIENT.products.course.description,
      image: CLIENT.products.course.image || "/og-image.jpg",
      cta: "לקורס ←",
    });
  }
  if (CLIENT.modules.strategy) {
    steps.push({
      href: "/strategy",
      price: `₪${PRODUCT_MAP.strategy_4000.price.toLocaleString("he-IL")}`,
      name: CLIENT.products.strategy.title,
      desc: CLIENT.products.strategy.description,
      image: CLIENT.products.strategy.image || "/og-image.jpg",
      cta: "קבע פגישה ←", tag: "מומלץ",
    });
  }

  const premiumSteps: typeof steps = [];
  if (CLIENT.modules.premium) {
    premiumSteps.push({
      href: "/premium",
      price: `₪${CLIENT.products.premium.price.toLocaleString("he-IL")}`,
      name: CLIENT.products.premium.title,
      desc: CLIENT.products.premium.description,
      image: CLIENT.products.premium.image || "/og-image.jpg",
      cta: "לפרטים ←",
    });
  }
  if (CLIENT.modules.partnership) {
    premiumSteps.push({
      href: "/partnership",
      price: "בהתאמה אישית",
      name: CLIENT.products.partnership.title,
      desc: CLIENT.products.partnership.description,
      image: CLIENT.products.partnership.image || "/og-image.jpg",
      cta: "בדוק התאמה ←",
    });
  }

  const showHive = CLIENT.modules.hive;

  return (
    <section id="products" style={{ background: BG_DARK }}>
      <div style={{ color: FG }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", padding: "80px 40px 56px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>
            {/* TODO: replace with client product ladder headline */}
            <span style={{ color: FG }}>כל אחד נמצא</span><br />
            <span style={{ background: `linear-gradient(135deg, ${ACC_L}, ${ACC}, ${ACC_D})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              במקום אחר
            </span>
          </h2>
          {/* TODO: replace with client product ladder tagline */}
          <p style={{ color: MUT, fontSize: "0.95rem" }}>
            בחר את הנקודה שמתאימה לך עכשיו
          </p>
        </div>

        {/* ── Ladder ── */}
        {steps.length > 0 && (
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <div style={{ position: "absolute", right: "calc(50% + 28px)", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${ACC}2e 10%, ${ACC}2e 90%, transparent)`, pointerEvents: "none" }} />
            {steps.map((step, i) => {
              const isRight = i % 2 === 0;
              const isLast  = i === steps.length - 1;
              const isGold  = step.tag === "מומלץ";
              const card = (
                <a href={step.href} className="nf-card" style={{ position: "relative", height: "420px", overflow: "hidden", display: "block" }}>
                  <img src={step.image} loading="lazy" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
                  <div style={{ position: "absolute", inset: 0, background: overlay }} />
                  {step.tag && (
                    <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, color: isGold ? "#1A1206" : ACC, background: isGold ? `linear-gradient(135deg,${ACC_L},${ACC})` : `${ACC}26`, border: isGold ? "none" : `1px solid ${ACC}4d`, borderRadius: 4, padding: "2px 8px", zIndex: 2 }}>{step.tag}</div>
                  )}
                  <div style={{ position: "absolute", left: 8, top: 8, fontSize: "5rem", fontWeight: 800, color: "rgba(255,255,255,0.22)", lineHeight: 1, userSelect: "none" }}>{i + 1}</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px 20px", zIndex: 2, textAlign: "right" }}>
                    <div style={priceStyle}>{step.price}</div>
                    <div style={nameStyle}>{step.name}</div>
                    <p style={descStyle}>{step.desc}</p>
                    <span style={isGold ? { display: "inline-block", padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 700, background: `linear-gradient(135deg,${ACC_L},${ACC},${ACC_D})`, color: "#1A1206", border: "none" } : ctaStyle}>{step.cta}</span>
                  </div>
                </a>
              );
              return (
                <div key={step.href}>
                  <div className="nf-row">
                    {isRight ? <div className="nf-empty" /> : card}
                    <div className={`nf-node${isGold ? " nf-node-gold" : ""}`} style={isGold ? { background: `linear-gradient(135deg,${ACC_L},${ACC},${ACC_D})`, color: "#1A1206", border: "none" } : { borderColor: `${ACC}59`, background: CARD, color: ACC }}>{i + 1}</div>
                    {isRight ? card : <div className="nf-empty" />}
                  </div>
                  {!isLast && (
                    <div className="nf-connector"><div /><div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: 1, height: 40, background: `${ACC}2e` }} /></div><div /></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Premium section ── */}
        {premiumSteps.length > 0 && (
          <>
            <div style={{ maxWidth: 780, margin: "48px auto 8px", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: `${ACC}40` }} />
              <span style={{ fontSize: 24, letterSpacing: "0.06em", fontWeight: 800, color: FG }}>פרימיום</span>
              <div style={{ flex: 1, height: 1, background: `${ACC}40` }} />
            </div>
            <div className="nf-premium-grid" style={{ maxWidth: 960, margin: "16px auto", padding: "0 24px" }}>
              {premiumSteps.map((step) => (
                <a key={step.href} href={step.href} className="nf-card" style={{ position: "relative", height: "420px", overflow: "hidden", display: "block" }}>
                  <img src={step.image} loading="lazy" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 5%" }} />
                  <div style={{ position: "absolute", inset: 0, background: overlay }} />
                  <div style={{ position: "absolute", top: 14, left: 14, fontSize: 11, fontWeight: 700, color: ACC, background: `${ACC}26`, border: `1px solid ${ACC}4d`, borderRadius: 6, padding: "4px 10px", letterSpacing: "0.08em", zIndex: 2 }}>PREMIUM</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px 20px", zIndex: 2, textAlign: "right" }}>
                    <div style={priceStyle}>{step.price}</div>
                    <div style={nameStyle}>{step.name}</div>
                    <p style={descStyle}>{step.desc}</p>
                    <span style={ctaStyle}>{step.cta}</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* ── Hive ── */}
        {showHive && (
          <>
            <div style={{ maxWidth: 780, margin: "32px auto 8px", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: `${ACC}40` }} />
              <span style={{ fontSize: 24, letterSpacing: "0.06em", fontWeight: 800, color: FG }}>קהילה</span>
              <div style={{ flex: 1, height: 1, background: `${ACC}40` }} />
            </div>
            <div style={{ maxWidth: 500, margin: "16px auto 80px", padding: "0 24px" }}>
              <a href="/hive" className="nf-card" style={{ position: "relative", height: "420px", overflow: "hidden", display: "block" }}>
                <img src={CLIENT.products.hive.image || "/og-image.jpg"} loading="lazy" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 10%" }} />
                <div style={{ position: "absolute", inset: 0, background: overlay }} />
                <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, color: "#1A1206", background: `linear-gradient(135deg,${ACC_L},${ACC})`, borderRadius: 4, padding: "2px 8px", zIndex: 2 }}>פופולרי</div>
                <div style={{ position: "absolute", bottom: 80, right: 16, fontSize: "2.4rem", zIndex: 2 }}>🐝</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px 20px", zIndex: 2, display: "flex", alignItems: "center", gap: 16, textAlign: "right" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: FG, marginBottom: 4 }}>{CLIENT.products.hive.title}</div>
                    <p style={{ fontSize: 14, color: `${FG}cc`, lineHeight: 1.5 }}>{CLIENT.products.hive.description}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: "center" }}>
                    <div style={{ fontSize: 19, fontWeight: 800, color: ACC, lineHeight: 1 }}>₪{CLIENT.products.hive.price_basic}</div>
                    <div style={{ fontSize: 12, color: `${FG}80`, marginBottom: 10 }}>לחודש</div>
                    <span style={{ display: "inline-block", background: `linear-gradient(135deg,${ACC_L},${ACC},${ACC_D})`, color: "#1A1206", fontWeight: 700, borderRadius: 9999, padding: "10px 24px", fontSize: 14 }}>הצטרף ←</span>
                  </div>
                </div>
              </a>
            </div>
          </>
        )}

      </div>

      <style>{`
        .nf-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: center;
        }
        .nf-connector {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          height: 56px;
        }
        .nf-node {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(201,150,74,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          margin: 0 auto;
        }
        .nf-empty {}
        .nf-card {
          display: block;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid ${BDR};
          background: ${CARD};
          text-decoration: none;
          color: inherit;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .nf-card:hover {
          border-color: ${ACC}66;
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }
        .nf-premium-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 768px) {
          .nf-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .nf-row .nf-empty { display: none; }
          .nf-row .nf-node { order: -1; }
          .nf-row .nf-card { width: 100%; }
          .nf-connector {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .nf-connector > div:first-child,
          .nf-connector > div:last-child { display: none; }
          .nf-premium-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
