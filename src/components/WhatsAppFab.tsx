import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    adtrack?: (...args: any[]) => void;
    VRNTrack?: {
      trackClick: (data: {
        type: string;
        target: string;
        timestamp: string;
      }) => void;
    };
  }
}

export function WhatsAppFab() {
  const handleClick = () => {
    if (typeof window === "undefined") return;

    // Konversi Google Ads Jakarta
    window.gtag?.("event", "conversion", {
      send_to: "AW-18452315188/3jLsCN_pv4MdELT4395E",
    });

    // Pemicu Event Konversi AdTrackPro
    window.adtrack?.("conversion", {
      event: "whatsapp_click",
    });

    // Pemicu Event Konversi VRNTrack
    window.VRNTrack?.trackClick({
      type: "whatsapp_fab",
      target: "floating_whatsapp",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <motion.a
      href={waLink(`Halo ${SITE.brand}, saya ingin memesan armada.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan via WhatsApp"
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1.1,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-[var(--shadow-gold)]"
    >
      <span
        className="absolute inset-0 animate-ping rounded-full bg-gold/25"
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
