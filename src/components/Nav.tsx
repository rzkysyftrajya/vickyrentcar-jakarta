import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Tentang Kami", to: "/tentang-kami" },
  { label: "Layanan", to: "/layanan" },
  { label: "Armada", to: "/armada" },
  { label: "Bandingkan", to: "/bandingkan" },
  { label: "Korporat", to: "/korporat" },
  { label: "Kontak", to: "/kontak" },
] as const;


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /**
   * inHeroZone: true selama user masih dalam area scroll hero section (homepage only).
   * Saat inHeroZone = true → nav tersembunyi (fullscreen immersive experience).
   * Saat inHeroZone = false → nav slide-in dari atas.
   */
  const [inHeroZone, setInHeroZone] = useState(false);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHomePage = currentPath === "/";

  // Track scroll untuk background nav & hero zone
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 20);

      if (isHomePage) {
        // Hero section: h-[280vh] sm:h-[320vh]
        // Sticky berakhir saat scrollY >= heroHeight - innerHeight
        // Mobile: 280vh - 100vh = 180vh
        // SM+: 320vh - 100vh = 220vh
        // Gunakan #hero-section element agar akurat
        const heroEl = document.getElementById("hero-section");
        if (heroEl) {
          // bottom > window.innerHeight → masih dalam scroll zone hero
          const { bottom } = heroEl.getBoundingClientRect();
          setInHeroZone(bottom > window.innerHeight + 40);
        } else {
          // Fallback jika element belum mount
          setInHeroZone(sy < window.innerHeight * 1.7);
        }
      } else {
        setInHeroZone(false);
      }
    };

    // Inisialisasi langsung
    // Pada homepage, mulai sebagai hidden (inHeroZone = true)
    if (isHomePage) {
      setInHeroZone(true);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  return (
    <motion.header
      /**
       * inHeroZone = true  → tersembunyi di atas (y: -100, opacity: 0)
       * inHeroZone = false → slide-in dari atas (y: 0, opacity: 1)
       *
       * Tidak pakai initial animate supaya tidak ada flash saat SSR hydrate.
       * Kita langsung set dari state yang sudah benar.
       */
      animate={{
        y: inHeroZone ? -120 : 0,
        opacity: inHeroZone ? 0 : 1,
      }}
      initial={{
        // Homepage: mulai tersembunyi. Page lain: langsung visible
        y: isHomePage ? -120 : 0,
        opacity: isHomePage ? 0 : 1,
      }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: inHeroZone ? "none" : "auto" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[oklch(0.1431_0.0201_255.76_/_88%)] backdrop-blur-xl border-b border-gold/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* Top micro bar for VIP trust */}
      <div className="hidden border-b border-gold/10 bg-black/30 px-6 py-1.5 text-[0.65rem] tracking-wider text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold">
              <ShieldCheck className="h-3 w-3" /> Rental Mobil Jakarta 24/7
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span>Antar Jemput Bandara Soetta &amp; Halim</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone className="h-3 w-3 text-gold" /> {SITE.phone}
            </a>
            <span className="text-muted-foreground/60">•</span>
            <span>{SITE.city}</span>
          </div>
        </div>
      </div>

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4"
        aria-label="Navigasi Utama"
      >
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl tracking-wide transition-colors group-hover:text-gold">
            Vicky <span className="gold-text font-normal">Rentcar</span>
          </span>
          <span className="mt-1 text-[0.55rem] tracking-[0.38em] text-muted-foreground uppercase">
            Rental Mobil Jakarta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => {
            const isActive =
              item.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.to);

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`relative text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-gold font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[image:var(--gradient-gold)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={waLink(`Halo ${SITE.brand}, saya ingin menanyakan ketersediaan armada dan reservasi.`)}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span>Booking Cepat</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 text-gold transition-colors hover:bg-gold/10 lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-gold/20 bg-[oklch(0.1431_0.0201_255.76_/_98%)] px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((item) => {
                const isActive =
                  item.to === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.to);

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                        isActive
                          ? "border border-gold/30 bg-gold/10 text-gold font-medium"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-gold/15 pt-5 space-y-3">
              <a
                href={waLink(`Halo ${SITE.brand}, saya ingin konsultasi sewa mobil.`)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] py-3 text-xs tracking-[0.18em] font-medium text-primary-foreground uppercase shadow-md"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>WhatsApp 24 Jam</span>
              </a>

              <a
                href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 py-2.5 text-xs tracking-[0.15em] text-muted-foreground uppercase hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                <span>{SITE.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
