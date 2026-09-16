import { Link } from "@tanstack/react-router";
import { AppIcon, IconType } from "@/components/BrandIcons";
import { SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";

const services: { iconName: IconType; title: string; desc: string }[] = [
  {
    iconName: "airport",
    title: "Antar Jemput Bandara",
    desc: "Penjemputan tepat waktu di Bandara Soekarno-Hatta & Halim dengan pemantauan jadwal terbang dan supir yang siap membantu bagasi.",
  },
  {
    iconName: "corporate",
    title: "Sewa Mobil Kantor & Bisnis",
    desc: "Sewa harian atau bulanan untuk operasional kantor, kunjungan kerja, dan tamu bisnis dengan invoice resmi.",
  },
  {
    iconName: "wedding",
    title: "Mobil Pernikahan",
    desc: "Unit bersih mengilap, opsi hiasan bunga, dan supir rapi untuk menemani hari bahagia pernikahan Anda.",
  },
  {
    iconName: "hotel",
    title: "Antar Jemput Hotel & Stasiun",
    desc: "Layanan antar jemput hotel, apartemen, atau stasiun di Jakarta dengan jadwal yang fleksibel.",
  },
  {
    iconName: "daily",
    title: "Sewa Harian Dalam Kota",
    desc: "Sewa mobil harian dengan supir ramah, fleksibel untuk agenda keliling Jakarta tanpa ribet memikirkan ganjil-genap.",
  },
  {
    iconName: "out-of-town",
    title: "Perjalanan Luar Kota",
    desc: "Perjalanan santai ke Bandung, Bogor, Semarang, hingga luar kota lainnya bersama supir berpengalaman.",
  },
];

export function Services() {
  return (
    <section id="layanan" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Disiapkan untuk setiap kebutuhan perjalanan di Jakarta"
          subtitle="Layanan rental mobil di Jakarta dengan komitmen kenyamanan, kemudahan reservasi, dan harga transparan."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {services.map((s) => (
            <StaggerItem key={s.title} direction="scale">
              <article className="group glass relative h-full overflow-hidden rounded-xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50">
                <span
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                  <AppIcon name={s.iconName} className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-14 text-center">
          <Link
            to="/layanan"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            <span>Jelajahi Detail Semua Layanan & SOP Kami</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
