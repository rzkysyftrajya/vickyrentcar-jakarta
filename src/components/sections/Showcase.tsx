import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  Users,
  Briefcase,
  Fuel,
  Settings2,
  Wind,
  Music,
} from "lucide-react";
import { VEHICLES, Vehicle, EXTERIOR_ANGLES } from "@/lib/vehicles";
import { VehicleViewer } from "@/components/three/VehicleViewer";
import { SectionHeading } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

// Only these 4 flagship vehicles have 3D models and interactive detail on the homepage
const SHOWCASE_3D_SLUGS = [
  "toyota-alphard",
  "toyota-innova-reborn",
  "toyota-innova-zenix",
  "toyota-hiace-premio",
];

type DetailTab = "Eksterior 3D" | "Interior" | "Spesifikasi";

export function Showcase() {
  const showcaseVehicles = SHOWCASE_3D_SLUGS.map((slug) =>
    VEHICLES.find((v) => v.slug === slug),
  ).filter(Boolean) as Vehicle[];

  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<DetailTab>("Eksterior 3D");
  const [angleIndex, setAngleIndex] = useState(0);

  const vehicle = showcaseVehicles[index] || showcaseVehicles[0]!;
  const angle = EXTERIOR_ANGLES[angleIndex] ?? null;

  const go = (dir: number) => {
    setIndex((i) => (i + dir + showcaseVehicles.length) % showcaseVehicles.length);
    setAngleIndex(0);
  };

  const selectVehicle = (i: number) => {
    setIndex(i);
    setAngleIndex(0);
  };

  const specs = [
    { label: "Kapasitas", value: vehicle.capacity, icon: Users },
    { label: "Bagasi", value: vehicle.luggage, icon: Briefcase },
    { label: "Transmisi", value: vehicle.transmission, icon: Settings2 },
    { label: "Bahan Bakar", value: vehicle.fuel, icon: Fuel },
    { label: "Pendingin", value: vehicle.ac, icon: Wind },
    { label: "Hiburan", value: vehicle.entertainment, icon: Music },
  ];

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inspeksi 3D & Detail Unit"
          title="Detail 4 Armada Pilihan dalam 360°"
          subtitle="Periksa interior, putar eksterior 3D 360°, dan lihat spesifikasi lengkap Alphard, Innova Reborn, Innova Zenix, dan Hiace Premio langsung di sini."
        />

        {/* 4 Vehicle Quick Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {showcaseVehicles.map((v, i) => (
            <button
              key={v.slug}
              type="button"
              onClick={() => selectVehicle(i)}
              aria-current={i === index}
              className={`rounded-full px-5 py-2.5 text-xs tracking-[0.16em] uppercase transition-all duration-300 ${
                i === index
                  ? "bg-[image:var(--gradient-gold)] text-primary-foreground font-medium shadow-[var(--shadow-gold)] scale-105"
                  : "glass border border-gold/25 text-muted-foreground hover:border-gold/60 hover:text-foreground"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Detail Tabs */}
        <div className="mt-8 flex justify-center gap-2">
          {(["Eksterior 3D", "Interior", "Spesifikasi"] as DetailTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`rounded-full px-4 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                tab === t
                  ? "bg-gold/20 border border-gold text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-[1.35fr_1fr]">
          {/* Main Visual Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${vehicle.slug}-${tab}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {tab === "Eksterior 3D" && (
                <div className="flex flex-col gap-4">
                  <VehicleViewer
                    url={vehicle.model}
                    name={vehicle.name}
                    image={vehicle.image}
                    angle={angle}
                    className="h-[24rem] w-full sm:h-[32rem]"
                  />
                  {/* Camera angle pills */}
                  <div className="glass rounded-xl p-3 flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground shrink-0 px-2">
                      Sudut 360°:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {EXTERIOR_ANGLES.slice(0, 5).map((a, i) => (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() => setAngleIndex(i)}
                          className={`rounded-lg px-2.5 py-1 text-[0.6rem] tracking-wider transition-colors shrink-0 ${
                            i === angleIndex
                              ? "bg-gold text-primary-foreground font-medium"
                              : "text-muted-foreground hover:text-gold"
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "Interior" && (
                <div className="grid grid-cols-2 gap-3 h-[24rem] sm:h-[32rem] overflow-y-auto pr-1">
                  {vehicle.interior.map((img) => (
                    <div
                      key={img.src}
                      className="glass rounded-xl overflow-hidden group relative flex flex-col justify-end p-3 min-h-[14rem]"
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="relative z-10 text-[0.65rem] tracking-wider text-gold font-medium">
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Spesifikasi" && (
                <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between border border-gold/20">
                  <div>
                    <p className="eyebrow text-gold">Spesifikasi Lengkap Unit</p>
                    <h4 className="text-2xl font-light text-foreground mt-1">{vehicle.name}</h4>
                    <dl className="mt-6 grid grid-cols-2 gap-4">
                      {specs.map((s) => {
                        const Icon = s.icon;
                        return (
                          <div key={s.label} className="p-3.5 rounded-xl border border-gold/10 bg-white/5">
                            <dt className="flex items-center gap-2 text-[0.6rem] tracking-wider text-muted-foreground uppercase">
                              <Icon className="h-3.5 w-3.5 text-gold shrink-0" />
                              <span>{s.label}</span>
                            </dt>
                            <dd className="mt-1.5 text-xs text-foreground font-medium">{s.value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Transmisi: <strong>{vehicle.transmission}</strong></span>
                    <span>BBM: <strong>{vehicle.fuel}</strong></span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Right Info Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${vehicle.slug}-info`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {vehicle.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-gold/10 border border-gold/30 px-2.5 py-0.5 text-[0.55rem] tracking-[0.15em] text-gold uppercase"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 text-3xl sm:text-4xl font-normal text-foreground">
                  {vehicle.name}
                </h3>
                <p className="mt-1 text-xs tracking-[0.2em] text-gold uppercase">
                  {vehicle.tagline}
                </p>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {vehicle.description}
                </p>

                {/* Rates list */}
                {vehicle.rates && (
                  <div className="mt-6 space-y-2.5 border-t border-gold/15 pt-5">
                    <p className="eyebrow text-gold">Pilihan Paket Sewa</p>
                    {vehicle.rates.map((r) => (
                      <div
                        key={r.package}
                        className="flex items-center justify-between rounded-lg border border-gold/10 bg-white/5 p-2.5 text-xs"
                      >
                        <div>
                          <p className="text-foreground font-medium">{r.package}</p>
                          <p className="text-[0.65rem] text-muted-foreground">{r.description}</p>
                        </div>
                        <span className="text-[0.65rem] text-gold font-medium bg-gold/10 px-2.5 py-1 rounded-full shrink-0">
                          {r.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-gold/15">
                <a
                  href={waLink(`Halo ${SITE.brand}, saya ingin memesan armada ${vehicle.name}. Mohon info harga promo dan ketersediaan unit.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] py-3 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-[1.02] transition-transform"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Pesan Sekarang via WA</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Kendaraan sebelumnya"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Kendaraan berikutnya"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground ml-2">
              Unit {index + 1} dari {showcaseVehicles.length}
            </span>
          </div>

          <Link
            to="/armada"
            className="text-xs text-gold tracking-wider hover:underline uppercase"
          >
            Lihat Semua 28 Unit Armada di Katalog &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
