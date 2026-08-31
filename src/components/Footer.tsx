import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";
import { VEHICLES } from "@/lib/vehicles";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-[color-mix(in_oklab,var(--navy)_35%,var(--background))] text-muted-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-normal text-foreground">
                Vicky <span className="gold-text">Rentcar</span>
              </span>
              <span className="block text-[0.55rem] tracking-[0.35em] text-gold uppercase mt-0.5">
                Rental Mobil Jakarta
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {SITE.company} — Layanan sewa mobil terpercaya di Jakarta untuk antar jemput bandara, operasional kantor, pernikahan, dan perjalanan keluarga dengan supir ramah & berpengalaman.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-gold">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Armada Nyaman, Bersih & Terawat</span>
            </div>
          </div>

          {/* Quick Page Links */}
          <div>
            <p className="eyebrow text-gold">Navigasi</p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="transition-colors hover:text-gold">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="transition-colors hover:text-gold">
                  Layanan & Fasilitas
                </Link>
              </li>
              <li>
                <Link to="/armada" className="transition-colors hover:text-gold">
                  Katalog Armada
                </Link>
              </li>
              <li>
                <Link to="/korporat" className="transition-colors hover:text-gold">
                  Layanan Korporat
                </Link>
              </li>
              <li>
                <Link to="/bandingkan" className="transition-colors hover:text-gold">
                  Bandingkan Armada
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="transition-colors hover:text-gold">
                  Kontak & Reservasi
                </Link>
              </li>
            </ul>
          </div>


          {/* Fleet Links */}
          <div>
            <p className="eyebrow text-gold">Pilihan Armada</p>
            <ul className="mt-4 space-y-2.5 text-xs">
              {VEHICLES.map((v) => (
                <li key={v.slug}>
                  <Link
                    to="/armada/$slug"
                    params={{ slug: v.slug }}
                    className="transition-colors hover:text-gold flex items-center justify-between"
                  >
                    <span>{v.name}</span>
                    <span className="text-[0.65rem] text-gold/70">{v.category}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/armada"
                  className="text-gold underline underline-offset-4 text-xs hover:text-gold-soft"
                >
                  Lihat Semua Spesifikasi &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="eyebrow text-gold">Kontak 24/7</p>
            <ul className="mt-4 space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <div>
                  <p className="text-foreground">{SITE.phone}</p>
                  <p className="text-[0.65rem] text-muted-foreground">Telepon Hotline</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span className="text-foreground">{SITE.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>{SITE.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>{SITE.address}</span>
              </li>
            </ul>

            <a
              href={waLink(`Halo ${SITE.brand}, saya ingin menanyakan reservasi mobil.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.65rem] tracking-[0.18em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10 bg-black/40 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground/70 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {SITE.company}. All rights reserved.</p>
          <p className="text-[0.7rem] text-muted-foreground/50">
            Penyedia Layanan Rental Mobil Jakarta yang Nyaman, Santai & Terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
}

