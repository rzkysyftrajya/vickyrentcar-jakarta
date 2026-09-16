import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";

export function LuxuryIntro() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem("vicky_intro_shown", "1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Only show once per browser session
    try {
      const shown = sessionStorage.getItem("vicky_intro_shown");
      if (!shown) {
        setVisible(true);
        const timer = setTimeout(() => {
          dismiss();
        }, 1350);
        return () => clearTimeout(timer);
      }
    } catch {
      // fallback
    }
  }, [dismiss]);

  // Allow instant dismiss on click, keydown, or touch
  useEffect(() => {
    if (!visible) return;
    const handleInteraction = () => dismiss();
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    return () => {
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#050A12] select-none"
          aria-label="Vicky Rentcar Jakarta Welcome"
        >
          {/* Subtle ambient gold glow behind logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.35 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-gold/30 blur-[90px]"
          />

          {/* Logo & Brand text */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <img
              src="/logo.webp"
              alt="Vicky Rentcar Logo"
              className="h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            />
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 font-display text-2xl sm:text-3xl tracking-wide text-foreground"
            >
              Vicky <span className="gold-shimmer-text font-normal">Rentcar</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-2 text-[0.62rem] sm:text-xs tracking-[0.35em] text-muted-foreground uppercase"
            >
              Jakarta • Luxury Mobility & Chauffeur
            </motion.p>
          </motion.div>

          {/* Elegant gold progress line at the bottom */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gold/15 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
