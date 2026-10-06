import { motion } from "motion/react";
import { ShieldCheck, Clock, Sparkles, UserCheck, ArrowRight, Phone, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";
import { useLanguage } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const { t } = useLanguage();

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
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24"
      aria-label="Hero — Rental Mobil dengan Sopir Jakarta"
    >
      {/* ─── Layer 1: Background Visual with Ken-Burns subtle zoom ─── */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src="/hero-section/frame_046.webp"
          alt="Armada Vicky Rentcar Jakarta"
          className="h-full w-full object-cover object-center opacity-40 scale-105 transition-transform duration-[12000ms] ease-out animate-[pulse_10s_ease-in-out_infinite]"
          loading="eager"
        />
        
        <div className="absolute inset-0 bg-background/75" />
      </div>

      {/* ─── Main Hero Content ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Top service availability pill with live indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.2em] text-gold uppercase">
                {t("Unit Siap 24 Jam • Rental Mobil dengan Sopir Jakarta", "24/7 Ready • Jakarta Chauffeur Car Rental")}
              </span>
            </motion.div>

            {/* Main service and location headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-4xl leading-[1.1] sm:text-6xl lg:text-7xl font-light text-foreground"
            >
              {t("Sewa Mobil Jakarta", "Car Rental in Jakarta")}{" "}
              <span className="gold-text font-normal block sm:inline">
                {t("dengan Driver Profesional", "with a Professional Driver")}
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
                "Pilih Alphard, Innova Zenix, Innova Reborn, atau Hiace Premio untuk perjalanan bandara, bisnis, keluarga, dan luar kota. Armada terawat dengan layanan reservasi 24 jam.",
                "Choose Alphard, Innova Zenix, Innova Reborn, or Hiace Premio for airport, business, family, and out-of-town trips. Well-maintained vehicles with 24/7 booking.",
              )}
            </motion.p>

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
                onClick={() => window.VRNTrack?.trackClick?.({ target: "hero_whatsapp" })}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-gold)] cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>{t("Reservasi via WhatsApp", "Book via WhatsApp")}</span>
              </a>

              <Link
                to="/armada"
                onClick={() => window.VRNTrack?.trackClick?.({ target: "hero_explore_fleet" })}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold cursor-pointer"
              >
                <span>{t("Lihat Pilihan Armada", "Explore Fleet")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                onClick={() => window.VRNTrack?.trackClick?.({ target: "hero_phone" })}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs tracking-wider text-muted-foreground transition-colors hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                <span>{SITE.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Floating service availability card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-4 justify-end"
          >
            <div className="glass relative rounded-2xl p-6 border border-gold/25 max-w-sm w-full shadow-[var(--shadow-luxe)] backdrop-blur-xl">
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

              <div className="mt-5 pt-4 border-t border-gold/15">
                <p className="text-[0.72rem] text-muted-foreground leading-relaxed italic">
                  “{t("Pelayanan selalu tepat waktu, unit wangi dan supir sangat profesional.", "Always on time, clean cars and very professional chauffeurs.")}”
                </p>
                <p className="mt-2 text-[0.62rem] tracking-widest text-gold uppercase font-medium">
                  — PT.Vicky Rental Nusantara
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
          className="mt-14 sm:mt-18 pt-8 border-t border-gold/15 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
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
