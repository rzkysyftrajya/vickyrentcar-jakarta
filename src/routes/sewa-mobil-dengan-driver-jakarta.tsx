import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Check, MapPin, Plane, Users } from "lucide-react";
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
import { VEHICLES } from "@/lib/vehicles";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Sewa Mobil Jakarta dengan Driver | Vicky Rentcar";
const DESCRIPTION =
  "Pilihan mobil dengan driver untuk kebutuhan bandara, kantor, keluarga, perjalanan luar kota, dan rombongan. Sampaikan jadwal, rute, dan kebutuhan perjalanan Anda melalui WhatsApp untuk mendapatkan pilihan armada yang sesuai.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const FEATURED_VEHICLES = [
  "toyota-innova-zenix",
  "toyota-innova-reborn",
  "toyota-alphard",
  "toyota-voxy",
  "toyota-hiace-premio",
] as const;

const JOURNEY_NEEDS = [
  {
    title: "Bandara",
    description: "Antar jemput Soekarno-Hatta atau Halim dengan bantuan perjalanan yang sesuai kebutuhan.",
    icon: Plane,
  },
  {
    title: "Bisnis & Kantor",
    description: "Operasional kantor, kunjungan kerja, tamu bisnis, dan kebutuhan invoice corporate.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Keluarga & Harian",
    description: "Perjalanan harian, city tour, dan mobilitas keluarga dengan kabin yang nyaman.",
    icon: Users,
  },
  {
    title: "Luar Kota & Drop-Off",
    description: "Rute luar kota dan drop-off bersama driver untuk perjalanan yang lebih praktis.",
    icon: MapPin,
  },
  {
    title: "Rombongan",
    description: "Hiace Premio untuk gathering, event, keluarga besar, dan kunjungan lapangan.",
    icon: Users,
  },
] as const;

const DRIVER_STEPS = [
  "Sampaikan tanggal, waktu, lokasi penjemputan, tujuan atau rute, durasi perjalanan, jumlah penumpang, dan kebutuhan bagasi bila relevan.",
  "Pilih kendaraan yang sesuai dengan kapasitas penumpang, bagasi, dan agenda perjalanan.",
  "Tim mengonfirmasi ketersediaan armada dan detail kebutuhan melalui WhatsApp.",
  "Reservasi dikonfirmasi melalui WhatsApp sesuai detail perjalanan yang disepakati.",
] as const;

const SUPPORT_SERVICES = [
  "Bandara Soekarno-Hatta dan Halim",
  "Flight monitoring dan bantuan bagasi",
  "Kebutuhan bisnis dan kantor",
  "Invoice resmi corporate",
  "Perjalanan luar kota dan drop-off",
  "Rombongan dengan Toyota Hiace Premio",
] as const;

const FAQS = [
  {
    question: "Apakah sewa mobil sudah termasuk driver?",
    answer: "Ya. Fokus layanan Vicky Rentcar adalah sewa mobil dengan driver untuk kebutuhan perjalanan di Jakarta dan sekitarnya.",
  },
  {
    question: "Apakah bisa antar jemput bandara?",
    answer: "Ya, tersedia layanan antar jemput bandara dengan kebutuhan perjalanan yang dikonfirmasi melalui WhatsApp.",
  },
  {
    question: "Apakah melayani Soekarno-Hatta dan Halim?",
    answer: "Ya, layanan tersedia di Bandara Soekarno-Hatta Terminal 1, 2, dan 3 serta Bandara Halim Perdanakusuma.",
  },
  {
    question: "Apakah bisa untuk perjalanan luar kota?",
    answer: "Ya, Vicky Rentcar melayani perjalanan luar kota dan drop-off bersama driver.",
  },
  {
    question: "Mobil apa yang cocok untuk keluarga?",
    answer: "Toyota Innova Zenix cocok untuk keluarga dan perjalanan harian. Toyota Alphard tersedia untuk kebutuhan dengan kabin executive.",
  },
  {
    question: "Mobil apa yang cocok untuk rombongan?",
    answer: "Toyota Hiace Premio memiliki kapasitas 11–14 penumpang dan sesuai untuk perjalanan rombongan.",
  },
  {
    question: "Informasi apa yang perlu dikirim saat reservasi?",
    answer: "Kirim tanggal, waktu, lokasi penjemputan, tujuan atau rute, durasi perjalanan, jumlah penumpang, dan kebutuhan bagasi bila relevan.",
  },
  {
    question: "Apakah tersedia layanan corporate atau invoice?",
    answer: "Ya, tersedia kebutuhan operasional kantor, tamu bisnis, kunjungan kerja, dan invoice resmi corporate.",
  },
  {
    question: "Apakah reservasi bisa dilakukan melalui WhatsApp?",
    answer: "Ya, sampaikan detail perjalanan melalui WhatsApp untuk konfirmasi ketersediaan armada dan reservasi.",
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

export const Route = createFileRoute("/sewa-mobil-dengan-driver-jakarta")({
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: "https://www.vickyrentcarjakarta.com/sewa-mobil-dengan-driver-jakarta",
      },
    ],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.vickyrentcarjakarta.com/sewa-mobil-dengan-driver-jakarta" },
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
            {
              name: "Sewa Mobil Jakarta dengan Driver",
              url: "https://www.vickyrentcarjakarta.com/sewa-mobil-dengan-driver-jakarta",
            },
          ]),
        ),
      },
      { type: "application/ld+json", children: serializeSchema(faqSchema) },
    ],
  }),
  component: DriverJakartaPage,
});

function DriverJakartaPage() {
  const featuredVehicles = FEATURED_VEHICLES.map((slug) =>
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
              <p className="eyebrow">Mobil + Driver Jakarta</p>
              <h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
                Sewa Mobil Jakarta dengan Driver
              </h1>
              <div className="gold-rule mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Pilih mobil dengan driver untuk bandara, bisnis, keluarga, perjalanan luar kota,
                atau rombongan. Kirim detail perjalanan melalui WhatsApp agar tim dapat membantu
                menyesuaikan kendaraan dengan kebutuhan Anda.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={waLink(`Halo ${SITE.brand}, saya ingin menyewa mobil dengan driver di Jakarta.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Konsultasi &amp; Reservasi via WhatsApp
                </a>
                <a
                  href="#armada-pilihan"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm text-gold transition-colors hover:bg-gold/10"
                >
                  Pilih Kendaraan
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="kebutuhan-perjalanan" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Kebutuhan Perjalanan"
              title="Pilih kebutuhan mobil + driver Anda"
              subtitle="Armada dan perjalanan dapat disesuaikan dengan agenda Anda."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
              {JOURNEY_NEEDS.map((need) => {
                const Icon = need.icon;
                return (
                  <StaggerItem key={need.title} direction="scale">
                    <article className="glass h-full rounded-xl border border-gold/15 p-5 transition-colors hover:border-gold/45">
                      <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                      <h2 className="mt-5 text-xl font-normal">{need.title}</h2>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{need.description}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Cara Kerja Mobil + Driver"
              title="Kirim detail perjalanan, lalu pilih kendaraan"
              subtitle="Informasi yang membantu tim menyesuaikan armada dan kebutuhan perjalanan."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
              {DRIVER_STEPS.map((step, index) => (
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

        <section id="armada-pilihan" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Armada untuk Driver Service"
              title="Armada untuk Perjalanan dengan Driver"
              subtitle="Pilih kendaraan berdasarkan kapasitas, kabin, bagasi, dan agenda perjalanan."
            />
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
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
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">{vehicle.category}</p>
                      <h2 className="mt-2 text-2xl font-normal">{vehicle.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{vehicle.description}</p>
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
                      <div className="mt-6 flex flex-col gap-3">
                        <a
                          href={waLink(
                            `Halo ${SITE.brand}, saya ingin menanyakan ketersediaan ${vehicle.name} untuk sewa mobil dengan driver di Jakarta.`,
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" />
                          Tanya Ketersediaan
                        </a>
                        <Link
                          to={`/armada/${vehicle.slug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
                        >
                          Lihat Detail Armada
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Dukungan Perjalanan"
              title="Dukungan untuk kebutuhan mobil + driver"
              subtitle="Layanan yang relevan untuk membantu perjalanan Anda."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
              {SUPPORT_SERVICES.map((service) => (
                <StaggerItem key={service}>
                  <article className="glass flex h-full items-start gap-3 rounded-xl border border-gold/15 p-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{service}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ Driver" title="Pertanyaan tentang mobil dengan driver" />
            <Accordion type="single" collapsible className="mt-8 rounded-xl border border-gold/15 px-5">
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
              <p className="eyebrow">Reservasi Mobil + Driver</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Siap Mengatur Perjalanan dengan Driver?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Kirim tanggal, waktu, lokasi pickup, tujuan atau rute, jumlah penumpang, dan
                kebutuhan kendaraan melalui WhatsApp.
              </p>
              <a
                href={waLink(
                  `Halo ${SITE.brand}, saya ingin konsultasi dan reservasi sewa mobil dengan driver di Jakarta. Tanggal: , waktu: , pickup: , tujuan/rute: , jumlah penumpang: , kebutuhan kendaraan: `,
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold) transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi &amp; Reservasi via WhatsApp
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
