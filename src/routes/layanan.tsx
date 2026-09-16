import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Car,
  ChevronDown,
} from "lucide-react";
import { AppIcon, WhatsAppIcon, IconType } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { VEHICLES, TRAVEL_NEEDS } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Layanan Rental Mobil Jakarta — Vicky Rentcar";
const DESCRIPTION =
  "Pilihan layanan sewa mobil di Jakarta: Antar Jemput Bandara Soetta & Halim, Sewa Kantor & Bisnis, Mobil Pernikahan, Sewa Harian, Luar Kota, dan Hiace Premio Rombongan.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/layanan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/layanan` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeSchema(buildFAQSchema()),
      },
      {
        type: "application/ld+json",
        children: serializeSchema(
          buildBreadcrumbSchema([
            { name: "Beranda", url: SITE_URL },
            { name: "Layanan", url: `${SITE_URL}/layanan` },
          ]),
        ),
      },
    ],
  }),
  component: LayananPage,
});


const SERVICES_DETAILED: {
  id: string;
  iconName: IconType;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  recommendedVehicles: string[];
  waPrompt: string;
}[] = [
  {
    id: "airport",
    iconName: "airport",
    badge: "Bandara Soetta & Halim",
    title: "Antar Jemput Bandara",
    tagline: "Penjemputan & Pengantaran Bandara Soekarno-Hatta & Halim",
    desc: "Layanan antar jemput bandara yang tepat waktu dan nyaman. Supir kami siap menyambut Anda langsung di terminal kedatangan dengan papan nama (name board), membantu bagasi, dan memantau jam kedatangan pesawat secara live.",
    features: [
      "Penjemputan langsung di terminal kedatangan (Gate Soetta T1/T2/T3 & Halim)",
      "Gratis waktu tunggu bila terjadi penundaan penerbangan (delay)",
      "Tersedia opsi all-in termasuk biaya tol dan parkir bandara",
      "Air mineral, permen, dan colokan charger smartphone di dalam kendaraan",
    ],
    recommendedVehicles: ["toyota-alphard", "toyota-innova-zenix"],
    waPrompt: "Halo Vicky Rentcar, saya ingin memesan layanan Antar Jemput Bandara.",
  },
  {
    id: "corporate",
    iconName: "corporate",
    badge: "Kantor & Bisnis",
    title: "Sewa Mobil Kantor & Bisnis",
    tagline: "Solusi Transportasi Perusahaan, Tamu Kantor & Kunjungan Kerja",
    desc: "Mendukung kelancaran mobilitas kantor, rekanan bisnis, dan tamu perusahaan Anda. Kami menyediakan sewa harian, mingguan, maupun bulanan dengan invoice resmi dan proses yang mudah.",
    features: [
      "Pilihan sewa harian, mingguan, bulanan, atau kontrak operasional",
      "Penerbitan invoice resmi perusahaan berbadan hukum PT",
      "Koordinasi jadwal yang mudah via WhatsApp dan admin responsif",
      "Kesiapan unit pengganti siaga jika terjadi kendala teknis",
    ],
    recommendedVehicles: ["toyota-alphard", "toyota-innova-zenix", "toyota-innova-reborn"],
    waPrompt: "Halo Vicky Rentcar, saya ingin mendiskusikan kebutuhan sewa mobil untuk kantor.",
  },
  {
    id: "wedding",
    iconName: "wedding",
    badge: "Hari Bahagia",
    title: "Mobil Pernikahan",
    tagline: "Toyota Alphard Bersih & Elegan untuk Hari Bahagia",
    desc: "Lengkapi hari pernikahan Anda dengan kendaraan Toyota Alphard yang bersih, harum, dan mengilap. Dilengkapi opsi dekorasi pita bunga dan supir yang berpakaian rapi serta tepat waktu.",
    features: [
      "Unit Toyota Alphard dalam kondisi prima, bersih, dan harum",
      "Pilihan dekorasi pita bunga pernikahan yang rapi",
      "Supir mengenakan pakaian formal rapi, wangi, dan ramah",
      "Koordinasi langsung dengan Wedding Organizer / panitia acara",
    ],
    recommendedVehicles: ["toyota-alphard"],
    waPrompt: "Halo Vicky Rentcar, saya ingin menanyakan sewa Mobil Pernikahan Toyota Alphard.",
  },
  {
    id: "daily",
    iconName: "daily",
    badge: "Harian Fleksibel",
    title: "Sewa Mobil Harian Dalam Kota",
    tagline: "Sewa Harian Jakarta (12 Jam & Full Day)",
    desc: "Solusi santai untuk perjalanan keliling Jakarta, urusan pekerjaan, atau jalan-jalan keluarga tanpa stres memikirkan macet dan ganjil-genap.",
    features: [
      "Pilihan durasi sewa 12 jam atau full day",
      "Tersedia paket Mobil + Supir atau Paket All-In (BBM + Tol + Parkir)",
      "Bebas rute ke seluruh wilayah Jakarta, Tangerang, BSD, Depok, Bekasi",
      "Supir hafal rute jalan alternatif dan jalur bebas ganjil-genap",
    ],
    recommendedVehicles: ["toyota-innova-zenix", "toyota-innova-reborn", "toyota-alphard"],
    waPrompt: "Halo Vicky Rentcar, saya ingin memesan sewa mobil harian dalam kota.",
  },
  {
    id: "out-of-town",
    iconName: "out-of-town",
    badge: "Luar Kota",
    title: "Perjalanan Luar Kota & Drop-Off",
    tagline: "Rute Nyaman ke Bandung, Bogor, Cirebon, hingga Jawa Tengah",
    desc: "Nikmati perjalanan dinas atau liburan keluarga ke luar kota tanpa capek menyetir sendiri. Didukung supir berpengalaman jarak jauh yang mengutamakan keselamatan dan kenyamanan berkendara.",
    features: [
      "Rute populer: Jakarta ke Bandung, Puncak, Cirebon, Semarang, Solo, Yogyakarta",
      "Layanan drop-off satu arah (one-way) atau perjalanan pulang-pergi (round-trip)",
      "Armada tangguh dengan perawatan mesin dan suspensi optimal",
      "Waktu keberangkatan fleksibel sesuai kenyamanan Anda",
    ],
    recommendedVehicles: ["toyota-innova-reborn", "toyota-innova-zenix", "toyota-hiace-premio"],
    waPrompt: "Halo Vicky Rentcar, saya ingin menanyakan sewa mobil untuk perjalanan ke luar kota.",
  },
  {
    id: "group",
    iconName: "corporate",
    badge: "Rombongan",
    title: "Sewa Mobil Rombongan",
    tagline: "Toyota Hiace Premio untuk Rombongan & Keluarga Besar",
    desc: "Kabin lega berkapasitas 11 hingga 14 penumpang dilengkapi kursi reclining yang empuk, AC dingin merata, dan ruang bagasi yang lapang.",
    features: [
      "Kapasitas 11-14 penumpang dengan legroom lega dan lorong tengah",
      "Audio entertainment dan mic untuk kenyamanan rombongan",
      "Cocok untuk gathering kantor, seminar, event, dan liburan keluarga besar",
      "Suspensi empuk dan kabin senyap untuk kenyamanan jarak jauh",
    ],
    recommendedVehicles: ["toyota-hiace-premio"],
    waPrompt: "Halo Vicky Rentcar, saya ingin memesan Toyota Hiace Premio untuk rombongan.",
  },
];

const COMPLIMENTARY_AMENITIES = [
  { title: "Air Mineral Segar", desc: "Disediakan di dalam kendaraan untuk kesegaran perjalanan Anda." },
  { title: "Kabel Fast Charging", desc: "Mendukung konektor Type-C, Lightning iPhone, dan Micro-USB." },
  { title: "Tisu Basah & Kering", desc: "Selalu tersedia di dalam kabin demi kebersihan dan kenyamanan." },
  { title: "Payung di Mobil", desc: "Siap digunakan saat hujan atau panas ketika turun dari mobil." },
  { title: "Kabin Bersih & Wangi", desc: "Kabin selalu dibersihkan, ber-AC sejuk, dan bebas asap rokok." },
  { title: "Papan Nama Tamu", desc: "Khusus penjemputan bandara agar memudahkan bertemu di terminal kedatangan." },
];

const BOOKING_STEPS = [
  {
    step: "01",
    title: "Pilih Mobil & Layanan",
    desc: "Tentukan jenis kendaraan (Alphard, Zenix, Reborn, atau Hiace) sesuai kebutuhan Anda.",
  },
  {
    step: "02",
    title: "Tentukan Jadwal & Lokasi",
    desc: "Sampaikan tanggal, jam penjemputan, lokasi, dan rute tujuan via WhatsApp atau form reservasi.",
  },
  {
    step: "03",
    title: "Konfirmasi & Rincian Tarif",
    desc: "Tim kami mengonfirmasi ketersediaan unit beserta rincian biaya yang transparan dan metode pembayaran.",
  },
  {
    step: "04",
    title: "Penjemputan Tepat Waktu",
    desc: "Supir kami tiba lebih awal sebelum jadwal dengan mobil yang bersih dan siap mengantar perjalanan Anda.",
  },
];

const FAQS = [
  {
    q: "Apa saja yang sudah termasuk dalam harga sewa mobil?",
    a: "Harga sewa standar sudah termasuk unit mobil dan supir ramah & berpengalaman. Kami juga menyediakan 'Paket All-In' yang sudah mencakup BBM, tol, dan parkir sesuai rute kesepakatan sehingga Anda tidak perlu repot membayar di jalan.",
  },
  {
    q: "Apakah Vicky Rentcar melayani sewa mobil lepas kunci (tanpa supir)?",
    a: "Fokus utama layanan kami adalah sewa mobil dengan supir profesional agar Anda dapat menikmati perjalanan santai tanpa repot dan lelah menyetir di tengah kemacetan Jakarta.",
  },
  {
    q: "Bagaimana cara melakukan penjemputan di Bandara Soekarno-Hatta atau Halim?",
    a: "Setelah mendarat dan mengambil bagasi, supir kami akan menunggu di area kedatangan (arrival hall) dengan memegang papan nama bertuliskan nama Anda. Tim kami juga memantau jadwal kedatangan pesawat secara langsung.",
  },
  {
    q: "Bagaimana jika agenda saya melebihi durasi waktu sewa (overtime)?",
    a: "Overtime dihitung secara transparan per jam dengan tarif standar (10% dari tarif harian per jam) dan dapat dibayarkan langsung setelah perjalanan selesai.",
  },
  {
    q: "Apakah perusahaan bisa meminta invoice resmi?",
    a: "Tentu saja. Sebagai badan hukum resmi PT. Vicky Rental Nusantara, kami menyediakan invoice resmi dan kwitansi untuk kebutuhan administrasi kantor.",
  },
];

function LayananPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[50rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="eyebrow">Layanan Vicky Rentcar</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Solusi Rental Mobil Nyaman & <span className="gold-text">Praktis</span> di Jakarta
              </h1>
              <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Mulai dari antar jemput bandara, operasional kantor, mobil pernikahan, hingga wisata rombongan — seluruh layanan disiapkan untuk kenyamanan perjalanan Anda di Jakarta.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Detailed Services Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-16">
            {SERVICES_DETAILED.map((service, index) => {
              const isEven = index % 2 === 1;
              const recVehicles = VEHICLES.filter((v) =>
                service.recommendedVehicles.includes(v.slug),
              );

              return (
                <Reveal key={service.id} delay={0.1}>
                  <article className="glass relative overflow-hidden rounded-2xl border border-gold/20 p-8 sm:p-12 transition-all duration-500 hover:border-gold/50">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                      <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : ""}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                            <AppIcon name={service.iconName} className="h-6 w-6" />
                          </div>
                          <span className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[0.6rem] tracking-[0.2em] text-gold uppercase">
                            {service.badge}
                          </span>
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground">
                          {service.title}
                        </h2>
                        <p className="mt-1 text-xs tracking-[0.2em] text-gold uppercase">
                          {service.tagline}
                        </p>

                        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {service.desc}
                        </p>

                        <div className="mt-6 border-t border-gold/15 pt-6">
                          <p className="eyebrow text-gold">Keunggulan Layanan Ini:</p>
                          <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-muted-foreground">
                            {service.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2.5">
                                <Check className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <a
                            href={waLink(service.waPrompt)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            <span>Pesan Layanan Ini</span>
                          </a>
                          <Link
                            to="/kontak"
                            className="rounded-full border border-gold/30 px-6 py-3.5 text-xs tracking-[0.18em] text-gold uppercase hover:bg-gold/10 transition-colors"
                          >
                            Form Reservasi
                          </Link>
                        </div>
                      </div>

                      {/* Recommended vehicle side card */}
                      <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : ""}`}>
                        <div className="rounded-xl border border-gold/15 bg-black/40 p-6">
                          <p className="eyebrow text-gold text-center">Rekomendasi Unit Pilihan</p>
                          <div className="mt-4 space-y-4">
                            {recVehicles.map((veh) => (
                              <Link
                                key={veh.slug}
                                to="/armada/$slug"
                                params={{ slug: veh.slug }}
                                className="group flex items-center gap-4 rounded-lg border border-gold/10 bg-white/5 p-3.5 transition-all hover:border-gold/40 hover:bg-gold/5"
                              >
                                <img
                                  src={veh.image}
                                  alt={veh.name}
                                  className="h-16 w-24 object-contain transition-transform group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div>
                                  <h3 className="text-base font-normal text-foreground group-hover:text-gold transition-colors">
                                    {veh.name}
                                  </h3>
                                  <p className="text-[0.65rem] text-muted-foreground">
                                    {veh.capacity} • {veh.category}
                                  </p>
                                  <p className="mt-1 text-[0.7rem] text-gold font-medium flex items-center gap-1 group-hover:underline">
                                    <span>Tanya Promo via WhatsApp &rarr;</span>
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Complimentary Amenities Section */}
        <section className="py-20 bg-[color-mix(in_oklab,var(--navy)_30%,var(--background))] border-y border-gold/15">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Fasilitas Mobil"
              title="Fasilitas Pendukung di Setiap Perjalanan"
              subtitle="Setiap unit armada kami disiapkan dengan perlengkapan untuk kenyamanan perjalanan Anda."
            />

            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
              {COMPLIMENTARY_AMENITIES.map((am) => (
                <StaggerItem key={am.title}>
                  <div className="glass h-full rounded-xl p-6 border border-gold/15">
                    <Sparkles className="h-6 w-6 text-gold" />
                    <h3 className="mt-4 text-lg font-normal text-foreground">{am.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {am.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 4-Step Booking Process */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Proses Reservasi"
              title="Cara Pemesanan Cepat & Praktis"
              subtitle="Kemudahan proses pemesanan dalam 4 langkah sederhana tanpa birokrasi berbelit."
            />

            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BOOKING_STEPS.map((s) => (
                <StaggerItem key={s.step}>
                  <div className="glass relative h-full rounded-xl p-8 border border-gold/15 transition-all duration-500 hover:border-gold/45">
                    <span className="font-display text-4xl gold-text">{s.step}</span>
                    <h3 className="mt-4 text-xl font-normal text-foreground">{s.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="FAQ Layanan"
              title="Pertanyaan yang Sering Diajukan"
              subtitle="Informasi penting seputar kebijakan sewa, pembayaran, dan operasional layanan kami."
            />

            <div className="mt-14 space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="glass overflow-hidden rounded-xl border border-gold/15 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-normal text-foreground pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gold/10 px-6 pb-6 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
            <Reveal className="glass rounded-2xl p-10 sm:p-14 border border-gold/30">
              <p className="eyebrow">Kebutuhan Khusus / Custom Trip?</p>
              <h2 className="mt-4 text-3xl sm:text-5xl">
                Konsultasikan Kebutuhan Rute & Agenda Anda
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-muted-foreground">
                Tim operasional kami siap menyusun jadwal penjemputan multi-titik, pengawalan roadshow korporat, atau paket luar kota yang fleksibel sesuai kebutuhan Anda.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={waLink(`Halo ${SITE.brand}, saya ingin konsultasi kebutuhan perjalanan khusus.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
                <Link
                  to="/armada"
                  className="rounded-full border border-gold/40 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase hover:bg-gold/10 transition-colors"
                >
                  Bandingkan Armada
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

