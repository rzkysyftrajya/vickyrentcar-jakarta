import { Link } from "@tanstack/react-router";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { VEHICLES } from "@/lib/vehicles";
import { SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

// 6 Curated Flagship Vehicles for the Homepage
const FEATURED_SLUGS = [
  "toyota-alphard",
  "toyota-innova-zenix",
  "toyota-innova-reborn",
  "toyota-hiace-premio",
  "mercedes-benz-e300",
  "toyota-land-cruiser",
];

export function Fleet() {
  const featuredVehicles = FEATURED_SLUGS.map((slug) =>
    VEHICLES.find((v) => v.slug === slug),
  ).filter(Boolean);

  return (
    <section
      id="armada"
      className="relative bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pilihan Armada Unggulan"
          title="6 Pilihan Mobil Terbaik untuk Perjalanan Anda"
          subtitle="Armada terfavorit pilihan klien eksekutif, keluarga, dan korporat di Jakarta. Selalu disanitasi bersih, wangi, dan didampingi supir profesional."
        />

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVehicles.map((v) => {
            if (!v) return null;
            return (
              <StaggerItem key={v.slug}>
                <div className="group glass flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-gold/20 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[var(--shadow-gold)]">
                  <div>
                    {/* Image Box */}
                    <div className="relative overflow-hidden rounded-xl bg-[radial-gradient(70%_60%_at_50%_60%,color-mix(in_oklab,var(--navy-deep)_80%,transparent),transparent)] p-5">
                      <img
                        src={v.image}
                        alt={`${v.name} — ${v.tagline}`}
                        loading="lazy"
                        width={680}
                        height={400}
                        className="h-44 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                      {v.model && (
                        <a
                          href="#showcase"
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/30 px-3 py-1 text-[0.6rem] tracking-wider text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                        >
                          <span>3D 360°</span>
                        </a>
                      )}
                    </div>

                    <div className="mt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {v.badges.map((b) => (
                          <span
                            key={b}
                            className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5 text-[0.55rem] tracking-[0.15em] text-gold uppercase"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-3 text-2xl font-normal text-foreground group-hover:gold-text transition-colors">
                        {v.name}
                      </h3>
                      <p className="mt-1 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                        {v.tagline}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {v.description}
                      </p>

                      <ul className="mt-4 grid grid-cols-2 gap-3 border-t border-gold/15 pt-4 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>{v.capacity}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>{v.luggage}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-2 pt-4 border-t border-gold/10">
                    <a
                      href={waLink(`Halo ${SITE.brand}, saya ingin reservasi mobil ${v.name}. Mohon info ketersediaan.`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => window.VRNTrack?.trackClick?.({ target: `fleet_order_${v.slug || v.name}` })}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-gold)] py-2.5 text-[0.65rem] tracking-[0.18em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span>Pesan Unit</span>
                    </a>
                    {v.model ? (
                      <a
                        href="#showcase"
                        className="rounded-full border border-gold/30 px-4 py-2.5 text-[0.65rem] tracking-wider text-gold hover:bg-gold/10 uppercase transition-colors"
                      >
                        Lihat 3D
                      </a>
                    ) : (
                      <Link
                        to="/armada/$slug"
                        params={{ slug: v.slug }}
                        className="rounded-full border border-gold/30 px-4 py-2.5 text-[0.65rem] tracking-wider text-gold hover:bg-gold/10 uppercase transition-colors"
                      >
                        Detail
                      </Link>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-14 text-center">
          <Link
            to="/armada"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground shadow-[var(--shadow-gold)]"
          >
            <span>Lihat Semua 28 Pilihan Katalog Armada</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
