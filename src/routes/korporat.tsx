import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  FileText,
  CalendarRange,
  Headphones,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Users,
  Car,
  Send,
  Star,
  BarChart3,
  Handshake,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { VEHICLES } from "@/lib/vehicles";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Layanan Korporat & Fleet Management Jakarta — Vicky Rentcar";
const DESCRIPTION =
  "Solusi transportasi bisnis terpercaya di Jakarta. Sewa armada korporat harian, mingguan, dan bulanan dengan invoice resmi, supir profesional, dan layanan 24/7 untuk perusahaan Anda.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/korporat")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/korporat` },
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
            { name: "Layanan Korporat", url: `${SITE_URL}/korporat` },
          ]),
        ),
      },
    ],
  }),
  component: KorporatPage,
});

// ─── Data ──────────────────────────────────────────────────────────────────────

const CORPORATE_BENEFITS = [
  {
    icon: FileText,
    title: "Invoice & PO Resmi",
    desc: "Penerbitan invoice resmi atas nama perusahaan, termasuk faktur pajak dan purchase order untuk keperluan administrasi korporat.",
  },
  {
    icon: CalendarRange,
    title: "Kontrak Fleksibel",
    desc: "Tersedia paket harian, mingguan, dan bulanan. Kami menyesuaikan durasi kontrak dengan kebutuhan operasional perusahaan Anda.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Manager",
    desc: "Setiap klien korporat mendapatkan satu titik kontak khusus yang siap menangani semua kebutuhan transportasi perusahaan Anda.",
  },
  {
    icon: Globe,
    title: "Supir Berbahasa Inggris",
    desc: "Tersedia supir yang mampu berkomunikasi dalam Bahasa Inggris untuk menjemput tamu internasional, ekspatriat, dan delegasi asing.",
  },
  {
    icon: ShieldCheck,
    title: "Asuransi Komprehensif",
    desc: "Seluruh armada dilindungi asuransi penuh. Laporan perjalanan dan dokumentasi tersedia atas permintaan untuk audit internal.",
  },
  {
    icon: BarChart3,
    title: "Laporan Penggunaan",
    desc: "Laporan pemakaian armada bulanan tersedia dalam format spreadsheet untuk keperluan reimbursement dan kontrol anggaran.",
  },
];

const INDUSTRIES = [
  { emoji: "🏦", name: "Perbankan & Keuangan" },
  { emoji: "🏨", name: "Perhotelan & Hospitality" },
  { emoji: "🏛️", name: "Kedutaan & Konsulat" },
  { emoji: "💊", name: "Farmasi & Healthcare" },
  { emoji: "⚡", name: "Energi & Pertambangan" },
  { emoji: "🏗️", name: "Properti & Konstruksi" },
  { emoji: "📱", name: "Teknologi & Startup" },
  { emoji: "🎬", name: "Media & Entertainment" },
];

const PACKAGES = [
  {
    name: "Paket Harian",
    duration: "Per Hari",
    features: [
      "Sewa 12 Jam atau Full Day",
      "Termasuk supir profesional",
      "Berlaku untuk dalam kota",
      "Invoice harian tersedia",
    ],
    cta: "Pesan Hari Ini",
  },
  {
    name: "Paket Mingguan",
    duration: "Per Minggu (5–7 Hari)",
    highlight: true,
    features: [
      "Harga lebih hemat dari harian",
      "Supir tetap pilihan perusahaan",
      "Monitoring aktivitas armada",
      "Invoice mingguan / PO",
    ],
    cta: "Diskusikan Paket Ini",
  },
  {
    name: "Paket Bulanan",
    duration: "Per Bulan (Kontrak)",
    features: [
      "Dedicated fleet korporat",
      "Supir khusus perusahaan",
      "Laporan pemakaian bulanan",
      "Sistem termin pembayaran",
    ],
    cta: "Hubungi Kami",
  },
];

// ─── Corporate Booking Form ────────────────────────────────────────────────────

function CorporateForm() {
  const [form, setForm] = useState({
    companyName: "",
    picName: "",
    picPhone: "",
    picEmail: "",
    unitCount: "1 Unit",
    vehicle: VEHICLES[0]!.name,
    packageType: "Paket Harian",
    startDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Halo ${SITE.brand}, saya mewakili perusahaan ingin mengajukan kebutuhan armada korporat:`,
      "",
      `🏢 Perusahaan: ${form.companyName}`,
      `👤 PIC: ${form.picName}`,
      `📱 No. HP/WA: ${form.picPhone}`,
      form.picEmail ? `📧 Email: ${form.picEmail}` : "",
      `🚘 Armada: ${form.vehicle}`,
      `🔢 Jumlah Unit: ${form.unitCount}`,
      `📦 Paket: ${form.packageType}`,
      form.startDate ? `📅 Mulai: ${form.startDate}` : "",
      form.notes ? `📝 Catatan: ${form.notes}` : "",
      "",
      "Mohon informasi detail harga dan ketersediaan armada. Terima kasih.",
    ].filter((l) => l !== "");

    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none";
  const select =
    "w-full rounded-lg border border-gold/20 bg-[oklch(0.2_0.035_256.66)] px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none";
  const label = "block text-xs uppercase tracking-wider text-muted-foreground mb-2";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* Company + PIC */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Nama Perusahaan / Instansi *</label>
          <input
            type="text"
            required
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            placeholder="cth. PT. Maju Bersama Indonesia"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Nama PIC *</label>
          <input
            type="text"
            required
            value={form.picName}
            onChange={(e) => setForm({ ...form, picName: e.target.value })}
            placeholder="cth. Ibu Sari / Bapak Denny"
            className={field}
          />
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>No. HP / WhatsApp PIC *</label>
          <input
            type="tel"
            required
            value={form.picPhone}
            onChange={(e) => setForm({ ...form, picPhone: e.target.value })}
            placeholder="cth. 0812 3456 7890"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Email Perusahaan (opsional)</label>
          <input
            type="email"
            value={form.picEmail}
            onChange={(e) => setForm({ ...form, picEmail: e.target.value })}
            placeholder="cth. procurement@perusahaan.com"
            className={field}
          />
        </div>
      </div>

      {/* Vehicle + Count */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Pilihan Armada</label>
          <select
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
            className={select}
          >
            {VEHICLES.map((v) => (
              <option key={v.slug} value={v.name} className="bg-zinc-900 text-white">
                {v.name} — {v.category}
              </option>
            ))}
            <option value="Multi-Unit (Konsultasi)" className="bg-zinc-900 text-white">
              Multi-Unit / Mixed Fleet (Konsultasi)
            </option>
          </select>
        </div>
        <div>
          <label className={label}>Jumlah Unit</label>
          <select
            value={form.unitCount}
            onChange={(e) => setForm({ ...form, unitCount: e.target.value })}
            className={select}
          >
            {["1 Unit", "2 Unit", "3 Unit", "4 Unit", "5 Unit", "6+ Unit (Fleet)"].map((v) => (
              <option key={v} value={v} className="bg-zinc-900 text-white">
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Package + Start Date */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Tipe Paket</label>
          <select
            value={form.packageType}
            onChange={(e) => setForm({ ...form, packageType: e.target.value })}
            className={select}
          >
            <option className="bg-zinc-900 text-white">Paket Harian</option>
            <option className="bg-zinc-900 text-white">Paket Mingguan (5–7 Hari)</option>
            <option className="bg-zinc-900 text-white">Paket Bulanan (Kontrak)</option>
            <option className="bg-zinc-900 text-white">Antar Jemput Tamu Khusus</option>
            <option className="bg-zinc-900 text-white">Event & Gathering Kantor</option>
          </select>
        </div>
        <div>
          <label className={label}>Estimasi Tanggal Mulai</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className={field}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={label}>Kebutuhan Khusus (opsional)</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="cth. Perlu supir berbahasa Inggris, name board tamu, invoice atas nama PT, atau kebutuhan khusus lainnya"
          className={`${field} resize-none`}
        />
      </div>

      <div className="pt-3">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-full bg-[image:var(--gradient-gold)] py-4 text-xs tracking-[0.22em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-[1.02]"
        >
          <Send className="h-4 w-4" />
          <span>Kirim Penawaran ke WhatsApp</span>
        </button>
        <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
          Tim kami akan membalas dalam {"<"} 30 menit pada jam operasional.
        </p>
      </div>
    </form>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

function KorporatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[60rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Solusi Transportasi Bisnis</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Armada Korporat untuk{" "}
                <span className="gold-text">Perusahaan Anda</span>
              </h1>
              <div className="gold-rule mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Dari antar jemput tamu VIP hingga kontrak fleet bulanan — kami menyediakan solusi transportasi korporat yang profesional, fleksibel, dan transparan untuk bisnis di Jakarta.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#form-korporat"
                  className="rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs tracking-[0.22em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.02]"
                >
                  Ajukan Penawaran
                </a>
                <a
                  href={waLink(`Halo ${SITE.brand}, saya dari perusahaan dan ingin menanyakan paket korporat.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-3.5 text-xs tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold/10"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Chat Langsung
                </a>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal className="mt-12 flex flex-wrap gap-4">
              {[
                { icon: FileText, label: "Invoice & Faktur Pajak Resmi" },
                { icon: ShieldCheck, label: "Armada Diasuransikan Penuh" },
                { icon: Headphones, label: "Account Manager Dedicated" },
                { icon: Star, label: "Layanan 24/7" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-gold/20"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[0.65rem] tracking-wider text-foreground">{label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))] border-y border-gold/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Keunggulan Korporat"
              title="Mengapa Memilih Vicky Rentcar untuk Kebutuhan Bisnis?"
              subtitle="Dirancang khusus untuk memenuhi standar operasional dan administrasi perusahaan modern."
            />
            <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CORPORATE_BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <StaggerItem key={b.title} direction="scale">
                    <article className="glass group rounded-xl p-7 h-full transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 relative overflow-hidden">
                      <span
                        aria-hidden="true"
                        className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-lg font-normal text-foreground">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Paket Layanan"
              title="Pilihan Kontrak Sesuai Kebutuhan"
              subtitle="Fleksibel untuk perusahaan dari berbagai skala — mulai sewa satu hari hingga kontrak armada bulanan."
            />
            <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <StaggerItem key={pkg.name} direction="scale">
                  <div
                    className={`glass rounded-2xl p-8 h-full flex flex-col transition-all duration-500 ${
                      pkg.highlight
                        ? "border-gold/50 shadow-[var(--shadow-gold)] bg-gold/[0.04]"
                        : "hover:border-gold/30"
                    }`}
                  >
                    {pkg.highlight && (
                      <span className="inline-block mb-4 self-start rounded-full bg-[image:var(--gradient-gold)] px-4 py-1 text-[0.6rem] tracking-[0.25em] text-primary-foreground uppercase">
                        Paling Populer
                      </span>
                    )}
                    <h3 className={`text-2xl font-light ${pkg.highlight ? "gold-text" : "text-foreground"}`}>
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{pkg.duration}</p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(
                        `Halo ${SITE.brand}, saya ingin mendiskusikan ${pkg.name} untuk kebutuhan korporat perusahaan kami.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-xs tracking-[0.22em] uppercase transition-all hover:scale-[1.02] ${
                        pkg.highlight
                          ? "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)]"
                          : "border border-gold/40 text-gold hover:bg-gold/10"
                      }`}
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      {pkg.cta}
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 border-y border-gold/10 bg-[color-mix(in_oklab,var(--navy)_20%,var(--background))]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Klien Industri"
              title="Industri yang Kami Layani"
              subtitle="Kami telah menjadi mitra transportasi terpercaya bagi perusahaan dari berbagai sektor bisnis di Jakarta."
            />
            <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {INDUSTRIES.map((ind) => (
                <StaggerItem key={ind.name} direction="scale">
                  <div className="glass rounded-xl p-4 text-center border border-gold/10 hover:border-gold/40 transition-colors">
                    <span className="text-2xl block">{ind.emoji}</span>
                    <p className="mt-2 text-[0.6rem] leading-tight text-muted-foreground">{ind.name}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Fleet for corporate */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Armada Tersedia"
              title="Unit Korporat Kami"
              subtitle="Pilihan armada representatif untuk berbagai kebutuhan perjalanan bisnis perusahaan Anda."
            />
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VEHICLES.map((v) => (
                <StaggerItem key={v.slug} direction="scale">
                  <Link
                    to="/armada/$slug"
                    params={{ slug: v.slug }}
                    className="block glass group rounded-xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50"
                  >
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-28 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="mt-4">
                      <p className="font-medium text-sm text-foreground group-hover:gold-text transition-colors">
                        {v.name}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground mt-0.5">{v.category}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[0.6rem] text-muted-foreground">
                        <Users className="h-3 w-3 text-gold" />
                        {v.capacity}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Corporate Form */}
        <section id="form-korporat" className="py-16 border-t border-gold/15">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Form */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="glass rounded-2xl border border-gold/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="border-b border-gold/15 pb-5">
                      <p className="eyebrow text-gold">Formulir Penawaran Korporat</p>
                      <h2 className="mt-1 text-2xl sm:text-3xl font-normal text-foreground">
                        Ajukan Kebutuhan Armada Anda
                      </h2>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Isi form ini dan tim kami akan segera menghubungi Anda dengan penawaran terbaik.
                      </p>
                    </div>
                    <CorporateForm />
                  </div>
                </Reveal>
              </div>

              {/* Side info */}
              <div className="lg:col-span-5 space-y-6">
                <Reveal delay={0.15}>
                  <div className="glass rounded-2xl border border-gold/20 p-6 sm:p-8">
                    <p className="eyebrow text-gold">Proses Kerjasama</p>
                    <h3 className="mt-2 text-xl font-normal text-foreground">
                      Mudah & Cepat dalam 3 Langkah
                    </h3>
                    <div className="mt-6 space-y-5">
                      {[
                        {
                          step: "01",
                          title: "Ajukan Permintaan",
                          desc: "Isi form di samping atau hubungi kami via WhatsApp dengan detail kebutuhan armada.",
                        },
                        {
                          step: "02",
                          title: "Terima Penawaran",
                          desc: "Tim kami mengirimkan penawaran tertulis dengan rincian harga dan kontrak dalam 1×24 jam.",
                        },
                        {
                          step: "03",
                          title: "Armada Siap Bertugas",
                          desc: "Setelah MoU disepakati, armada dan supir langsung siap beroperasi sesuai jadwal.",
                        },
                      ].map(({ step, title, desc }) => (
                        <div key={step} className="flex gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[0.65rem] font-medium text-gold">
                            {step}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-foreground">{title}</p>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="glass rounded-2xl border border-gold/20 p-6">
                    <p className="eyebrow text-gold">Hubungi Langsung</p>
                    <div className="mt-4 space-y-3 text-sm">
                      <a
                        href={waLink(`Halo ${SITE.brand}, saya ingin menanyakan paket korporat untuk perusahaan kami.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-gold/15 bg-white/5 p-4 transition-all hover:border-gold/50 hover:bg-gold/5"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                          <WhatsAppIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground group-hover:text-gold transition-colors">
                            WhatsApp Korporat
                          </p>
                          <p className="text-[0.65rem] text-muted-foreground">{SITE.phone}</p>
                        </div>
                      </a>
                      <a
                        href={`mailto:${SITE.email}?subject=Penawaran%20Armada%20Korporat`}
                        className="group flex items-center gap-3 rounded-xl border border-gold/15 bg-white/5 p-4 transition-all hover:border-gold/50 hover:bg-gold/5"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                          <Handshake className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground group-hover:text-gold transition-colors">
                            Email Korporat
                          </p>
                          <p className="text-[0.65rem] text-muted-foreground">{SITE.email}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
