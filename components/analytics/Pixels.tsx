"use client";

import Script from "next/script";

/**
 * Google Analytics 4 only.
 * Meta Pixel is initialized inline in layout.tsx head with strategy="beforeInteractive"
 * (synchronous, before hydration) guarded by NEXT_PUBLIC_META_PIXEL_ID.
 * If NEXT_PUBLIC_GA_MEASUREMENT_ID is not set, this component returns null (no-op).
 */
export function Pixels() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaId}',{send_page_view:true});`}
      </Script>
    </>
  );
}
