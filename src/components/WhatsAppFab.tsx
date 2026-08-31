import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <motion.a
      href={waLink(`Halo ${SITE.brand}, saya ingin memesan armada.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Pesan via WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.1, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-gold/25" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
