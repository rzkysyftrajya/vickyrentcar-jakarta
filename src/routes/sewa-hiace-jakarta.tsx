import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  MapPin,
  Plane,
  Users,
} from "lucide-react";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/BrandIcons";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { SITE, waLink } from "@/lib/site";
import { VEHICLES } from "@/lib/vehicles";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Sewa Hiace Jakarta untuk Rombongan | Toyota Hiace Premio";
const DESCRIPTION =
  "Sewa Toyota Hiace Premio di Jakarta untuk rombongan, wisata, gathering, event, corporate, airport transfer, dan perjalanan luar kota. Konsultasi via WhatsApp.";
const CANONICAL = `${SITE_URL}/sewa-hiace-jakarta`;
const WHATSAPP_MESSAGE = "Halo Vickyrentcarjakarta, saya ingin konsultasi Hiace.";

const GROUP_NEEDS = [
  { title: "Wisata Keluarga", icon: Users },
  { title: "Gathering Kantor", icon: BriefcaseBusiness },
  { title: "Transportasi Event", icon: Users },
  { title: "Kunjungan Lapangan", icon: MapPin },
  { title: "Perjalanan Rombongan", icon: Users },
] as const;

const BOOKING_STEPS = [
  "Sampaikan kebutuhan perjalanan.",
  "Kirim tanggal dan waktu.",
  "Kirim pickup dan tujuan atau rute.",
  "Kirim jumlah penumpang dan kebutuhan lainnya.",
  "Tim mengonfirmasi ketersediaan melalui WhatsApp.",
] as const;

const FAQS = [
  [
    "Berapa kapasitas Toyota Hiace Premio?",
    "Toyota Hiace Premio memiliki kapasitas 11–14 penumpang.",
  ],
  [
    "Apakah Hiace tersedia dengan driver?",
    "Ya, Hiace tersedia untuk layanan perjalanan bersama driver.",
  ],
  [
    "Cocok untuk rombongan berapa orang?",
    "Hiace sesuai untuk rombongan 11–14 penumpang, dengan kebutuhan perjalanan yang dikonfirmasi melalui WhatsApp.",
  ],
  [
    "Apakah bisa untuk airport transfer?",
    "Ya, Hiace dapat digunakan untuk antar jemput rombongan di bandara.",
  ],
  [
    "Apakah bisa untuk wisata dan luar kota?",
    "Ya, data layanan Hiace mencakup wisata Jakarta dan luar kota.",
  ],
  [
    "Apakah bisa untuk corporate, gathering, atau event?",
    "Ya, Hiace tercantum untuk kebutuhan event dan kantor, termasuk gathering.",
  ],
  ["Berapa kapasitas bagasinya?", "Hiace memiliki kapasitas bagasi 8+ koper besar."],
  [
    "Fitur apa saja yang tersedia?",
    "Fitur yang tersedia mencakup automatic, diesel, double blower kabin panjang, LED cabin lighting, audio system, mic, dan kursi reclining.",
  ],
  [
    "Bagaimana cara konsultasi ketersediaan Hiace?",
    "Hubungi Vicky Rentcar melalui WhatsApp dengan pesan konsultasi Hiace.",
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

export const Route = createFileRoute("/sewa-hiace-jakarta")({
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
            { name: "Sewa Hiace Jakarta", url: CANONICAL },
          ]),
        ),
      },
      { type: "application/ld+json", children: serializeSchema(faqSchema) },
    ],
  }),
  component: HiaceJakartaPage,
});

function HiaceJakartaPage() {
  const vehicle = VEHICLES.find((item) => item.slug === "toyota-hiace-premio");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const whatsappUrl = waLink(WHATSAPP_MESSAGE);

  useEffect(() => {
    const normalizeHiaceLinks = () => {
      document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]').forEach((link) => {
        if (link.getAttribute("href") !== CANONICAL) link.remove();
      });

      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((link) => {
        link.href = whatsappUrl;
      });
    };

    normalizeHiaceLinks();
    const observer = new MutationObserver(normalizeHiaceLinks);
    observer.observe(document.head, { childList: true, subtree: true });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    return () => observer.disconnect();
  }, [whatsappUrl]);

  if (!vehicle) return null;

  const specifications = [
    ["Kapasitas", vehicle.capacity],
    ["Bagasi", vehicle.luggage],
    ["Transmisi", vehicle.transmission],
    ["Bahan bakar", vehicle.fuel],
    ["AC", vehicle.ac],
    ["Fitur kabin", vehicle.entertainment],
  ];

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
              <p className="eyebrow">Toyota Hiace Premio Jakarta</p>
              <h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
                Sewa Hiace Jakarta untuk Rombongan
              </h1>
              <div className="gold-rule mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Toyota Hiace Premio untuk wisata, gathering, event, kantor, airport transfer, dan
                perjalanan luar kota bersama rombongan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-(--shadow-gold)"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Konsultasi Hiace via WhatsApp
                </a>
                <a
                  href="#spesifikasi-hiace"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm text-gold hover:bg-gold/10"
                >
                  Lihat Spesifikasi Hiace <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal direction="right" className="glass rounded-2xl border border-gold/20 p-5">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="mx-auto h-56 w-full object-contain sm:h-72"
              />
              <div className="border-t border-gold/15 pt-5 text-center">
                <p className="eyebrow text-gold">{vehicle.category}</p>
                <h2 className="mt-2 text-2xl">{vehicle.name}</h2>
                <Link
                  to="/armada/$slug"
                  params={{ slug: vehicle.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:underline"
                >
                  Lihat detail Hiace Premio <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Kebutuhan Rombongan"
              title="Satu Hiace untuk agenda bersama"
              subtitle="Gunakan Toyota Hiace Premio sesuai kebutuhan rombongan yang tercantum di layanan kami."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
              {GROUP_NEEDS.map(({ title, icon: Icon }) => (
                <StaggerItem key={title} direction="scale">
                  <article className="glass h-full rounded-xl border border-gold/15 p-5">
                    <Icon className="h-6 w-6 text-gold" />
                    <h2 className="mt-5 text-xl font-normal">{title}</h2>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground"
            >
              <WhatsAppIcon className="h-4 w-4" /> Kirim Detail Perjalanan
            </a>
          </div>
        </section>

        <section
          id="spesifikasi-hiace"
          className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-16 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="mx-auto h-64 w-full object-contain sm:h-80"
              />
            </Reveal>
            <Reveal direction="right">
              <p className="eyebrow">{vehicle.category}</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">{vehicle.name}</h2>
              <p className="mt-5 text-muted-foreground">{vehicle.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {specifications.map(([label, value]) => (
                  <div key={label} className="border-b border-gold/15 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-gold">{label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" /> Tanya Ketersediaan Hiace
              </a>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Kenapa Hiace untuk Rombongan"
              title="Spesifikasi yang mengikuti kebutuhan perjalanan"
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <article className="glass rounded-xl border border-gold/15 p-6">
                <Users className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Ruang untuk rombongan</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Kapasitas 11–14 penumpang membantu satu kendaraan membawa rombongan dalam satu
                  perjalanan.
                </p>
              </article>
              <article className="glass rounded-xl border border-gold/15 p-6">
                <Check className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Kabin untuk perjalanan</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Kursi reclining, double blower, dan LED cabin lighting mendukung perjalanan
                  bersama.
                </p>
              </article>
              <article className="glass rounded-xl border border-gold/15 p-6">
                <MapPin className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">Bagasi rombongan</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Kapasitas 8+ koper besar dapat membantu kebutuhan bagasi perjalanan wisata atau
                  event.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-gold/15 bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Layanan Pendukung"
              title="Rute dan kebutuhan yang saling terhubung"
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
                <h3 className="mt-4">Corporate / Kantor</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kebutuhan operasional kantor.</p>
              </Link>
              <Link to="/layanan" className="glass rounded-xl border border-gold/15 p-5">
                <MapPin className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Wisata &amp; Luar Kota</h3>
                <p className="mt-2 text-sm text-muted-foreground">Jelajahi layanan perjalanan.</p>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl border border-gold/15 p-5"
              >
                <Users className="h-6 w-6 text-gold" />
                <h3 className="mt-4">Event / Gathering</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Konsultasikan kebutuhan rombongan.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Cara Booking" title="Lima langkah menuju konsultasi Hiace" />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.06}>
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

        <section className="bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ Hiace" title="Pertanyaan tentang Toyota Hiace Premio" />
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
              <p className="eyebrow">Toyota Hiace Premio Jakarta</p>
              <h2 className="mt-4 text-3xl sm:text-5xl">
                Konsultasi &amp; Reservasi Hiace via WhatsApp
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                Sampaikan kebutuhan rombongan Anda kepada tim Vicky Rentcar.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-(image:--gradient-gold) px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" /> Konsultasi Hiace via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <WhatsAppFab />
      <Footer />
    </div>
  );
}
