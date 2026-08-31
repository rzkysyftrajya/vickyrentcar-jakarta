import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  Send,
  Calendar,
  Car,
  Map,
  User,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";
import { SITE, waLink, createBookingWaLink } from "@/lib/site";
import { VEHICLES } from "@/lib/vehicles";
import { SITE_URL, serializeSchema, buildBreadcrumbSchema } from "@/lib/schema";

const TITLE = "Kontak & Reservasi 24 Jam — Vicky Rentcar Jakarta";
const DESCRIPTION =
  "Hubungi reservasi Vicky Rentcar Jakarta. Fast response via WhatsApp 24 jam untuk sewa Alphard, Innova Zenix, Reborn, dan Hiace Premio di Jabodetabek.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/kontak` },
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
            { name: "Kontak & Reservasi", url: `${SITE_URL}/kontak` },
          ]),
        ),
      },
    ],
  }),
  component: KontakPage,
});


const SERVICES_OPTIONS = [
  "Airport Transfer VIP (Soekarno-Hatta / Halim)",
  "Sewa Harian Dalam Kota (12 Jam)",
  "Sewa Full Day All-In (BBM + Tol + Parkir)",
  "Corporate & Executive Chauffeur",
  "Wedding Car (Mobil Pengantin)",
  "Perjalanan Luar Kota (Drop-Off / Roundtrip)",
  "Transportasi Rombongan (Hiace Premio)",
];

const SERVICE_AREAS = [
  "Jakarta Selatan (SCBD, Senayan, Kuningan, TB Simatupang, Pondok Indah)",
  "Jakarta Pusat (Thamrin, Sudirman, Menteng, Monas, Kemayoran)",
  "Jakarta Barat (Kebon Jeruk, Puri Indah, Slipi, Tomang)",
  "Jakarta Utara (Kelapa Gading, PIK 1 & PIK 2, Pluit, Sunter)",
  "Jakarta Timur (Cawang, Rawamangun, Cibubur)",
  "Tangerang & BSD City (Alam Sutera, Gading Serpong, Karawaci)",
  "Bandara Soekarno-Hatta (Terminal 1, 2, 3) & Bandara Halim Perdanakusuma",
  "Bekasi, Depok, Bogor & Sentul",
];

function KontakPage() {
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    service: SERVICES_OPTIONS[0],
    vehicle: VEHICLES[0].name,
    pickupDate: "",
    pickupTime: "08:00",
    duration: "12 Jam",
    pickupLocation: "",
    destination: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const link = createBookingWaLink({
      userName: formData.userName || "Pelanggan Vicky Rentcar",
      service: formData.service,
      vehicle: formData.vehicle,
      pickupDate: formData.pickupDate || "Sesuai konfirmasi",
      pickupTime: formData.pickupTime,
      duration: formData.duration,
      pickupLocation: formData.pickupLocation || "Jakarta",
      destination: formData.destination || "Dalam Kota Jakarta",
      notes: formData.notes,
    });

    window.open(link, "_blank", "noopener,noreferrer");
  };

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
              <p className="eyebrow">Reservasi & Konsultasi 24 Jam</p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-light leading-tight">
                Hubungi Kami & <span className="gold-text">Pesan Armada Anda</span>
              </h1>
              <div className="gold-rule mx-auto mt-6 w-24" aria-hidden="true" />
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Tim reservasi kami siaga 24/7 untuk memastikan penjemputan Anda berjalan tepat waktu dan tanpa kendala. Isi formulir di bawah atau hubungi hotline kami langsung.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form & Direct Contact Section */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Interactive Booking Form */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="glass rounded-2xl border border-gold/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="border-b border-gold/15 pb-5">
                      <p className="eyebrow text-gold">Formulir Pemesanan Cepat</p>
                      <h2 className="mt-1 text-2xl sm:text-3xl font-normal text-foreground">
                        Detail Rencana Perjalanan
                      </h2>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Isi form ini untuk membuat pesan reservasi WhatsApp otomatis yang rapi dan terstruktur.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      {/* Name & Phone */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Nama Lengkap / Instansi
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={formData.userName}
                              onChange={(e) =>
                                setFormData({ ...formData, userName: e.target.value })
                              }
                              placeholder="cth. Bapak Hendra / PT. Sukses Jaya"
                              className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Nomor WhatsApp / HP
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.userPhone}
                            onChange={(e) =>
                              setFormData({ ...formData, userPhone: e.target.value })
                            }
                            placeholder="cth. 0812 3456 7890"
                            className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Service & Vehicle */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Pilihan Layanan
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) =>
                              setFormData({ ...formData, service: e.target.value })
                            }
                            className="w-full rounded-lg border border-gold/20 bg-[oklch(0.2_0.035_256.66)] px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                          >
                            {SERVICES_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-zinc-900 text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Pilihan Armada
                          </label>
                          <select
                            value={formData.vehicle}
                            onChange={(e) =>
                              setFormData({ ...formData, vehicle: e.target.value })
                            }
                            className="w-full rounded-lg border border-gold/20 bg-[oklch(0.2_0.035_256.66)] px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                          >
                            {VEHICLES.map((v) => (
                              <option key={v.slug} value={v.name} className="bg-zinc-900 text-white">
                                {v.name} ({v.category})
                              </option>
                            ))}
                            <option value="Konsultasi Rekomendasi Unit Terbaik" className="bg-zinc-900 text-white">
                              Konsultasi Unit Terbaik
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Date, Time & Duration */}
                      <div className="grid gap-5 sm:grid-cols-3">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Tanggal Jemput
                          </label>
                          <input
                            type="date"
                            value={formData.pickupDate}
                            onChange={(e) =>
                              setFormData({ ...formData, pickupDate: e.target.value })
                            }
                            className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Jam Penjemputan
                          </label>
                          <input
                            type="time"
                            value={formData.pickupTime}
                            onChange={(e) =>
                              setFormData({ ...formData, pickupTime: e.target.value })
                            }
                            className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Durasi Sewa
                          </label>
                          <select
                            value={formData.duration}
                            onChange={(e) =>
                              setFormData({ ...formData, duration: e.target.value })
                            }
                            className="w-full rounded-lg border border-gold/20 bg-[oklch(0.2_0.035_256.66)] px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                          >
                            <option value="Drop-Off / Pick-Up" className="bg-zinc-900 text-white">Drop-Off / Pick-Up</option>
                            <option value="12 Jam" className="bg-zinc-900 text-white">12 Jam</option>
                            <option value="18 Jam" className="bg-zinc-900 text-white">18 Jam</option>
                            <option value="Full Day (24 Jam)" className="bg-zinc-900 text-white">Full Day (24 Jam)</option>
                            <option value="Multi-Hari / Kontrak Mingguan" className="bg-zinc-900 text-white">Multi-Hari</option>
                          </select>
                        </div>
                      </div>

                      {/* Locations */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Titik / Lokasi Jemput
                          </label>
                          <input
                            type="text"
                            value={formData.pickupLocation}
                            onChange={(e) =>
                              setFormData({ ...formData, pickupLocation: e.target.value })
                            }
                            placeholder="cth. Bandara Soetta T3 / Hotel Mulia Senayan"
                            className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            Tujuan / Rute Agenda
                          </label>
                          <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) =>
                              setFormData({ ...formData, destination: e.target.value })
                            }
                            placeholder="cth. Keliling SCBD - Sudirman / Drop Bandung"
                            className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          Catatan Tambahan (Opsional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="cth. Mohon name board nama tamu, driver berbahasa Inggris, penerbitan invoice resmi atas nama PT"
                          className="w-full rounded-lg border border-gold/20 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none resize-none"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="pt-3">
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-3 rounded-full bg-[image:var(--gradient-gold)] py-4 text-xs tracking-[0.22em] font-medium text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-[1.02]"
                        >
                          <Send className="h-4 w-4" />
                          <span>Kirim Reservasi ke WhatsApp (Fast Response)</span>
                        </button>
                        <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
                          Form ini akan membuka aplikasi WhatsApp Anda dengan format pemesanan yang siap dikirim langsung ke admin.
                        </p>
                      </div>
                    </form>
                  </div>
                </Reveal>
              </div>

              {/* Direct Contact Cards & Operations */}
              <div className="lg:col-span-5 space-y-6">
                <Reveal delay={0.15}>
                  <div className="glass rounded-2xl border border-gold/20 p-6 sm:p-8">
                    <p className="eyebrow text-gold">Hotline & Customer Service</p>
                    <h3 className="mt-2 text-2xl font-normal text-foreground">
                      Saluran Komunikasi Resmi
                    </h3>

                    <div className="mt-6 space-y-5 text-sm">
                      <a
                        href={waLink(`Halo ${SITE.brand}, saya ingin menanyakan reservasi mobil.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-4 rounded-xl border border-gold/15 bg-white/5 p-4 transition-all hover:border-gold/50 hover:bg-gold/5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                          <WhatsAppIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-gold transition-colors">
                            WhatsApp 24 Jam
                          </p>
                          <p className="text-xs text-muted-foreground">{SITE.phone}</p>
                          <span className="mt-1 inline-block text-[0.65rem] text-gold">
                            Respon Cepat & Tanggap &rarr;
                          </span>
                        </div>
                      </a>

                      <a
                        href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                        className="group flex items-start gap-4 rounded-xl border border-gold/15 bg-white/5 p-4 transition-all hover:border-gold/50 hover:bg-gold/5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-gold transition-colors">
                            Telepon Langsung
                          </p>
                          <p className="text-xs text-muted-foreground">{SITE.phone}</p>
                          <span className="mt-1 inline-block text-[0.65rem] text-muted-foreground">
                            Hotline Darurat & Reservasi
                          </span>
                        </div>
                      </a>

                      <div className="flex items-start gap-4 rounded-xl border border-gold/15 bg-white/5 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Email Korespondensi</p>
                          <p className="text-xs text-muted-foreground">{SITE.email}</p>
                          <span className="mt-1 inline-block text-[0.65rem] text-muted-foreground">
                            Untuk penawaran korporat & PO resmi
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 rounded-xl border border-gold/15 bg-white/5 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Jam Layanan</p>
                          <p className="text-xs text-muted-foreground">{SITE.hours}</p>
                          <span className="mt-1 inline-block text-[0.65rem] text-gold">
                            Siap melayani penjemputan tengah malam & dini hari
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Pool & Office Address */}
                <Reveal delay={0.25}>
                  <div className="glass rounded-2xl border border-gold/20 p-6 sm:p-8">
                    <p className="eyebrow text-gold">Alamat Kantor & Pool</p>
                    <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                        <div>
                          <strong className="text-foreground block">Head Office:</strong>
                          <span>{SITE.address}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pt-2 border-t border-gold/10">
                        <Building className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                        <div>
                          <strong className="text-foreground block">Lokasi Pool Siaga:</strong>
                          <span>{SITE.poolAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage Areas */}
        <section className="py-16 bg-[color-mix(in_oklab,var(--navy)_30%,var(--background))] border-y border-gold/15">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Jangkauan Operasional"
              title="Area Layanan Penjemputan di Seluruh Jabodetabek"
              subtitle="Armada kami menjangkau seluruh kawasan hunian eksklusif, pusat bisnis, hotel bintang lima, dan bandara."
            />

            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_AREAS.map((area) => (
                <StaggerItem key={area}>
                  <div className="glass rounded-xl p-5 border border-gold/15 h-full flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                    <span className="text-xs text-foreground/90 leading-relaxed">{area}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Payment & Security Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="glass rounded-2xl p-8 sm:p-12 border border-gold/20">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex items-start gap-4">
                  <CreditCard className="h-8 w-8 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-normal text-foreground">Metode Pembayaran Fleksibel</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      Menerima transfer Bank BCA, Mandiri, BNI, QRIS, serta sistem termin/invoice khusus korporasi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-normal text-foreground">Transparansi Harga 100%</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      Rincian biaya jelas tanpa biaya tersembunyi. Invoice dan bukti transaksi diterbitkan secara resmi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageSquare className="h-8 w-8 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-normal text-foreground">Konfirmasi Instan 24/7</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      Pemesanan Anda langsung diproses oleh petugas operasional yang ramah dan sigap dalam hitungan menit.
                    </p>
                  </div>
                </div>
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

