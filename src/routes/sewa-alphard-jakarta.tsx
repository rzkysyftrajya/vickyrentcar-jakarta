import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Plane,
  Users,
} from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { waLink } from "@/lib/site";
import { SITE_URL, buildBreadcrumbSchema, serializeSchema } from "@/lib/schema";
import { VEHICLES } from "@/lib/vehicles";

const TITLE = "Sewa Alphard Jakarta | Toyota Alphard dengan Driver";
const DESCRIPTION =
  "Sewa Toyota Alphard di Jakarta dengan driver untuk kebutuhan bisnis, keluarga, airport, dan event. Pilih Alphard sesuai kebutuhan dan konsultasikan reservasi via WhatsApp.";
const CANONICAL = `${SITE_URL}/sewa-alphard-jakarta`;
const WHATSAPP_MESSAGE = "Halo Vickyrentcarjakarta, saya ingin konsultasi Alphard.";

const NEEDS = [
  {
    title: "Airport / Bandara",
    icon: Plane,
    text: "Antar jemput bandara untuk perjalanan yang perlu disiapkan dengan rapi.",
  },
  {
    title: "Bisnis & Corporate",
    icon: BriefcaseBusiness,
    text: "Mobilitas tamu kantor, kunjungan kerja, dan agenda bisnis di Jakarta.",
  },
  {
    title: "Keluarga",
    icon: Users,
    text: "Kabin captain seat untuk perjalanan keluarga di dalam maupun sekitar Jakarta.",
  },
  {
    title: "Tamu Executive",
    icon: Check,
    text: "Pilihan kendaraan untuk menerima tamu dan perjalanan yang membutuhkan kenyamanan.",
  },
  {
    title: "Wedding / Event",
    icon: Heart,
    text: "Alphard untuk mobil pernikahan dan kebutuhan event yang tercantum di layanan kendaraan.",
  },
] as const;

const BOOKING_STEPS = [
  "Sampaikan kebutuhan perjalanan.",
  "Pilih Alphard yang sesuai.",
  "Kirim tanggal, waktu, lokasi, dan tujuan.",
  "Tim mengonfirmasi ketersediaan dan reservasi.",
] as const;

const FAQS = [
  [
    "Apakah Alphard tersedia dengan driver?",
    "Ya, pilihan Alphard di halaman ini tercantum dengan layanan bersama supir.",
  ],
  [
    "Alphard cocok untuk kebutuhan apa?",
    "Data kendaraan mencakup airport transfer, perjalanan bisnis, keluarga, tamu kantor atau VIP, serta mobil pernikahan.",
  ],
  [
    "Apakah bisa untuk airport transfer?",
    "Ya, seluruh pilihan Alphard di halaman ini tercantum untuk antar jemput bandara.",
  ],
  [
    "Apakah bisa untuk kebutuhan corporate?",
    "Ya, Alphard tercantum untuk kebutuhan bisnis, tamu kantor, dan kunjungan kerja.",
  ],
  [
    "Apakah Alphard bisa digunakan untuk keluarga?",
    "Ya, pilihan Alphard tercantum untuk keluarga atau perjalanan keluarga dengan captain seat dan kapasitas sesuai unit.",
  ],
  [
    "Bagaimana memilih Alphard yang sesuai?",
    "Bandingkan kapasitas, fitur kabin, layanan, dan use case setiap unit, lalu konsultasikan kebutuhan perjalanan melalui WhatsApp.",
  ],
  [
    "Informasi apa yang perlu dikirim saat reservasi?",
    "Kirim tanggal, waktu, lokasi jemput, tujuan, serta kebutuhan perjalanan agar tim dapat membantu memilih unit.",
  ],
  [
    "Bagaimana cara konsultasi ketersediaan?",
    "Kirim pesan konsultasi Alphard melalui WhatsApp untuk membahas pilihan unit dan detail perjalanan.",
  ],
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export const Route = createFileRoute("/sewa-alphard-jakarta")({
  head: () => ({
    links: [{ rel: "canonical", href: CANONICAL }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeSchema(
          buildBreadcrumbSchema([
            { name: "Beranda", url: SITE_URL },
            { name: "Sewa Alphard Jakarta", url: CANONICAL },
          ]),
        ),
      },
      { type: "application/ld+json", children: serializeSchema(faqSchema) },
    ],
  }),
  component: SewaAlphardJakartaPage,
});

function SewaAlphardJakartaPage() {
  const alphards = VEHICLES.filter((vehicle) => vehicle.name.toLowerCase().includes("alphard"));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const whatsappUrl = waLink(WHATSAPP_MESSAGE);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Nav />
      <main className="pt-28 pb-20">
        <section className="relative overflow-hidden py-14 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-112 w-full max-w-176 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow">Toyota Alphard Jakarta</p>
              <h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
                Sewa Alphard Jakarta
              </h1>
              <div className="gold-rule mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Toyota Alphard di Jakarta dengan driver untuk kebutuhan bisnis, keluarga, airport,
                dan event sesuai pilihan kendaraan yang tersedia. Untuk perjalanan bersama
                rombongan, lihat{" "}
                <Link to="/sewa-hiace-jakarta" className="text-gold hover:underline">
                  sewa Hiace Jakarta
                </Link>
                .
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold)"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Konsultasi Alphard via WhatsApp
                </a>
                <a
                  href="#pilihan-alphard"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm text-gold hover:bg-gold/10"
                >
                  Lihat Pilihan Alphard <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal direction="right" className="glass rounded-2xl border border-gold/20 p-5">
              <img
                src={alphards[0]?.image}
                alt={alphards[0]?.name}
                className="mx-auto h-56 w-full object-contain sm:h-72"
              />
              <div className="border-t border-gold/15 pt-5 text-center">
                <p className="eyebrow text-gold">Executive MPV</p>
                <h2 className="mt-2 text-2xl">Pilihan Alphard dengan Driver</h2>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Kebutuhan Perjalanan"
              title="Alphard untuk agenda executive Anda"
              subtitle="Pilih konteks perjalanan yang paling sesuai, lalu konsultasikan detailnya dengan tim Vicky Rentcar."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
              {NEEDS.map(({ title, icon: Icon, text }) => (
                <StaggerItem key={title} direction="scale">
                  <article className="glass h-full rounded-xl border border-gold/15 p-5">
                    <Icon className="h-6 w-6 text-gold" />
                    <h2 className="mt-5 text-xl font-normal">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section
          id="pilihan-alphard"
          className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Pilihan Alphard"
              title="Pilih unit sesuai perjalanan"
              subtitle="Detail kapasitas dan fitur diambil dari data kendaraan yang tersedia."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {alphards.map((vehicle) => (
                <article
                  key={vehicle.slug}
                  className="glass overflow-hidden rounded-xl border border-gold/15"
                >
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-52 w-full object-contain p-4"
                  />
                  <div className="border-t border-gold/15 p-6">
                    <p className="eyebrow text-gold">{vehicle.category}</p>
                    <h2 className="mt-2 text-2xl">{vehicle.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {vehicle.description}
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        ["Kapasitas", vehicle.capacity],
                        ["Transmisi", vehicle.transmission],
                        ["AC", vehicle.ac],
                        ["Fitur kabin", vehicle.entertainment],
                      ].map(([label, value]) => (
                        <div key={label} className="border-b border-gold/10 pb-2">
                          <p className="text-xs uppercase tracking-[0.14em] text-gold">{label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Untuk: {vehicle.fitFor.slice(0, 2).join(" dan ")}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-(image:--gradient-gold) px-5 py-3 text-sm font-medium text-primary-foreground"
                      >
                        <WhatsAppIcon className="h-4 w-4" /> Tanya Ketersediaan
                      </a>
                      <Link
                        to="/armada/$slug"
                        params={{ slug: vehicle.slug }}
                        className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                      >
                        Lihat detail <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Kenapa Alphard"
              title="Fitur kendaraan untuk perjalanan premium"
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <article className="glass rounded-xl border border-gold/15 p-6">
                <Check className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Kabin executive</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Captain seat, kabin yang lega, dan detail kenyamanan sesuai varian Alphard.
                </p>
              </article>
              <article className="glass rounded-xl border border-gold/15 p-6">
                <Users className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Pilihan kapasitas</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Pilih unit dengan kapasitas 4–6 atau 5–6 penumpang sesuai data kendaraan.
                </p>
              </article>
              <article className="glass rounded-xl border border-gold/15 p-6">
                <BriefcaseBusiness className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Use case beragam</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Tersedia untuk airport transfer, bisnis, keluarga, dan mobil pernikahan.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-gold/15 bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Layanan Pendukung"
              title="Hubungkan kebutuhan perjalanan Anda"
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/layanan" className="glass rounded-xl border border-gold/15 p-5">
                <Plane className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Airport Transfer</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lihat layanan perjalanan bandara.
                </p>
              </Link>
              <Link to="/korporat" className="glass rounded-xl border border-gold/15 p-5">
                <BriefcaseBusiness className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Corporate</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Kebutuhan perjalanan dan operasional kantor.
                </p>
              </Link>
              <Link to="/kontak" className="glass rounded-xl border border-gold/15 p-5">
                <MapPin className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Kontak</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sampaikan detail kebutuhan Anda.
                </p>
              </Link>
              <Link to="/armada" className="glass rounded-xl border border-gold/15 p-5">
                <Users className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Semua Armada</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lihat pilihan kendaraan lainnya.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Cara Booking" title="Empat langkah menuju reservasi Alphard" />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
              {BOOKING_STEPS.map((step, index) => (
                <StaggerItem key={step}>
                  <article className="glass h-full rounded-xl border border-gold/15 p-6">
                    <span className="font-display text-4xl text-gold">0{index + 1}</span>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground"
            >
              <WhatsAppIcon className="h-4 w-4" /> Kirim Detail Perjalanan
            </a>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ Alphard" title="Pertanyaan tentang Toyota Alphard" />
            <div className="mt-10 space-y-3">
              {FAQS.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={question}
                    className="glass overflow-hidden rounded-xl border border-gold/15"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="pr-4 text-base">{question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="border-t border-gold/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                        {answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal className="glass rounded-2xl border border-gold/30 p-10 sm:p-14">
              <p className="eyebrow">Toyota Alphard Jakarta</p>
              <h2 className="mt-4 text-3xl sm:text-5xl">Butuh Alphard untuk Perjalanan Anda?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                Kirim kebutuhan perjalanan Anda melalui WhatsApp untuk konsultasi pilihan Alphard
                dan reservasi.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" /> Konsultasi &amp; Reservasi Alphard via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
