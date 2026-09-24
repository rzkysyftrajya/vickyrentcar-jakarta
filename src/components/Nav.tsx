import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ShieldCheck, Globe, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";
import { useLanguage } from "@/lib/i18n";

const navLinks = [
  { idLabel: "Beranda", enLabel: "Home", to: "/" },
  { idLabel: "Armada", enLabel: "Fleet", to: "/armada" },
  { idLabel: "Layanan", enLabel: "Services", to: "/layanan" },
  { idLabel: "Tentang Kami", enLabel: "About Us", to: "/tentang-kami" },
  { idLabel: "Kontak", enLabel: "Contact", to: "/kontak" },
] as const;

const rentalLinks = [
  { idLabel: "Sewa Mobil Jakarta", enLabel: "Car Rental Jakarta", to: "/sewa-mobil-jakarta" },
  {
    idLabel: "Sewa Mobil + Driver",
    enLabel: "Car Rental + Driver",
    to: "/sewa-mobil-dengan-driver-jakarta",
  },
  { idLabel: "Sewa Hiace Jakarta", enLabel: "Hiace Rental Jakarta", to: "/sewa-hiace-jakarta" },
  {
    idLabel: "Sewa Alphard Jakarta",
    enLabel: "Alphard Rental Jakarta",
    to: "/sewa-alphard-jakarta",
  },
] as const;

export function Nav() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [rentalOpen, setRentalOpen] = useState(false);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isRentalActive = rentalLinks.some((item) => currentPath.startsWith(item.to));

  // Track scroll for background nav glass styling
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.1431_0.0201_255.76_/_90%)] backdrop-blur-xl border-b border-gold/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* Top micro bar for VIP trust */}
      <div className="hidden border-b border-gold/10 bg-black/30 px-6 py-1.5 text-[0.65rem] tracking-wider text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold">
              <ShieldCheck className="h-3 w-3" />{" "}
              {t("Rental Mobil Jakarta 24/7", "Jakarta Car Rental 24/7")}
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span>
              {t("Antar Jemput Bandara Soetta & Halim", "Soetta & Halim Airport Transfer")}
            </span>
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
        <Link to="/" className="group flex items-center gap-2.5 leading-none">
          <img
            src="/logo.webp"
            alt="Vicky Rentcar Logo"
            className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.25)] transition-opacity group-hover:opacity-90"
          />
          <span className="flex flex-col">
            <span className="font-display text-2xl tracking-wide transition-colors group-hover:text-gold">
              Vicky <span className="gold-text font-normal">Rentcar</span>
            </span>
            <span className="mt-1 text-[0.55rem] tracking-[0.38em] text-muted-foreground uppercase">
              {t("Rental Mobil Jakarta", "Jakarta Car Rental")}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.slice(0, 2).map((item) => {
            const isActive =
              item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

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
                  {t(item.idLabel, item.enLabel)}
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
          <li className="relative">
            <button
              type="button"
              onClick={() => setRentalOpen((value) => !value)}
              className={`flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                isRentalActive || rentalOpen
                  ? "text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-expanded={rentalOpen}
              aria-haspopup="menu"
            >
              {t("Sewa Mobil", "Car Rental")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${rentalOpen ? "rotate-180" : ""}`}
              />
              {isRentalActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[image:var(--gradient-gold)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {rentalOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-4 w-64 rounded-lg border border-gold/20 bg-[oklch(0.1431_0.0201_255.76_/_98%)] p-2 shadow-2xl backdrop-blur-xl"
                role="menu"
              >
                {rentalLinks.map((item) => {
                  const isActive = currentPath.startsWith(item.to);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setRentalOpen(false)}
                      className={`block rounded-md px-3 py-2.5 text-xs tracking-[0.08em] transition-colors ${
                        isActive
                          ? "bg-gold/10 text-gold font-medium"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                      role="menuitem"
                    >
                      {t(item.idLabel, item.enLabel)}
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
          {navLinks.slice(2).map((item) => {
            const isActive =
              item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

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
                  {t(item.idLabel, item.enLabel)}
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
          <button
            type="button"
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className="flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-[0.65rem] tracking-[0.1em] font-medium transition-colors hover:bg-gold/10"
            aria-label="Toggle Language"
          >
            <Globe className="h-3.5 w-3.5 text-gold" />
            <span className={language === "id" ? "text-gold" : "text-muted-foreground"}>ID</span>
            <span className="text-muted-foreground/40">/</span>
            <span className={language === "en" ? "text-gold" : "text-muted-foreground"}>EN</span>
          </button>

          <a
            href={waLink(
              `Halo ${SITE.brand}, saya ingin menanyakan ketersediaan armada dan reservasi.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span>{t("Booking Cepat", "Fast Booking")}</span>
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
              {navLinks.slice(0, 1).map((item) => {
                const isActive =
                  item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

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
                      <span>{t(item.idLabel, item.enLabel)}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                    </Link>
                  </li>
                );
              })}
              {navLinks.slice(1).map((item) => {
                const isActive =
                  item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

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
                      <span>{t(item.idLabel, item.enLabel)}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={() => setRentalOpen((value) => !value)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                    isRentalActive || rentalOpen
                      ? "border border-gold/30 bg-gold/10 text-gold font-medium"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                  aria-expanded={rentalOpen}
                >
                  <span>{t("Sewa Mobil", "Car Rental")}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${rentalOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {rentalOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-1 space-y-1 overflow-hidden pl-4"
                    >
                      {rentalLinks.map((item) => {
                        const isActive = currentPath.startsWith(item.to);

                        return (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              onClick={() => setOpen(false)}
                              className={`block rounded-lg px-4 py-2.5 text-xs tracking-[0.12em] transition-all ${
                                isActive
                                  ? "bg-gold/10 text-gold font-medium"
                                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                              }`}
                            >
                              {t(item.idLabel, item.enLabel)}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <div className="mt-6 border-t border-gold/15 pt-5 space-y-3">
              <a
                href={waLink(`Halo ${SITE.brand}, saya ingin konsultasi sewa mobil.`)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] py-3 text-xs tracking-[0.18em] font-medium text-primary-foreground uppercase shadow-md"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>{t("WhatsApp 24 Jam", "24/7 WhatsApp")}</span>
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
    </header>
  );
}
