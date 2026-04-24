import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Pixels }              from "@/components/analytics/Pixels";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { MobileNavServer }     from "@/components/MobileNavServer";
import { DesktopNavServer }    from "@/components/DesktopNavServer";
import { LayoutShell }         from "@/components/LayoutShell";
import { SchemaMarkup }        from "@/components/SchemaMarkup";
import { ThemeProvider }       from "@/components/ThemeProvider";
import { CLIENT }              from "@/lib/client";

const assistant = Assistant({
  subsets:  ["hebrew", "latin"],
  variable: "--font-assistant",
  display:  "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const OG_IMAGE = `https://${CLIENT.domain}${CLIENT.meta.og_image}`;

const TITLE       = CLIENT.meta.title;
const DESCRIPTION = CLIENT.meta.description;

export const metadata: Metadata = {
  title: {
    default:  TITLE,
    template: `%s | ${CLIENT.name}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    type:        "website",
    locale:      "he_IL",
    siteName:    CLIENT.name,
    title:       TITLE,
    description: DESCRIPTION,
    url:         APP_URL,
    images:      [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: DESCRIPTION,
    images:      [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} h-full`}
    >
      <head>
        <ThemeProvider />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="beforeInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('set','autoConfig',false,'${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}</Script>
            <noscript><img height="1" width="1" style={{display:"none"}} src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" /></noscript>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col font-assistant antialiased" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <SchemaMarkup />
        <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
        <Pixels />
        <AccessibilityWidget />
        <LayoutShell nav={<><MobileNavServer /><DesktopNavServer /></>}>
          <div id="main-content" tabIndex={-1} style={{ outline: "none" }} />
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
