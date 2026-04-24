'use client';

import { useState, useEffect } from 'react';
import { FEATURED_REVIEWS, AGGREGATE } from '@/data/reviews';
import { CLIENT } from '@/lib/client';

const ACC = CLIENT.colors.accent;
const BDR = CLIENT.colors.border;
const BG_D = CLIENT.colors.bg_dark;
const FG  = CLIENT.colors.fg;
const MUT = CLIENT.colors.fg_muted;

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.8 7.2v6h7.8c4.5-4.2 7.3-10.4 7.3-17.3z" />
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-7.8-6c-2.2 1.5-5 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9H2.4v6.2C6.4 42.6 14.6 48 24 48z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.2.8-4.6v-6.2H2.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.4 10.8l8.1-6.2z" />
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.8-6.8C35.9 2.1 30.4 0 24 0 14.6 0 6.4 5.4 2.4 13.2l8.1 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
    </svg>
  );
}

export default function SocialProofStrip() {
  const [idx, setIdx] = useState(0);

  // setTimeout + [idx] dependency: every manual click resets the 6-second countdown
  useEffect(() => {
    if (FEATURED_REVIEWS.length <= 1) return;
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % FEATURED_REVIEWS.length);
    }, 6000);
    return () => clearTimeout(t);
  }, [idx]);

  if (!FEATURED_REVIEWS || FEATURED_REVIEWS.length === 0) return null;

  const review = FEATURED_REVIEWS[idx];

  const prev = () => setIdx((i) => (i - 1 + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length);
  const next = () => setIdx((i) => (i + 1) % FEATURED_REVIEWS.length);

  return (
    <section
      className="w-full"
      style={{
        background: BG_D,
        borderTop: `1px solid ${BDR}`,
        borderBottom: `1px solid ${BDR}`,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-5 md:py-6">
        {/* Desktop: side-by-side | Mobile: stacked */}
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">

          {/* LEFT — Aggregate block */}
          <div className="flex items-center gap-3 shrink-0 md:order-3 order-1">
            <GoogleG />
            <div className="flex items-center gap-1.5">
              <span style={{ color: ACC }} className="text-base leading-none tracking-wider">★★★★★</span>
              <span style={{ color: FG }} className="font-bold text-base">{AGGREGATE.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Divider — desktop only */}
          <div
            className="hidden md:block shrink-0 md:order-2 self-stretch"
            style={{ width: '1px', background: BDR, minHeight: '48px' }}
          />

          {/* RIGHT — Rotating quote */}
          <div className="flex-1 flex items-center gap-2 min-w-0 md:order-1 order-2 w-full md:w-auto">

            {/* Next arrow (left side — RTL: next is on the left) */}
            <button
              onClick={next}
              aria-label="ביקורת הבאה"
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg transition-colors"
              style={{
                border: `1px solid ${BDR}`,
                color: MUT,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACC)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUT)}
            >
              &#8249;
            </button>

            {/* Quote body */}
            <div className="flex-1 min-w-0" dir="rtl" style={{ textAlign: 'right' }}>
              <p
                style={{ color: FG }}
                className="text-sm leading-relaxed"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textAlign: 'right',
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${ACC}, ${CLIENT.colors.accent_dark})`,
                    color: '#fff',
                  }}
                >
                  {review.initial}
                </div>
                <span style={{ color: FG }} className="text-sm font-medium truncate">{review.name}</span>
              </div>
            </div>

            {/* Prev arrow (right side — RTL: prev is on the right) */}
            <button
              onClick={prev}
              aria-label="ביקורת קודמת"
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg transition-colors"
              style={{
                border: `1px solid ${BDR}`,
                color: MUT,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACC)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUT)}
            >
              &#8250;
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
