import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Briefcase,
  Fuel,
  Settings2,
  Sparkles,
  ShieldCheck,
  Check,
  Eye,
  Layers,
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { VEHICLES, Vehicle } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Katalog Armada Rental Mobil Jakarta — Pilihan 28+ Unit Terlengkap";
const DESCRIPTION =
  "Pilihan rental mobil terlengkap di Jakarta: Lexus LM, Alphard 2025, Mercedes-Benz, Land Cruiser, Palisade, Pajero, Fortuner, Innova Zenix, Reborn, Ioniq 5, hingga Hiace Premio.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/armada/")({
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}/armada` }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/armada` },
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
            { name: "Katalog Armada", url: `${SITE_URL}/armada` },
          ]),
        ),
      },
    ],
  }),
  component: ArmadaCatalogPage,
});

const CATEGORIES = [
  "Semua",
  "Executive MPV",
  "Luxury Sedan",
  "Premium SUV",
  "Compact SUV",
  "Premium MPV",
  "Family MPV",
  "Business MPV",
  "Electric Vehicle",
  "Van Rombongan",
] as const;

const FLEET_GUARANTEES = [
  {
    icon: Sparkles,
    title: "Pembersihan & Detailing Rutin",
    desc: "Setiap unit disanitasi menyeluruh dan dipastikan bersih, wangi, serta bebas bau rokok sebelum menjemput Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Perlindungan Asuransi",
    desc: "Seluruh armada dilindungi asuransi komprehensif untuk memberikan rasa tenang dan aman selama perjalanan.",
  },
  {
    icon: Settings2,
    title: "Servis Berkala Resmi",
    desc: "Perawatan berkala di bengkel resmi memastikan performa mesin, rem, suspensi, dan AC selalu dingin dan optimal.",
  },
  {
    icon: Layers,
    title: "Unit Cadangan Siaga",
    desc: "Kesiapan unit pengganti yang setara jika terjadi situasi mendesak di jalan tanpa mengorbankan waktu Anda.",
  },
];

function ArmadaCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      const matchCat = selectedCategory === "Semua" || v.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.badges.some((b) => b.toLowerCase().includes(q)) ||
        v.fuel.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[50rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="eyebrow">Pilihan Armada Lengkap</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Katalog Mobil Nyaman & <span className="gold-text">Terawat Sempurna</span>
              </h1>
              <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Menyediakan 28+ pilihan unit mobil mewah, sedan eksekutif, SUV tangguh, MPV
                keluarga, hingga mobil listrik bebas ganjil-genap di Jakarta.
              </p>
            </Reveal>

            {/* Search Input Bar */}
            <div className="mt-10 mx-auto max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-gold" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari armada (cth: Mercedes, Pajero, Lexus, Ioniq, Accord, Alphard)..."
                  className="w-full rounded-full border border-gold/30 bg-black/40 py-3.5 pl-11 pr-11 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 backdrop-blur-md transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Hapus pencarian"
                    className="absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-[image:var(--gradient-gold)] text-primary-foreground font-medium shadow-[var(--shadow-gold)]"
                        : "glass border border-gold/20 text-muted-foreground hover:border-gold/60 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Status counter */}
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Menampilkan <span className="text-gold font-medium">{filteredVehicles.length}</span> dari {VEHICLES.length} unit armada
            </p>
          </div>
        </section>

        {/* Vehicle Cards Grid */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 lg:grid-cols-2"
              >
                {filteredVehicles.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center border border-gold/20 col-span-full">
                    <Search className="mx-auto h-10 w-10 text-gold/60 mb-4" />
                    <h3 className="text-xl font-normal text-foreground">Tidak Ada Armada yang Cocok</h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                      Tidak menemukan kendaraan untuk pencarian "{searchQuery}" pada kategori ini. Coba kata kunci lain atau reset pencarian.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("Semua");
                        setSearchQuery("");
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-2.5 text-xs tracking-widest text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                    >
                      Reset Filter & Pencarian
                    </button>
                  </div>
                ) : (
                  filteredVehicles.map((vehicle) => {
                    return (
                      <article
                        key={vehicle.slug}
                        className="glass group flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[var(--shadow-gold)]"
                      >
                        <div>
                          {/* Top Header & Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-gold uppercase">
                              {vehicle.category}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {vehicle.badges.map((b) => (
                                <span
                                  key={b}
                                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.55rem] text-muted-foreground"
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Image Preview with 3D hint */}
                          <div className="relative my-6 flex h-48 sm:h-56 items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(70%_60%_at_50%_60%,color-mix(in_oklab,var(--navy-deep)_80%,transparent),transparent)] p-4">
                            <img
                              src={vehicle.image}
                              alt={`${vehicle.name} — ${vehicle.tagline}`}
                              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                              loading="lazy" />
                            <Link
                              to="/armada/$slug"
                              params={{ slug: vehicle.slug }}
                              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/30 px-3 py-1.5 text-[0.6rem] tracking-wider text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                            >
                              <Eye className="h-3 w-3" />
                              <span>{vehicle.model ? "Inspeksi 3D" : "Detail Unit"}</span>
                            </Link>
                          </div>

                          {/* Title & Tagline */}
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-normal text-foreground">
                              {vehicle.name}
                            </h2>
                            <p className="mt-1 text-xs tracking-[0.2em] text-gold uppercase">
                              {vehicle.tagline}
                            </p>
                            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {vehicle.description}
                            </p>
                          </div>

                          {/* Spec Grid */}
                          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gold/15 pt-5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gold shrink-0" />
                              <span>{vehicle.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-gold shrink-0" />
                              <span>{vehicle.luggage}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Settings2 className="h-4 w-4 text-gold shrink-0" />
                              <span>{vehicle.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel className="h-4 w-4 text-gold shrink-0" />
                              <span>{vehicle.fuel}</span>
                            </div>
                          </div>

                          {/* Pricing Packages Preview */}
                          {vehicle.rates && (
                            <div className="mt-6 rounded-xl border border-gold/15 bg-gold/5 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase font-medium">
                                  Pilihan Paket Layanan:
                                </p>
                                <span className="text-[0.6rem] text-gold/80">Best Deal</span>
                              </div>
                              <div className="space-y-2 text-xs">
                                {vehicle.rates.slice(0, 2).map((rate) => (
                                  <div
                                    key={rate.package}
                                    className="flex items-center justify-between border-b border-gold/10 pb-1.5 last:border-0"
                                  >
                                    <span className="text-muted-foreground">{rate.package}</span>
                                    <span className="text-[0.65rem] font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                                      Tanya Promo WA &rarr;
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gold/15 pt-5">
                          <Link
                            to="/armada/$slug"
                            params={{ slug: vehicle.slug }}
                            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-[0.65rem] tracking-[0.18em] text-gold uppercase hover:bg-gold/10 transition-colors"
                          >
                            <span>{vehicle.model ? "Lihat Detail & 3D" : "Lihat Detail"}</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>

                          <a
                            href={waLink(
                              `Halo ${SITE.brand}, saya ingin memesan armada ${vehicle.name}. Mohon informasi ketersediaan.`
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 py-2.5 text-[0.65rem] tracking-[0.18em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                          >
                            <WhatsAppIcon className="h-3.5 w-3.5" />
                            <span>Pesan via WhatsApp</span>
                          </a>
                        </div>
                      </article>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 3D Showcase Highlight Banner */}
        <section className="py-16 sm:py-20 bg-[color-mix(in_oklab,var(--navy)_30%,var(--background))] border-y border-gold/15">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow">Fitur Interaktif Canggih</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl">
                    Inspeksi 3D Model 360° Sebelum Memutuskan Sewa
                  </h2>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Anda dapat memutar sudut kamera 360° dan memeriksa bodi mobil dari berbagai sudut sebelum melakukan pemesanan.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {VEHICLES.filter((v) => Boolean(v.model)).map((v) => (
                      <Link
                        key={v.slug}
                        to="/armada/$slug"
                        params={{ slug: v.slug }}
                        className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-[0.65rem] tracking-[0.15em] text-gold uppercase hover:bg-gold hover:text-primary-foreground transition-all"
                      >
                        3D {v.name} &rarr;
                      </Link>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <div className="glass rounded-2xl p-8 border border-gold/25 text-center">
                  <span className="text-4xl">🚘</span>
                  <h3 className="mt-4 text-xl font-normal text-foreground">
                    100% Real Unit & Asli
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Unit yang Anda lihat adalah representasi akurat armada kami yang beroperasi di Jakarta. Tidak ada kejutan unit berbeda saat penjemputan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Guarantees Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Standar Pemeliharaan"
              title="Komitmen Kondisi Prima di Setiap Keberangkatan"
              subtitle="Setiap aspek keamanan dan kenyamanan kendaraan diawasi secara ketat oleh tim mekanik berpengalaman."
            />

            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FLEET_GUARANTEES.map((g) => (
                <StaggerItem key={g.title}>
                  <div className="glass h-full rounded-xl p-6 border border-gold/15 text-left">
                    <g.icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-4 text-lg font-normal text-foreground">{g.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
            <Reveal className="glass rounded-2xl p-10 sm:p-14 border border-gold/30">
              <p className="eyebrow">Butuh Bantuan Memilih Mobil?</p>
              <h2 className="mt-4 text-3xl sm:text-5xl">
                Konsultasikan dengan Tim Reservasi Kami
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-muted-foreground">
                Beri tahu kami jumlah penumpang, estimasi barang bawaan, dan agenda Anda. Kami akan merekomendasikan armada paling tepat dengan penawaran harga terbaik.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={waLink(`Halo ${SITE.brand}, saya ingin konsultasi pilihan armada terbaik.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Tanya Ketersediaan via WhatsApp</span>
                </a>
                <Link
                  to="/kontak"
                  className="rounded-full border border-gold/40 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase hover:bg-gold/10 transition-colors"
                >
                  Isi Formulir Reservasi
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
