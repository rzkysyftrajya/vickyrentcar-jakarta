import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { VehicleViewer } from "@/components/three/VehicleViewer";
import { Reveal } from "@/components/Reveal";
import { EXTERIOR_ANGLES, getVehicle, VEHICLES } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import {
  SITE_URL,
  serializeSchema,
  buildVehicleSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";


export const Route = createFileRoute("/armada/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Armada tidak ditemukan" }, { name: "robots", content: "noindex" }],
      };
    }
    const { vehicle } = loaderData;
    const title = `Sewa ${vehicle.name} Jakarta — ${SITE.brand}`;
    const description = vehicle.description;
    const ogImage = `${SITE_URL}${vehicle.image}`;
    const pageUrl = `${SITE_URL}/armada/${vehicle.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: pageUrl },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${vehicle.name} — ${SITE.brand}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogImage },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: serializeSchema(buildVehicleSchema(vehicle)),
        },
        {
          type: "application/ld+json",
          children: serializeSchema(
            buildBreadcrumbSchema([
              { name: "Beranda", url: SITE_URL },
              { name: "Katalog Armada", url: `${SITE_URL}/armada` },
              { name: vehicle.name, url: pageUrl },
            ]),
          ),
        },
      ],
    };
  },

  component: VehicleDetail,
});

const TABS = ["Eksterior", "Interior", "Spesifikasi"] as const;

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Eksterior");
  const [angleIndex, setAngleIndex] = useState(0);
  const angle = EXTERIOR_ANGLES[angleIndex] ?? null;

  const specs = [
    { label: "Kapasitas", value: vehicle.capacity },
    { label: "Bagasi", value: vehicle.luggage },
    { label: "Transmisi", value: vehicle.transmission },
    { label: "Bahan Bakar", value: vehicle.fuel },
    { label: "Pendingin", value: vehicle.ac },
    { label: "Hiburan", value: vehicle.entertainment },
  ];

  const others = VEHICLES.filter((v) => v.slug !== vehicle.slug);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/armada"
              className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog Armada
            </Link>
          </div>

          <Reveal className="mt-8">
            <p className="eyebrow">{vehicle.tagline}</p>
            <h1 className="mt-3 text-5xl leading-tight sm:text-6xl">{vehicle.name}</h1>
            <div className="gold-rule mt-6 w-24" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-muted-foreground">{vehicle.description}</p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {TABS.map((t) => {
              const label = t === "Eksterior" && vehicle.model ? "Eksterior 3D" : t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  aria-pressed={tab === t}
                  className={`rounded-full px-6 py-2.5 text-[0.6rem] tracking-[0.25em] uppercase transition-all duration-300 ${
                    tab === t
                      ? "bg-gold text-primary-foreground font-medium"
                      : "border border-gold/25 text-muted-foreground hover:text-gold"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              {tab === "Eksterior" ? (
                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <VehicleViewer
                    url={vehicle.model}
                    name={vehicle.name}
                    image={vehicle.image}
                    angle={angle}
                    className="h-[26rem] w-full sm:h-[34rem]"
                  />
                  <div className="glass rounded-xl p-7 flex flex-col justify-between">
                    {vehicle.model ? (
                      <div>
                        <p className="eyebrow">Sudut Kamera 3D</p>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          {EXTERIOR_ANGLES.map((a, i) => (
                            <button
                              key={a.label}
                              type="button"
                              onClick={() => setAngleIndex(i)}
                              aria-pressed={i === angleIndex}
                              className={`rounded-lg border px-4 py-3 text-[0.6rem] tracking-[0.18em] uppercase transition-all duration-300 ${
                                i === angleIndex
                                  ? "border-gold bg-gold/10 text-gold"
                                  : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-gold"
                              }`}
                            >
                              {a.label}
                            </button>
                          ))}
                        </div>
                        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                          Anda juga dapat memutar model secara bebas dengan drag, memperbesar dengan
                          scroll atau pinch, dan membuka mode layar penuh.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="eyebrow">Keunggulan Unit</p>
                        <h3 className="mt-2 text-xl font-normal text-foreground">
                          {vehicle.name}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {vehicle.badges.map((b: string) => (
                            <span
                              key={b}
                              className="rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-[0.65rem] tracking-wider text-gold uppercase"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <ul className="mt-6 space-y-3 text-xs text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-gold shrink-0" />
                            <span>Kapasitas: <strong className="text-foreground">{vehicle.capacity}</strong></span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-gold shrink-0" />
                            <span>Transmisi: <strong className="text-foreground">{vehicle.transmission}</strong></span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-gold shrink-0" />
                            <span>Bahan Bakar: <strong className="text-foreground">{vehicle.fuel}</strong></span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-gold shrink-0" />
                            <span>Pendingin: <strong className="text-foreground">{vehicle.ac}</strong></span>
                          </li>
                        </ul>
                        <div className="mt-6 p-4 rounded-xl border border-gold/20 bg-gold/5">
                          <p className="text-xs text-gold font-medium">Garansi Vicky Rentcar:</p>
                          <p className="text-[0.7rem] text-muted-foreground mt-1">
                            Unit bersih mengilap, wangi, bebas asap rokok, serta supir ramah & berpengalaman.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-gold/15">
                      <a
                        href={waLink(`Halo ${SITE.brand}, saya ingin reservasi ${vehicle.name}.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] py-3 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-[1.02] transition-transform"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        <span>Booking Unit Ini</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}

              {tab === "Interior" ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  {vehicle.interior.map((img) => (
                    <figure
                      key={img.src}
                      className="glass group overflow-hidden rounded-xl"
                    >
                      <img
                        src={img.src}
                        alt={`Interior ${vehicle.name} — ${img.label}`}
                        loading="lazy"
                        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-96"
                      />
                      <figcaption className="px-6 py-4 text-[0.6rem] tracking-[0.25em] text-gold uppercase">
                        {img.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}

              {tab === "Spesifikasi" ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  <dl className="glass grid gap-px overflow-hidden rounded-xl sm:grid-cols-2">
                    {specs.map((s) => (
                      <div key={s.label} className="p-6">
                        <dt className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                          {s.label}
                        </dt>
                        <dd className="mt-2 text-sm">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="glass rounded-xl p-7">
                    <p className="eyebrow">Layanan yang tersedia</p>
                    <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                      {vehicle.services.map((s) => (
                        <li key={s} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-gold" /> {s}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(
                        `Halo ${SITE.brand}, saya ingin menanyakan reservasi ${vehicle.name}.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] py-3 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Pesan Sekarang
                    </a>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <section className="mt-24">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Pilihan Armada Lainnya</p>
                <h2 className="mt-2 text-2xl font-light text-foreground">Rekomendasi Unit Terkait</h2>
              </div>
              <Link
                to="/armada"
                className="text-xs text-gold hover:underline tracking-wider uppercase"
              >
                Lihat Semua 28+ Armada &rarr;
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {others.slice(0, 4).map((v) => (
                <Link
                  key={v.slug}
                  to="/armada/$slug"
                  params={{ slug: v.slug }}
                  className="glass group rounded-xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      className="h-28 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <h3 className="mt-4 text-lg font-medium text-foreground group-hover:gold-text transition-colors">
                      {v.name}
                    </h3>
                    <p className="mt-1 text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase">
                      {v.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gold/10 flex items-center justify-between text-[0.65rem] text-gold">
                    <span>{v.category}</span>
                    <span>Detail &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
