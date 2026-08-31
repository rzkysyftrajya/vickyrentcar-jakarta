import { Link } from "@tanstack/react-router";
import { Phone, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { SITE, waLink } from "@/lib/site";

export function CTA() {
  return (
    <section
      id="kontak"
      className="relative overflow-hidden bg-[color-mix(in_oklab,var(--navy)_35%,var(--background))] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">Reservasi & Konsultasi</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Siap Menikmati Perjalanan Santai & Nyaman di Jakarta?
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Armada bersih terawat, supir ramah & berpengalaman, serta layanan 24 jam siap mengantar agenda Anda di Jakarta dan sekitarnya tanpa repot.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink(`Halo ${SITE.brand}, saya ingin melakukan reservasi sewa mobil.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-[0.65rem] tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105 shadow-[var(--shadow-gold)] font-medium"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
            <Link
              to="/kontak"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-8 py-4 text-[0.65rem] tracking-[0.22em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground font-medium"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Formulir Reservasi</span>
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-6 py-4 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-gold hover:border-gold/50"
            >
              <Phone className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
