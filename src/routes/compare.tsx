import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Briefcase,
  Fuel,
  Settings2,
  Wind,
  Music,
  Package,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Bandingkan Armada Rental Mobil Jakarta — Vicky Rentcar";
const DESCRIPTION =
  "Bandingkan spesifikasi Toyota Alphard, Innova Zenix, Innova Reborn, dan Hiace Premio secara side-by-side. Temukan armada terbaik sesuai kebutuhan perjalanan Anda di Jakarta.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/bandingkan` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeSchema(
          buildBreadcrumbSchema([
            { name: "Beranda", url: SITE_URL },
            { name: "Bandingkan Armada", url: `${SITE_URL}/bandingkan` },
          ]),
        ),
      },
    ],
  }),
  component: BandingkanPage,
});

// ─── Spec row definitions ──────────────────────────────────────────────────────

type SpecRow = {
  key: keyof Vehicle | "category";
  label: string;
  icon: React.ElementType;
};

const SPEC_ROWS: SpecRow[] = [
  { key: "category", label: "Kategori", icon: Briefcase },
  { key: "capacity", label: "Kapasitas Penumpang", icon: Users },
  { key: "luggage", label: "Kapasitas Bagasi", icon: Package },
  { key: "transmission", label: "Transmisi", icon: Settings2 },
  { key: "fuel", label: "Bahan Bakar", icon: Fuel },
  { key: "ac", label: "Pendingin Udara", icon: Wind },
  { key: "entertainment", label: "Hiburan & Konektivitas", icon: Music },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function getValue(vehicle: Vehicle, key: SpecRow["key"]): string {
  if (key === "category") return vehicle.category;
  const v = vehicle[key as keyof Vehicle];
  return typeof v === "string" ? v : String(v);
}

function isDifferent(vehicles: Vehicle[], key: SpecRow["key"]): boolean {
  const values = vehicles.map((v) => getValue(v, key));
  return new Set(values).size > 1;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BandingkanPage() {
  const [selected, setSelected] = useState<string[]>([
    VEHICLES[0]!.slug,
    VEHICLES[1]!.slug,
  ]);

  const compared = selected.map((slug) => VEHICLES.find((v) => v.slug === slug)!).filter(Boolean);

  const toggleVehicle = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length <= 2) return; // minimum 2
      setSelected(selected.filter((s) => s !== slug));
    } else {
      if (selected.length >= 4) return; // maximum 4
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Hero Header */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[50rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="eyebrow">Perbandingan Armada</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Pilih Kendaraan{" "}
                <span className="gold-text">Terbaik untuk Anda</span>
              </h1>
              <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Bandingkan spesifikasi armada kami secara langsung dan temukan kendaraan yang paling cocok untuk perjalanan Anda.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Quick Dropdown Selector */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="glass rounded-2xl border border-gold/25 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/15 pb-4 mb-6">
                  <div>
                    <p className="eyebrow text-gold">Pemilih Cepat Armada</p>
                    <h2 className="text-xl sm:text-2xl font-light text-foreground">
                      Bandingkan 2 Hingga 4 Kendaraan
                    </h2>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Terpilih: <strong className="text-gold">{selected.length}</strong> dari maksimal 4 unit
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[0, 1, 2, 3].map((slotIndex) => {
                    const currentSlug = selected[slotIndex];
                    return (
                      <div key={slotIndex} className="flex flex-col gap-2">
                        <label className="text-[0.65rem] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                          <span>Kendaraan {slotIndex + 1} {slotIndex < 2 ? "*" : "(Opsional)"}</span>
                          {slotIndex >= 2 && currentSlug && (
                            <button
                              type="button"
                              onClick={() => setSelected(selected.filter((_, i) => i !== slotIndex))}
                              className="text-red-400 hover:underline text-[0.6rem]"
                            >
                              Hapus
                            </button>
                          )}
                        </label>
                        <select
                          value={currentSlug || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val) {
                              if (slotIndex >= 2) {
                                setSelected(selected.filter((_, i) => i !== slotIndex));
                              }
                              return;
                            }
                            const newSelected = [...selected];
                            newSelected[slotIndex] = val;
                            setSelected(Array.from(new Set(newSelected)));
                          }}
                          className="w-full rounded-xl border border-gold/25 bg-[oklch(0.18_0.03_256)] px-3.5 py-3 text-xs text-foreground focus:border-gold focus:outline-none"
                        >
                          {slotIndex >= 2 && <option value="">-- Kosongkan Slot --</option>}
                          {VEHICLES.map((v) => (
                            <option key={v.slug} value={v.slug} className="bg-zinc-900 text-white">
                              {v.name} ({v.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Vehicle Selector Visual Cards */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow text-gold">
                  Katalog Pilihan Cepat (Klik untuk Pilih/Batal)
                </p>
                <span className="text-xs text-muted-foreground">
                  Total 28 Unit Tersedia
                </span>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 max-h-[28rem] overflow-y-auto pr-1">
                {VEHICLES.map((v) => {
                  const isSelected = selected.includes(v.slug);
                  return (
                    <button
                      key={v.slug}
                      type="button"
                      onClick={() => toggleVehicle(v.slug)}
                      aria-pressed={isSelected}
                      className={`w-full glass rounded-xl p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-gold/70 bg-gold/10 shadow-[var(--shadow-gold)]"
                          : "hover:border-gold/30 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="h-12 w-16 object-contain shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-xs truncate ${isSelected ? "gold-text" : "text-foreground"}`}>
                            {v.name}
                          </p>
                          <p className="text-[0.6rem] text-muted-foreground truncate">{v.category}</p>
                        </div>
                        <div className="shrink-0">
                          {isSelected ? (
                            <CheckCircle2 className="h-4 w-4 text-gold" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-gold/30" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Comparison Table */}
        {compared.length >= 2 && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <ArrowLeftRight className="h-5 w-5 text-gold" />
                  <h2 className="text-xl font-light text-foreground">
                    Perbandingan Spesifikasi
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    — Baris berwarna emas menunjukkan perbedaan
                  </span>
                </div>

                {/* Table header (vehicle names + images) */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse">
                    <thead>
                      <tr>
                        <th className="w-44 text-left py-4 pr-4 text-xs uppercase tracking-widest text-muted-foreground font-normal border-b border-gold/15">
                          Spesifikasi
                        </th>
                        {compared.map((v) => (
                          <th
                            key={v.slug}
                            className="py-4 px-3 border-b border-gold/15 min-w-[180px]"
                          >
                            <Link
                              to="/armada/$slug"
                              params={{ slug: v.slug }}
                              className="block group"
                            >
                              <img
                                src={v.image}
                                alt={v.name}
                                className="h-20 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                              />
                              <p className="mt-2 text-sm font-medium text-foreground group-hover:gold-text transition-colors">
                                {v.name}
                              </p>
                              <p className="text-[0.6rem] text-muted-foreground">{v.category}</p>
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SPEC_ROWS.map((row) => {
                        const diff = isDifferent(compared, row.key);
                        const Icon = row.icon;
                        return (
                          <AnimatePresence key={row.key} mode="wait">
                            <motion.tr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`border-b border-gold/10 transition-colors ${
                                diff ? "bg-gold/[0.04]" : ""
                              }`}
                            >
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-2">
                                  <Icon className={`h-4 w-4 shrink-0 ${diff ? "text-gold" : "text-muted-foreground"}`} />
                                  <span className={`text-xs ${diff ? "text-gold font-medium" : "text-muted-foreground"}`}>
                                    {row.label}
                                  </span>
                                </div>
                              </td>
                              {compared.map((v) => (
                                <td key={v.slug} className="py-4 px-3 text-sm text-foreground align-top">
                                  {getValue(v, row.key)}
                                </td>
                              ))}
                            </motion.tr>
                          </AnimatePresence>
                        );
                      })}

                      {/* Cocok Untuk row */}
                      <tr className="border-b border-gold/10">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Cocok Untuk</span>
                          </div>
                        </td>
                        {compared.map((v) => (
                          <td key={v.slug} className="py-4 px-3 align-top">
                            <ul className="space-y-1.5">
                              {v.fitFor.map((f) => (
                                <li key={f} className="flex items-start gap-1.5 text-xs text-foreground/80">
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>

                      {/* Services row */}
                      <tr className="border-b border-gold/10">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Tersedia untuk</span>
                          </div>
                        </td>
                        {compared.map((v) => (
                          <td key={v.slug} className="py-4 px-3 align-top">
                            <ul className="space-y-1.5">
                              {v.services.map((s) => (
                                <li key={s} className="flex items-start gap-1.5 text-xs text-foreground/80">
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Reveal>

              {/* CTA per vehicle */}
              <Reveal className="mt-10">
                <div className={`grid gap-4 ${compared.length === 2 ? "sm:grid-cols-2" : compared.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
                  {compared.map((v) => (
                    <div key={v.slug} className="glass rounded-xl p-5 border border-gold/20 flex flex-col gap-3">
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{v.tagline}</p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        <Link
                          to="/armada/$slug"
                          params={{ slug: v.slug }}
                          className="flex-1 text-center rounded-full border border-gold/40 px-4 py-2.5 text-[0.6rem] tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold/10"
                        >
                          Detail
                        </Link>
                        <a
                          href={waLink(`Halo ${SITE.brand}, saya ingin memesan ${v.name}.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-gold)] px-4 py-2.5 text-[0.6rem] tracking-[0.2em] text-primary-foreground uppercase transition-transform hover:scale-105"
                        >
                          <WhatsAppIcon className="h-3 w-3" />
                          Pesan
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Tip section */}
        <section className="py-12 border-t border-gold/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Tips Memilih Armada"
              title="Panduan Singkat"
              subtitle="Tidak yakin harus pilih yang mana? Ini panduannya."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  emoji: "✈️",
                  title: "Antar Jemput Bandara",
                  desc: "Alphard atau Zenix — nyaman, elegan, dan ada room untuk koper besar.",
                },
                {
                  emoji: "🏢",
                  title: "Perjalanan Bisnis",
                  desc: "Alphard untuk tamu VIP, Reborn untuk perjalanan operasional harian.",
                },
                {
                  emoji: "👥",
                  title: "Rombongan",
                  desc: "Hiace Premio untuk 11–14 orang — kabin luas, AC dingin, reclinable.",
                },
                {
                  emoji: "🛣️",
                  title: "Luar Kota",
                  desc: "Reborn diesel tahan lama dan irit BBM untuk perjalanan jarak jauh.",
                },
              ].map((tip) => (
                <StaggerItem key={tip.title} direction="scale">
                  <div className="glass rounded-xl p-5 border border-gold/15 h-full">
                    <span className="text-2xl">{tip.emoji}</span>
                    <h3 className="mt-3 text-base font-medium text-foreground">{tip.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">Masih bingung? Konsultasikan langsung dengan tim kami.</p>
              <a
                href={waLink(`Halo ${SITE.brand}, saya butuh rekomendasi armada yang sesuai kebutuhan perjalanan saya.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs tracking-[0.22em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
