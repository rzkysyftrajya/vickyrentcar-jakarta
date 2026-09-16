import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Car,
  CheckCircle2,
  Sparkles,
  Building2,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { SITE, waLink } from "@/lib/site";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Tentang Kami — Vicky Rentcar Jakarta | Rental Mobil Nyaman & Terpercaya";
const DESCRIPTION =
  "Profil PT. Vicky Rental Nusantara. Penyedia layanan rental mobil Jakarta dengan Toyota Alphard, Innova Zenix, Reborn, dan Hiace Premio yang bersih, terawat, dan supir ramah.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/tentang-kami")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/tentang-kami` },
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
            { name: "Tentang Kami", url: `${SITE_URL}/tentang-kami` },
          ]),
        ),
      },
    ],
  }),
  component: TentangKamiPage,
});


const CORE_VALUES = [
  {
    icon: Clock,
    title: "Penjemputan Tepat Waktu",
    desc: "Supir kami selalu tiba di titik penjemputan lebih awal agar agenda Anda di Jakarta berjalan lancar dan tenang tanpa terburu-buru.",
  },
  {
    icon: ShieldCheck,
    title: "Kenyamanan & Privasi",
    desc: "Seluruh supir kami santun, ramah, dan menghormati privasi Anda selama di dalam perjalanan.",
  },
  {
    icon: Sparkles,
    title: "Kabin Bersih & Bebas Asap",
    desc: "Setiap armada dibersihkan secara rutin sebelum bertugas. Kami menjamin kabin yang segar, AC dingin, dan bebas dari bau rokok.",
  },
  {
    icon: Award,
    title: "Fasilitas Pendukung Perjalanan",
    desc: "Menyediakan air mineral, permen, tisu basah, payung, dan colokan charger smartphone di setiap unit kendaraan.",
  },
  {
    icon: Users,
    title: "Driver Ramah & Paham Rute",
    desc: "Supir berpengalaman, berpakaian rapi, santun, serta menguasai jalur alternatif dan aturan ganjil-genap Jakarta.",
  },
  {
    icon: Building2,
    title: "Legalitas & Kredibilitas Usaha",
    desc: "Berbadan hukum resmi PT. Vicky Rental Nusantara dengan invoice resmi dan NPWP untuk kemudahan administrasi kantor.",
  },
];

const SOP_POINTS = [
  {
    title: "Pengecekan Kendaraan",
    desc: "Pengecekan rem, ban, oli, tekanan AC, kelistrikan, dan kebersihan sebelum armada berangkat menjemput Anda.",
  },
  {
    title: "Supir Berpenampilan Rapi & Santun",
    desc: "Driver mengenakan pakaian rapi, wangi, bertutur kata sopan, dan siap membantu membawa barang bawaan Anda.",
  },
  {
    title: "Pantauan Jadwal Bandara",
    desc: "Untuk penjemputan di Bandara Soetta & Halim, tim kami memantau status pesawat agar tetap siaga saat Anda mendarat.",
  },
  {
    title: "Unit Cadangan Siaga",
    desc: "Kesiapan unit cadangan pengganti jika terjadi kendala teknis tak terduga, memastikan agenda Anda tidak terganggu.",
  },
];

const HIGHLIGHTS = [
  { value: "24 Jam", label: "Layanan Siaga", desc: "Siap melayani penjemputan kapan saja di Jakarta" },
  { value: "Jabodetabek", label: "Area Jangkauan", desc: "Rute dalam kota, luar kota & bandara" },
  { value: "100%", label: "Kabin Bersih & Wangi", desc: "Selalu dibersihkan sebelum bertugas" },
  { value: "Transparan", label: "Harga Jelas", desc: "Tanpa biaya tersembunyi & tanpa ribet" },
];

function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[28rem] w-[50rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_70%)] blur-3xl pointer-events-none"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="eyebrow">Tentang Vicky Rentcar</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Rental Mobil Jakarta yang <span className="gold-text">Santai & Terpercaya</span>
              </h1>
              <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {SITE.company} hadir memberikan kemudahan transportasi di ibu kota dengan armada yang bersih, supir ramah yang paham jalanan Jakarta, dan proses sewa yang praktis.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story / About Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <p className="eyebrow">Komitmen Kami</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  Lebih dari Sekadar Rental Mobil, Kami Mitra Perjalanan Anda di Jakarta
                </h2>
                <div className="mt-6 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Vicky Rentcar Jakarta hadir untuk membuat mobilitas Anda di ibu kota terasa lebih santai, nyaman, dan bebas ribet. Kami menyediakan pilihan mobil favorit seperti Toyota Alphard, Innova Zenix, Innova Reborn, dan Hiace Premio yang selalu dalam kondisi prima.
                  </p>
                  <p>
                    Kami tahu betul bahwa jalanan Jakarta punya dinamikanya sendiri. Karena itu, supir kami tidak hanya ramah dan sopan, tetapi juga menguasai rute-rute jalan tikus alternatif dan aturan ganjil-genap agar perjalanan Anda tetap efisien dan bebas stres.
                  </p>
                  <p>
                    Dengan lokasi pool strategis dekat Bandara Soekarno-Hatta serta area Jakarta Selatan, tim kami siap melayani kebutuhan antar jemput bandara, kegiatan kantor, jalan-jalan keluarga, maupun perjalanan luar kota selama 24 jam setiap hari.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/armada"
                    className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                  >
                    <span>Lihat Pilihan Armada</span>
                    <span>&rarr;</span>
                  </Link>
                  <Link
                    to="/kontak"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-xs tracking-[0.2em] text-gold uppercase hover:bg-gold/10 transition-colors"
                  >
                    <span>Hubungi Tim Kami</span>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass relative overflow-hidden rounded-2xl p-8 sm:p-10 border border-gold/20">
                  <div className="space-y-6">
                    <div className="border-b border-gold/15 pb-5">
                      <p className="eyebrow text-gold">Visi Kami</p>
                      <p className="mt-2 text-base text-foreground font-light leading-relaxed">
                        Menjadi penyedia jasa rental mobil pilihan utama di Jakarta yang dikenal karena kebersihan unit, keramahan supir, kemudahan pemesanan, dan kenyamanan perjalanan.
                      </p>
                    </div>

                    <div className="border-b border-gold/15 pb-5">
                      <p className="eyebrow text-gold">Misi Kami</p>
                      <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                          <span>Menyediakan armada mobil terawat yang selalu bersih, wangi, dan ber-AC dingin.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                          <span>Menghadirkan supir ramah, sopan, dan menguasai jalanan Jakarta serta rute ganjil-genap.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                          <span>Memberikan layanan pemesanan yang cepat, transparan, dan responsif 24 jam.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="eyebrow text-gold">Legalitas & Kredibilitas</p>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        Terdaftar resmi di Kemenkumham RI atas nama <strong>PT. Vicky Rental Nusantara</strong>. Mendukung penerbitan invoice resmi untuk kebutuhan kantor dan instansi.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 sm:py-20 bg-[color-mix(in_oklab,var(--navy)_30%,var(--background))] border-y border-gold/15">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HIGHLIGHTS.map((s) => (
                <StaggerItem key={s.label} className="text-center glass rounded-xl p-6 border border-gold/15">
                  <p className="font-display text-3xl sm:text-4xl gold-text">{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Nilai Pelayanan Kami"
              title="Prinsip Pelayanan yang Kami Junjung Tinggi"
              subtitle="Setiap perjalanan dirancang agar Anda merasa nyaman, tenang, dan menikmati waktu di Jakarta."
            />

            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
              {CORE_VALUES.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="glass group h-full rounded-xl p-8 border border-gold/15 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50">
                    <item.icon className="h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mt-5 text-xl font-normal text-foreground">{item.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* SOP & Standards Section */}
        <section className="py-20 bg-[color-mix(in_oklab,var(--navy)_25%,var(--background))]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow">Standar Operasional</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl">
                    Bagaimana Kami Menjaga Kualitas & Kenyamanan
                  </h2>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Setiap unit kendaraan diperiksa dan disiapkan dengan cermat sebelum berangkat menjemput Anda, sehingga perjalanan Anda selalu lancar dan menyenangkan.
                  </p>
                  <div className="mt-8">
                    <a
                      href={waLink(`Halo ${SITE.brand}, saya ingin konsultasi sewa mobil.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span>Konsultasi via WhatsApp</span>
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
                  {SOP_POINTS.map((sop, idx) => (
                    <StaggerItem key={sop.title}>
                      <div className="glass rounded-xl p-6 border border-gold/15 h-full">
                        <span className="font-display text-2xl gold-text">0{idx + 1}</span>
                        <h3 className="mt-3 text-lg font-normal text-foreground">{sop.title}</h3>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                          {sop.desc}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
            <Reveal className="glass rounded-2xl p-10 sm:p-14 border border-gold/30">
              <p className="eyebrow">Mulai Perjalanan Anda</p>
              <h2 className="mt-4 text-3xl sm:text-5xl">
                Nikmati Perjalanan Santai & Nyaman Bersama Kami
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-muted-foreground">
                Hubungi tim reservasi kami via WhatsApp untuk mendapatkan informasi ketersediaan armada dan penawaran terbaik di Jakarta.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={waLink(`Halo ${SITE.brand}, saya ingin menanyakan reservasi mobil.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs tracking-[0.2em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>WhatsApp Reservasi 24 Jam</span>
                </a>
                <Link
                  to="/kontak"
                  className="rounded-full border border-gold/40 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase hover:bg-gold/10 transition-colors"
                >
                  Lihat Info Kontak
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

