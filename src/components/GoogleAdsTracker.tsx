"use client";

import { useEffect } from "react";

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

export function GoogleAdsTracker() {
  useEffect(() => {
    // Pastikan berjalan hanya di client browser
    if (typeof window === "undefined") return;

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

      // Cek apakah ada parameter iklan / UTM yang masuk
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

      if (!hasAdsParam) return;

      // Cegah duplikasi pengiriman berulang untuk gclid / session yang sama
      const trackingKey = `tracked_gads_${gclid || utmCampaign || window.location.search}`;
      if (sessionStorage.getItem(trackingKey)) {
        return;
      }

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

      // Tandai sudah ditrack di session
      sessionStorage.setItem(trackingKey, "true");

      // Kirim data ke API Route /api/track secara non-blocking (asynchronous)
      fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true, // Memastikan request tetap terkirim meski user berpindah halaman
      }).catch((err) => {
        // Jangan ganggu UI jika terjadi kesalahan jaringan
        console.warn("[GoogleAdsTracker] Tracking request failed:", err);
      });
    } catch (e) {
      console.warn("[GoogleAdsTracker] Error capturing tracking params:", e);
    }
  }, []);

  return null;
}

export default GoogleAdsTracker;
