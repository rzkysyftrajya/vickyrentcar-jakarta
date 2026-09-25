import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Briefcase,
  Fuel,
  Settings2,
  Package,
  CheckCircle2,
  ArrowLeftRight,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal } from "@/components/Reveal";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Bandingkan Armada Rental Mobil Jakarta — Vicky Rentcar";
const DESCRIPTION =
  "Bandingkan spesifikasi armada rental mobil Jakarta secara side-by-side. Temukan kendaraan terbaik sesuai kebutuhan perjalanan Anda.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/bandingkan")({
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}/bandingkan` }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/bandingkan` },
      { property: "og:image", content: OG_IMAGE },
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

// ─── Spec row definitions (Ringkas & Penting saja) ───────────────────────────

type SpecKey = "category" | "capacity" | "luggage" | "transmission" | "fuel";

type SpecRow = {
  key: SpecKey;
  label: string;
  icon: React.ElementType;
};

const SPEC_ROWS: SpecRow[] = [
  { key: "category", label: "Kategori", icon: Briefcase },
  { key: "capacity", label: "Kapasitas Penumpang", icon: Users },
  { key: "luggage", label: "Kapasitas Bagasi", icon: Package },
  { key: "transmission", label: "Transmisi", icon: Settings2 },
  { key: "fuel", label: "Bahan Bakar", icon: Fuel },
];

function isDifferent(vehicles: Vehicle[], key: SpecKey): boolean {
  const values = vehicles.map((v) => v[key]);
  return new Set(values).size > 1;
}

// ─── Page Component ───────────────────────────────────────────────────────────

function BandingkanPage() {
  // Default 2 armada populer untuk dibanding
  const [selected, setSelected] = useState<string[]>([
    "toyota-alphard",
    "toyota-innova-zenix",
  ]);

  const compared = selected
    .map((slug) => VEHICLES.find((v) => v.slug === slug)!)
    .filter(Boolean);

  const toggleVehicle = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length <= 2) return; // minimum 2
      setSelected(selected.filter((s) => s !== slug));
    } else {
      if (selected.length >= 3) return; // maksimal 3 agar tidak terlalu padat
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Header */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[24rem] w-[40rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />
          <div className="relative mx-auto max-w-5xl px-5 text-center">
            <Reveal>
              <p className="eyebrow">Perbandingan Armada</p>
              <h1 className="mt-3 text-3xl sm:text-5xl font-light leading-tight">
                Pilih Kendaraan <span className="gold-text">Terbaik Anda</span>
              </h1>
              <div className="gold-rule mx-auto mt-5 w-20" aria-hidden="true" />
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Pilih 2 hingga 3 armada untuk melihat perbandingan spesifikasi dan kenyamanan secara ringkas.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pemilih Armada Simpel (Chips/Buttons) */}
        <section className="pb-8">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal>
              <div className="glass rounded-2xl border border-gold/20 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gold/15">
                  <span className="text-xs font-medium text-gold uppercase tracking-wider">
                    Pilih Armada Dibatalkan / Ditambahkan
                  </span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    Terpilih <strong className="text-gold">{selected.length}</strong> dari maks 3
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {VEHICLES.map((v) => {
                    const isSelected = selected.includes(v.slug);
                    return (
                      <button
                        key={v.slug}
                        type="button"
                        onClick={() => toggleVehicle(v.slug)}
                        aria-pressed={isSelected}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-all ${
                          isSelected
                            ? "bg-gold/20 border border-gold text-gold font-medium shadow-sm"
                            : "border border-gold/15 bg-black/20 text-muted-foreground hover:border-gold/30 hover:text-foreground"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-3.5 w-3.5 ${
                            isSelected ? "text-gold" : "text-muted-foreground/40"
                          }`}
                        />
                        <span>{v.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ringkasan Tabel Perbandingan */}
        {compared.length >= 2 && (
          <section className="py-6">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
              <Reveal>
                <div className="glass rounded-2xl border border-gold/20 overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between p-5 border-b border-gold/15 bg-gold/[0.03]">
                    <div className="flex items-center gap-2.5">
                      <ArrowLeftRight className="h-4 w-4 text-gold" />
                      <h2 className="text-base sm:text-lg font-light text-foreground">
                        Tabel Perbandingan Ringkas
                      </h2>
                    </div>
                    <span className="text-[0.68rem] text-gold hidden sm:inline-block">
                      * Baris disorot emas menunjukkan perbedaan
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gold/15 bg-black/40">
                          <th className="py-4 px-4 w-1/4 text-xs font-normal text-muted-foreground uppercase tracking-wider">
                            Spesifikasi
                          </th>
                          {compared.map((v) => (
                            <th key={v.slug} className="py-4 px-4 text-center min-w-[160px]">
                              <img
                                src={v.image}
                                alt={v.name}
                                className="h-16 w-full object-contain mx-auto mb-2"
                              />
                              <p className="text-sm font-medium text-foreground">{v.name}</p>
                              <span className="text-[0.65rem] text-gold bg-gold/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                {v.category}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10">
                        {SPEC_ROWS.map((row) => {
                          const diff = isDifferent(compared, row.key);
                          const Icon = row.icon;
                          return (
                            <tr
                              key={row.key}
                              className={`transition-colors ${
                                diff ? "bg-gold/[0.04]" : "hover:bg-white/[0.02]"
                              }`}
                            >
                              <td className="py-3.5 px-4 text-xs font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Icon className={`h-3.5 w-3.5 ${diff ? "text-gold" : "text-muted-foreground/70"}`} />
                                  <span>{row.label}</span>
                                </div>
                              </td>
                              {compared.map((v) => (
                                <td key={v.slug} className="py-3.5 px-4 text-xs text-center text-foreground font-light">
                                  {v[row.key]}
                                </td>
                              ))}
                            </tr>
                          );
                        })}

                        {/* Rekomendasi Ringkas */}
                        <tr className="bg-gold/[0.02]">
                          <td className="py-4 px-4 text-xs font-medium text-gold align-top">
                            <div className="flex items-center gap-2 mt-0.5">
                              <Sparkles className="h-3.5 w-3.5 text-gold" />
                              <span>Cocok Untuk</span>
                            </div>
                          </td>
                          {compared.map((v) => (
                            <td key={v.slug} className="py-4 px-4 text-xs text-center align-top">
                              <div className="flex flex-wrap justify-center gap-1">
                                {v.fitFor.slice(0, 3).map((f) => (
                                  <span
                                    key={f}
                                    className="bg-black/40 border border-gold/15 px-2 py-1 rounded text-[0.65rem] text-muted-foreground"
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Action row */}
                  <div className="p-5 border-t border-gold/15 bg-black/30 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {compared.map((v) => (
                      <div
                        key={v.slug}
                        className="glass p-3.5 rounded-xl border border-gold/20 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{v.name}</p>
                          <p className="text-[0.65rem] text-muted-foreground truncate">{v.tagline}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Link
                            to="/armada/$slug"
                            params={{ slug: v.slug }}
                            className="rounded-full border border-gold/30 px-3 py-1.5 text-[0.6rem] text-gold uppercase hover:bg-gold/10"
                          >
                            Detail
                          </Link>
                          <a
                            href={waLink(`Halo ${SITE.brand}, saya tertarik memesan ${v.name}.`)}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-[image:var(--gradient-gold)] px-3 py-1.5 text-[0.6rem] text-primary-foreground font-medium uppercase inline-flex items-center gap-1"
                          >
                            <WhatsAppIcon className="h-3 w-3" />
                            Pesan
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Konsultasi Cepat CTA */}
        <section className="mt-12 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <Reveal>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Butuh saran rekomendasi kendaraan terbaik sesuai budget &amp; acara Anda?
              </p>
              <a
                href={waLink(`Halo ${SITE.brand}, saya butuh saran pilihan armada terbaik untuk kebutuhan saya.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3 text-xs tracking-wider font-medium text-primary-foreground uppercase shadow-md transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi Langsung via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
