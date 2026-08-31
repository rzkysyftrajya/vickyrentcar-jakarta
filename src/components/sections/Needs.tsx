import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { TRAVEL_NEEDS, VEHICLES } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";

export function Needs() {
  const [activeId, setActiveId] = useState(TRAVEL_NEEDS[0]!.id);
  const active = TRAVEL_NEEDS.find((n) => n.id === activeId)!;
  const recommended = VEHICLES.filter((v) => active.vehicles.includes(v.slug));

  return (
    <section id="kebutuhan" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Konsultasi Cepat"
          title="Untuk Keperluan Apa Kendaraan Dibutuhkan?"
          subtitle="Pilih layanan yang sesuai dengan kebutuhan perjalanan Anda."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.07}>
          {TRAVEL_NEEDS.map((n) => {
            const isActive = n.id === activeId;
            return (
              <StaggerItem key={n.id} direction="scale">
                <button
                  type="button"
                  onClick={() => setActiveId(n.id)}
                  aria-pressed={isActive}
                  className={`glass h-full w-full rounded-xl p-6 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 ${
                    isActive ? "border-gold/60 bg-gold/5 shadow-[var(--shadow-gold)]" : ""
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {n.emoji}
                  </span>
                  <h3 className={`mt-4 text-xl ${isActive ? "gold-text" : ""}`}>{n.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{n.desc}</p>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <p className="eyebrow">Rekomendasi kendaraan — {active.title}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((v) => (
                <article
                  key={v.slug}
                  className="glass group flex h-full flex-col rounded-xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    loading="lazy"
                    className="h-32 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <h3 className="mt-5 text-2xl">{v.name}</h3>
                  <p className="mt-1 text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase">
                    {v.tagline}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-gold" /> {v.capacity}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-gold" /> {v.luggage}
                    </li>
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Link
                      to="/armada/$slug"
                      params={{ slug: v.slug }}
                      className="rounded-full border border-gold/40 px-6 py-2.5 text-[0.6rem] tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:bg-gold/10"
                    >
                      Detail
                    </Link>
                    <a
                      href={waLink(
                        `Halo ${SITE.brand}, saya membutuhkan ${v.name} untuk ${active.title}.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-2.5 text-[0.6rem] tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" /> Pesan via WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
