"use client";

import { useEffect, useRef } from "react";

export interface GoogleAdsTrackingPayload {
  gclid?: string | null;
  wbraid?: string | null;
  gbraid?: string | null;
  gad_source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  keyword?: string | null;
  device?: string | null;
  matchtype?: string | null;
  network?: string | null;
  creative?: string | null;
  landing_page?: string;
  referrer?: string;
  user_agent?: string;
  timestamp?: string;
}

export interface VRNTrackInstance {
  init?: (options: { tracking_key: string; [key: string]: any }) => void;
  trackClick?: (data?: any) => void;
  track?: (event: string, data?: any) => void;
  [key: string]: any;
}

declare global {
  interface Window {
    VRNTrack?: VRNTrackInstance;
    gtag?: (...args: any[]) => void;
    adtrack?: (...args: any[]) => void;
  }
}

export function GoogleAdsTracker() {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isInitializedRef.current) return;
    isInitializedRef.current = true;

    // NOTE: VRNTrack is auto-initialised by the <script data-tracking-key="..."> tag
    // in __root.tsx → RootShell. Do NOT call VRNTrack.init() here; doing so would fire
    // a second page_view event on every route mount.

    // 1. Pasang Event Listener Global untuk Tombol CTA (WhatsApp, Tel, Booking Link)
    const handleGlobalCtaClick = (event: MouseEvent) => {
      try {
        const target = (event.target as HTMLElement | null)?.closest("a, button");
        if (!target) return;

        const href = target.getAttribute("href") || "";
        const isWhatsApp = href.includes("wa.me") || href.includes("whatsapp");
        const isTel = href.startsWith("tel:");
        const isBooking =
          target.getAttribute("data-cta") === "booking" ||
          href.includes("kontak") ||
          target.textContent?.toLowerCase().includes("pesan") ||
          target.textContent?.toLowerCase().includes("booking") ||
          target.textContent?.toLowerCase().includes("sewa");

        if (isWhatsApp || isTel || isBooking) {
          if (window.VRNTrack && typeof window.VRNTrack.trackClick === "function") {
            window.VRNTrack.trackClick({
              type: isWhatsApp ? "whatsapp" : isTel ? "phone" : "cta_booking",
              href: href || undefined,
              text: target.textContent?.trim() || "",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        console.warn("[VRNTrack] Error capturing click event:", err);
      }
    };

    document.addEventListener("click", handleGlobalCtaClick, { capture: true });

    // 2. Tangkap Parameter Google Ads & Kirim ke /api/track
    try {
      const urlParams = new URLSearchParams(window.location.search);

      const gclid = urlParams.get("gclid");
      const wbraid = urlParams.get("wbraid");
      const gbraid = urlParams.get("gbraid");
      const gadSource = urlParams.get("gad_source");
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmContent = urlParams.get("utm_content");
      const utmTerm = urlParams.get("utm_term");
      const campaignId = urlParams.get("campaign_id");
      const adgroupId = urlParams.get("adgroup_id");
      const keyword = urlParams.get("keyword");
      const device = urlParams.get("device");
      const matchtype = urlParams.get("matchtype");
      const network = urlParams.get("network");
      const creative = urlParams.get("creative");

      const hasAdsParam = Boolean(
        gclid ||
        wbraid ||
        gbraid ||
        gadSource ||
        utmSource ||
        utmMedium ||
        utmCampaign ||
        utmContent ||
        utmTerm ||
        keyword
      );

      if (hasAdsParam) {
        const trackingKey = `tracked_gads_${gclid || utmCampaign || window.location.search}`;
        if (!sessionStorage.getItem(trackingKey)) {
          const payload: GoogleAdsTrackingPayload = {
            gclid: gclid || null,
            wbraid: wbraid || null,
            gbraid: gbraid || null,
            gad_source: gadSource || null,
            utm_source: utmSource || null,
            utm_medium: utmMedium || null,
            utm_campaign: utmCampaign || null,
            utm_content: utmContent || null,
            utm_term: utmTerm || null,
            campaign_id: campaignId || null,
            adgroup_id: adgroupId || null,
            keyword: keyword || null,
            device: device || null,
            matchtype: matchtype || null,
            network: network || null,
            creative: creative || null,
            landing_page: window.location.href,
            referrer: document.referrer || "direct",
            user_agent: navigator.userAgent || "",
            timestamp: new Date().toISOString(),
          };

          sessionStorage.setItem(trackingKey, "true");

          fetch("/api/track", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch((err) => {
            console.warn("[GoogleAdsTracker] Tracking request failed:", err);
          });
        }
      }
    } catch (e) {
      console.warn("[GoogleAdsTracker] Error capturing tracking params:", e);
    }

    return () => {
      document.removeEventListener("click", handleGlobalCtaClick, { capture: true });
    };
  }, []);

  return null;
}

export default GoogleAdsTracker;