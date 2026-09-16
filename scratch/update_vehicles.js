import fs from 'fs';

const introContent = `import { motion, AnimatePresence } from "motion/react";
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
`;

const heroContent = `import { motion } from "motion/react";
import { ShieldCheck, Clock, Sparkles, UserCheck, ArrowRight, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { ShieldCheck, Clock, Sparkles, UserCheck, ArrowRight, Phone, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";
import { useLanguage } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });

  // Interactive mouse tracking for luxury dynamic spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const trustPoints = [
    {
      icon: Clock,
      title: t("Layanan 24/7", "24/7 Service"),
      desc: t("Siap melayani kapan saja", "Ready anytime you need"),
    },
    {
      icon: Sparkles,
      title: t("Unit Bersih & Prima", "Clean & Prime Units"),
      desc: t("Wangi, nyaman & terawat", "Fresh, cozy & well-kept"),
    },
    {
      icon: UserCheck,
      title: t("Driver Profesional", "Professional Drivers"),
      desc: t("Ramah, tepat waktu & hafal rute", "Polite, punctual & skilled"),
    },
    {
      icon: ShieldCheck,
      title: t("Harga Transparan", "Transparent Pricing"),
      desc: t("Bebas biaya tersembunyi", "No hidden charges"),
    },
  ];

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24"
      aria-label="Hero — Rental Mobil Mewah Jakarta"
    >
      {/* ─── Background Visual with Luxury Gradients ─── */}
      {/* ─── Layer 1: Luxury Background Visual with Ken-Burns subtle zoom ─── */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src="/hero-section/frame_046.webp"
          alt="Armada Mewah Vicky Rentcar Jakarta"
          className="h-full w-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          className="h-full w-full object-cover object-center opacity-40 scale-105 transition-transform duration-[12000ms] ease-out animate-[pulse_10s_ease-in-out_infinite]"
          loading="eager"
        />
        
        {/* Deep luxury ambient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        
        {/* Soft Gold Ambient Glows */}
        {/* ─── Layer 2: Interactive Dynamic Gold Showroom Spotlight ─── */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]"
          className="pointer-events-none absolute -inset-full opacity-60 transition-all duration-700 ease-out"
          style={{
            background: \`radial-gradient(650px circle at \${mousePos.x}% \${mousePos.y}%, rgba(212, 175, 55, 0.14), transparent 70%)\`,
          }}
          aria-hidden="true"
        />

        {/* Ambient static gold glow */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]"
          aria-hidden="true"
        />
      </div>

      {/* ─── Main Hero Content ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full">
        <div className="max-w-3xl">
          {/* Top VIP Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[0.7rem] font-medium tracking-[0.2em] text-gold uppercase">
              {t("Rental Mobil Mewah & Terpercaya Jakarta", "Luxury & Trusted Car Rental Jakarta")}
            </span>
          </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Top VIP Pill with live indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.2em] text-gold uppercase">
                {t("Unit Siap 24 Jam • Rental Mobil Mewah Jakarta", "24/7 Ready • Jakarta Luxury Car Rental")}
              </span>
            </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-4xl leading-[1.1] sm:text-6xl lg:text-7xl font-light text-foreground"
          >
            {t("Perjalanan Eksklusif,", "Exclusive Travel,")}{" "}
            <span className="gold-text font-normal block sm:inline">
              {t("Kenyamanan Tanpa Kompromi", "Uncompromised Comfort")}
            </span>
          </motion.h1>
            {/* Headline with metallic gold shimmer */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-4xl leading-[1.1] sm:text-6xl lg:text-7xl font-light text-foreground"
            >
              {t("Perjalanan Eksklusif,", "Exclusive Travel,")}{" "}
              <span className="gold-shimmer-text font-normal block sm:inline">
                {t("Kenyamanan Tanpa Kompromi", "Uncompromised Comfort")}
              </span>
            </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t(
              "Sewa mobil premium di Jakarta dengan supir profesional & armada terawat. Alphard, Zenix, Hiace Premio & armada terbaik siap 24 jam untuk kebutuhan bisnis, keluarga, atau pernikahan.",
              "Premium car rental in Jakarta with professional chauffeurs & prime fleet. Alphard, Zenix, Hiace Premio & more ready 24/7 for business, family, or weddings.",
            )}
          </motion.p>
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t(
                "Sewa mobil premium di Jakarta dengan supir profesional & armada terawat. Alphard, Zenix, Hiace Premio & armada terbaik siap 24 jam untuk kebutuhan bisnis, keluarga, atau tamu VIP.",
                "Premium car rental in Jakarta with professional chauffeurs & prime fleet. Alphard, Zenix, Hiace Premio & more ready 24/7 for business, family, or VIP guests.",
              )}
            </motion.p>

          {/* CTA Buttons */}
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={waLink("Halo Vickyrentcar Jakarta, saya ingin reservasi armada.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_10px_35px_-10px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_40px_-8px_rgba(212,175,55,0.7)] cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>{t("Reservasi via WhatsApp", "Book via WhatsApp")}</span>
              </a>

              <Link
                to="/armada"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold cursor-pointer"
              >
                <span>{t("Lihat Pilihan Armada", "Explore Fleet")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={\`tel:\${SITE.phone.replace(/\\s+/g, "")}\`}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs tracking-wider text-muted-foreground transition-colors hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                <span>{SITE.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Floating VIP Live Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-4 justify-end"
          >
            <a
              href={waLink("Halo Vickyrentcar Jakarta, saya ingin reservasi armada.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_-8px_rgba(212,175,55,0.6)] cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t("Reservasi via WhatsApp", "Book via WhatsApp")}</span>
            </a>
            <div className="glass relative rounded-2xl p-6 border border-gold/25 max-w-sm w-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-foreground">4.9 / 5.0</span>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[0.62rem] font-medium text-emerald-400 uppercase tracking-wider">
                  Verified 24/7
                </span>
              </div>

            <Link
              to="/armada"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold cursor-pointer"
            >
              <span>{t("Lihat Pilihan Armada", "Explore Fleet")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{t("Status Unit", "Fleet Status")}</span>
                  <span className="font-medium text-gold">{t("Tersedia & Siap Jalan", "Available & Ready")}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{t("Area Layanan", "Service Area")}</span>
                  <span className="font-medium text-foreground">Jabodetabek & Luar Kota</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{t("Antar Jemput Bandara", "Airport Pick-up")}</span>
                  <span className="font-medium text-foreground">Soekarno-Hatta & Halim</span>
                </div>
              </div>

            <a
              href={\`tel:\${SITE.phone.replace(/\\s+/g, "")}\`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs tracking-wider text-muted-foreground transition-colors hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.phone}</span>
            </a>
              <div className="mt-5 pt-4 border-t border-gold/15">
                <p className="text-[0.72rem] text-muted-foreground leading-relaxed italic">
                  “{t("Pelayanan selalu tepat waktu, unit wangi dan supir sangat profesional.", "Always on time, clean cars and very professional chauffeurs.")}”
                </p>
                <p className="mt-2 text-[0.62rem] tracking-widest text-gold uppercase font-medium">
                  — PT Logistik Multinasional Jakarta
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── Bottom Trust Highlights ─── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 pt-8 border-t border-gold/15 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          className="mt-14 sm:mt-18 pt-8 border-t border-gold/15 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-gold/10 bg-card/20 p-3.5 backdrop-blur-sm transition-colors hover:border-gold/30"
                className="flex items-start gap-3 rounded-xl border border-gold/10 bg-card/20 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-card/40 hover:-translate-y-0.5"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-foreground">{item.title}</h4>
                  <p className="mt-0.5 text-[0.68rem] text-muted-foreground leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/components/LuxuryIntro.tsx', introContent);
console.log('Successfully written LuxuryIntro.tsx');

fs.writeFileSync('src/components/sections/Hero.tsx', heroContent);
console.log('Successfully written new non-sticky Hero.tsx');
console.log('Successfully written enhanced Hero.tsx');


const componentContent = `import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Total ${totalImages} foto dokumentasi & testimoni pelanggan nyata
const GALLERY_IMAGES: string[] = Array.from(
  { length: ${totalImages} },
  (_, i) => \`/galeri/galeri-\${i + 1}.webp\`
);

const HALF = Math.ceil(GALLERY_IMAGES.length / 2);
const ROW_1: string[] = GALLERY_IMAGES.slice(0, HALF);
const ROW_2: string[] = GALLERY_IMAGES.slice(HALF);

export function GalleryTestimonials() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    );
  }, []);

  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <section
      id="galeri-testimoni"
      className="relative overflow-hidden py-16 sm:py-24"
      aria-label="Galeri Testimoni Pelanggan"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]"
        aria-hidden="true"
      />

      {/* Side gradient edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Row 1: Leftward Stream */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...ROW_1, ...ROW_1].map((src, idx) => {
              const originalIndex = idx % ROW_1.length;
              return (
                <GalleryCard
                  key={\`r1-\${idx}\`}
                  src={src}
                  index={originalIndex}
                  onSelect={() => setSelectedIdx(originalIndex)}
                />
              );
            })}
          </div>
        </div>

        {/* Row 2: Rightward (Reverse) Stream */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-reverse-smooth flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...ROW_2, ...ROW_2].map((src, idx) => {
              const originalIndex = HALF + (idx % ROW_2.length);
              return (
                <GalleryCard
                  key={\`r2-\${idx}\`}
                  src={src}
                  index={originalIndex}
                  onSelect={() => setSelectedIdx(originalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau Foto Testimoni"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-foreground backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter Badge */}
            <div className="absolute top-6 left-6 z-50 rounded-full border border-gold/25 bg-black/60 px-4 py-1.5 text-xs tracking-widest text-gold/90 uppercase backdrop-blur-md">
              {selectedIdx + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Prev / Next Navigation */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black sm:h-14 sm:w-14 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black sm:h-14 sm:w-14 cursor-pointer"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-gold/30 bg-card/60 shadow-2xl"
            >
              <img
                src={GALLERY_IMAGES[selectedIdx]}
                alt={\`Foto Testimoni Pelanggan Vicky Rentcar \${selectedIdx + 1}\`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  src,
  index,
  onSelect,
}: {
  src: string;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative h-48 w-64 sm:h-64 sm:w-80 md:h-72 md:w-96 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gold/20 bg-card/40 transition-all duration-500 hover:z-20 hover:scale-[1.03] hover:border-gold/60 hover:shadow-[0_12px_40px_-10px_rgba(212,175,55,0.35)]"
      aria-label={\`Buka foto testimoni #\${index + 1}\`}
    >
      <img
        src={src}
        alt={\`Foto Testimoni Vicky Rentcar \${index + 1}\`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-end p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}
`;

fs.writeFileSync('src/components/sections/GalleryTestimonials.tsx', componentContent);
console.log('Successfully written GalleryTestimonials.tsx with clean formatting!');




