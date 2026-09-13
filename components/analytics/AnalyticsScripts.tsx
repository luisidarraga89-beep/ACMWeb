"use client";

/**
 * components/analytics/AnalyticsScripts.tsx
 * Loads Google Analytics / Google Ads / Meta Pixel only after the visitor
 * accepts cookies, and only for the providers that actually have an ID
 * configured (NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GOOGLE_ADS_ID,
 * NEXT_PUBLIC_META_PIXEL_ID). With none of those set, this renders
 * nothing — flip the env vars on in Vercel and tracking turns on
 * automatically, still gated by consent.
 */
import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { getStoredConsent, onConsentChange, ConsentStatus } from "@/lib/consent";

export default function AnalyticsScripts() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    return onConsentChange(setConsent);
  }, []);

  if (consent !== "accepted") return null;

  const { ga4Id, googleAdsId, metaPixelId } = siteConfig.analytics;
  const gtagId = ga4Id || googleAdsId;

  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
            `}
          </Script>
        </>
      )}
      {metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
