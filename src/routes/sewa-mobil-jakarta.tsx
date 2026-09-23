import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Check, Clock3, MapPin, Plane, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { SITE, waLink } from "@/lib/site";
import { TRAVEL_NEEDS, VEHICLES } from "@/lib/vehicles";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Sewa Mobil Jakarta dengan Driver | Vicky Rentcar";
const DESCRIPTION =
  "Sewa mobil Jakarta dengan driver profesional untuk bisnis, keluarga, bandara, perjalanan luar kota, dan rombongan. Konsultasi armada melalui WhatsApp.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const FEATURED_SLUGS = [
  "toyota-alphard",
  "toyota-innova-zenix",
  "toyota-innova-reborn",
  "toyota-hiace-premio",
] as const;

const RENTAL_NEEDS = [
  {
    title: "Bandara",
    description: TRAVEL_NEEDS.find((need) => need.id === "bandara")!.desc,
    icon: Plane,
  },
  {
    title: "Bisnis & Kantor",
    description: TRAVEL_NEEDS.find((need) => need.id === "corporate")!.desc,
    icon: BriefcaseBusiness,
  },
  {
    title: "Keluarga / Perjalanan Harian",
    description: "Sewa harian untuk keluarga, city tour, dan mobilitas santai di Jakarta.",
    icon: Users,
  },
  {
    title: "Luar Kota",
    description: "Perjalanan luar kota dan drop-off bersama driver berpengalaman.",
    icon: MapPin,
  },
  {
    title: "Rombongan",
    description: TRAVEL_NEEDS.find((need) => need.id === "rombongan")!.desc,
    icon: Users,
  },
] as const;

const SUPPORT_SERVICES = [
  {
    title: "Antar Jemput Bandara",
    description:
      "Melayani penjemputan dan pengantaran di Bandara Soekarno-Hatta serta Halim, dengan pemantauan jadwal penerbangan dan bantuan bagasi.",
    link: "/layanan" as const,
    linkLabel: "Lihat detail layanan",
  },
  {
    title: "Corporate",
    description:
      "Sewa untuk operasional kantor, tamu bisnis, dan kunjungan kerja dengan pilihan durasi serta invoice resmi perusahaan.",
    link: "/korporat" as const,
    linkLabel: "Lihat layanan korporat",
  },
  {
    title: "Wisata / Luar Kota",
    description:
      "Perjalanan keluarga, city tour, dan rute luar kota seperti Bandung, Bogor, Cirebon, hingga Jawa Tengah bersama driver.",
    link: "/layanan" as const,
    linkLabel: "Lihat layanan perjalanan",
  },
] as const;

const TRUST_POINTS = [
  {
    title: "Layanan 24 Jam",
    description:
      "Layanan reservasi tersedia 24 jam setiap hari. Jadwal penjemputan dikonfirmasi sesuai kebutuhan perjalanan dan ketersediaan armada.",
    icon: Clock3,
  },
  {
    title: "Driver Berpengalaman",
    description: "Driver ramah, sopan, dan memahami rute Jakarta.",
    icon: Users,
  },
  {
    title: "Mobil Bersih dan AC",
    description: "Kabin dibersihkan dan dilengkapi AC untuk mendukung kenyamanan perjalanan.",
    icon: Check,
  },
  {
    title: "Soetta dan Halim",
    description: "Melayani antar jemput di dua bandara Jakarta.",
    icon: Plane,
  },
  {
    title: "Invoice Resmi Corporate",
    description: "Tersedia untuk kebutuhan administrasi perusahaan.",
    icon: BriefcaseBusiness,
  },
] as const;

const BOOKING_STEPS = [
  "Pilih kebutuhan dan kendaraan.",
  "Kirim tanggal, waktu, lokasi jemput, tujuan, dan durasi melalui WhatsApp.",
  "Tim mengonfirmasi ketersediaan dan penawaran.",
  "Booking dikonfirmasi dan driver menjemput sesuai jadwal.",
] as const;

const FAQS = [
  {
    question: "Apakah sewa mobil sudah termasuk driver?",
    answer:
      "Ya. Fokus layanan Vicky Rentcar adalah sewa mobil dengan driver yang ramah dan berpengalaman.",
  },
  {
    question: "Apakah tersedia 24 jam?",
    answer: "Ya, layanan reservasi dan penjemputan tersedia 24 jam setiap hari.",
  },
  {
    question: "Kendaraan apa yang cocok untuk keluarga?",
    answer:
      "Toyota Innova Zenix cocok untuk keluarga dan perjalanan harian. Toyota Alphard juga tersedia untuk kebutuhan keluarga yang mengutamakan kabin executive.",
  },
  {
    question: "Apakah melayani Soetta dan Halim?",
    answer:
      "Ya, layanan antar jemput tersedia di Bandara Soekarno-Hatta Terminal 1, 2, dan 3 serta Bandara Halim Perdanakusuma.",
  },
  {
    question: "Apakah melayani perjalanan luar kota?",
    answer:
      "Ya, Vicky Rentcar melayani perjalanan luar kota dan drop-off bersama driver berpengalaman.",
  },
  {
    question: "Berapa kapasitas Hiace Premio?",
    answer:
      "Toyota Hiace Premio memiliki kapasitas 11-14 penumpang dan sesuai untuk perjalanan rombongan.",
  },
  {
    question: "Bagaimana cara reservasi?",
    answer:
      "Kirim kebutuhan perjalanan melalui WhatsApp dengan menyertakan kendaraan, tanggal, waktu, lokasi jemput, tujuan, dan durasi.",
  },
  {
    question: "Bagaimana penawaran harga ditentukan?",
    answer:
      "Penawaran disesuaikan dengan kendaraan dan kebutuhan perjalanan, termasuk jadwal, durasi, rute, dan layanan yang dipilih.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const Route = createFileRoute("/sewa-mobil-jakarta")({
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: `${SITE_URL}/sewa-mobil-jakarta`,
      },
    ],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/sewa-mobil-jakarta` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeSchema(
          buildBreadcrumbSchema([
            { name: "Beranda", url: SITE_URL },
            { name: "Sewa Mobil Jakarta", url: `${SITE_URL}/sewa-mobil-jakarta` },
          ]),
        ),
      },
      { type: "application/ld+json", children: serializeSchema(faqSchema) },
    ],
  }),
  component: SewaMobilJakartaPage,
});

function SewaMobilJakartaPage() {
  const featuredVehicles = FEATURED_SLUGS.map((slug) =>
    VEHICLES.find((vehicle) => vehicle.slug === slug),
  ).filter((vehicle): vehicle is (typeof VEHICLES)[number] => Boolean(vehicle));

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        <section className="relative overflow-hidden py-14 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-112 w-full max-w-176 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)] blur-3xl"
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Rental Mobil Jakarta 24 Jam</p>
              <h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
                Sewa Mobil Jakarta dengan <span className="gold-text">Driver Profesional</span>
              </h1>
              <div className="gold-rule mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sewa mobil dengan driver untuk perjalanan bisnis, keluarga, airport, luar kota, dan
                rombongan. Pilih armada yang sesuai lalu konsultasikan jadwal dan rute Anda melalui
                WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={waLink(
                    `Halo ${SITE.brand}, saya ingin menyewa mobil dengan driver di Jakarta.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Konsultasi via WhatsApp
                </a>
                <a
                  href="#armada-pilihan"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm text-gold transition-colors hover:bg-gold/10"
                >
                  Lihat Pilihan Armada
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="kebutuhan-rental" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Pilih Kebutuhan Rental"
              title="Kendaraan untuk Agenda Anda di Jakarta"
              subtitle="Pilih kebutuhan perjalanan untuk menemukan arah layanan dan armada yang sesuai."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
              {RENTAL_NEEDS.map((need) => {
                const Icon = need.icon;
                return (
                  <StaggerItem key={need.title} direction="scale">
                    <article className="glass h-full rounded-xl border border-gold/15 p-5 transition-colors hover:border-gold/45">
                      <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                      <h2 className="mt-5 text-xl font-normal">{need.title}</h2>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {need.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal>
              <p className="eyebrow">Sewa dengan Driver</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Perjalanan Lebih Praktis di Jakarta</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Fokus layanan kami adalah sewa mobil dengan driver yang ramah dan berpengalaman.
                Anda dapat berkonsentrasi pada agenda bisnis, keluarga, airport, atau perjalanan
                luar kota tanpa perlu mengemudi sendiri.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="armada-pilihan" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Armada Pilihan"
              title="Empat Kendaraan untuk Kebutuhan Utama"
              subtitle="Pilih kendaraan berdasarkan kapasitas, kenyamanan, dan agenda perjalanan Anda."
            />
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2" gap={0.07}>
              {featuredVehicles.map((vehicle) => (
                <StaggerItem key={vehicle.slug}>
                  <article className="glass flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 p-5 transition-all hover:-translate-y-1 hover:border-gold/45">
                    <div className="rounded-lg bg-[radial-gradient(70%_60%_at_50%_60%,color-mix(in_oklab,var(--navy-deep)_80%,transparent),transparent)] p-3">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.name} - ${vehicle.tagline}`}
                        width="680"
                        height="400"
                        loading="lazy"
                        className="h-40 w-full object-contain"
                      />
                    </div>
                    <div className="mt-5 flex flex-1 flex-col">
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                        {vehicle.category}
                      </p>
                      <h2 className="mt-2 text-2xl font-normal">{vehicle.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {vehicle.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gold/15 pt-4 text-xs text-muted-foreground">
                        <span className="flex items-start gap-2">
                          <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {vehicle.capacity}
                        </span>
                        <span className="flex items-start gap-2">
                          <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {vehicle.luggage}
                        </span>
                      </div>
                      <a
                        href={waLink(
                          `Halo ${SITE.brand}, saya ingin menanyakan ketersediaan ${vehicle.name} untuk sewa mobil dengan driver di Jakarta.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        Tanya Ketersediaan
                      </a>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-10 text-center">
              <Link
                to="/armada"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
              >
                Lihat Semua Armada
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Layanan Pendukung"
              title="Dukungan untuk Berbagai Agenda"
              subtitle="Layanan yang tersedia untuk melengkapi kebutuhan perjalanan Anda."
            />
            <Stagger className="mt-10 grid gap-5 md:grid-cols-3" gap={0.07}>
              {SUPPORT_SERVICES.map((service) => (
                <StaggerItem key={service.title}>
                  <article className="glass flex h-full flex-col rounded-xl border border-gold/15 p-6">
                    <h2 className="text-xl font-normal">{service.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <Link
                      to={service.link}
                      className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold hover:underline"
                    >
                      {service.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Trust Operational"
              title="Layanan yang Disiapkan untuk Perjalanan Anda"
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
              {TRUST_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <StaggerItem key={point.title} direction="scale">
                    <article className="h-full rounded-xl border border-gold/15 p-5">
                      <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                      <h2 className="mt-4 text-lg font-normal">{point.title}</h2>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {point.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Cara Booking" title="Reservasi dalam Empat Langkah" />
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
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
            <Accordion
              type="single"
              collapsible
              className="mt-8 rounded-xl border border-gold/15 px-5"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal className="glass rounded-2xl border border-gold/30 p-8 sm:p-12">
              <p className="eyebrow">Reservasi Jakarta</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Siap Menentukan Kendaraan Anda?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Sampaikan kebutuhan perjalanan Anda. Tim Vicky Rentcar akan membantu memilih
                kendaraan dan menyiapkan penawaran yang sesuai.
              </p>
              <a
                href={waLink(
                  `Halo ${SITE.brand}, saya ingin konsultasi dan reservasi sewa mobil dengan driver di Jakarta.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi dan Reservasi via WhatsApp
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
