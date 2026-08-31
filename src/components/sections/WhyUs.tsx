import { BadgeCheck, Briefcase, Clock, Plane, Sparkles, UserCheck, ShieldCheck, Route, ThumbsUp } from "lucide-react";
import { SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";

const reasons = [
  { icon: UserCheck, title: "Driver Ramah & Sopan", desc: "Berpengalaman, santun, dan hafal rute jalanan Jakarta." },
  { icon: Sparkles, title: "Mobil Bersih & Segar", desc: "Pembersihan dan pengecekan AC menyeluruh sebelum setiap trip." },
  { icon: Clock, title: "Layanan 24 Jam", desc: "Siap melayani penjemputan dan reservasi kapan pun Anda butuhkan." },
  { icon: Plane, title: "Antar Jemput Bandara", desc: "Penjemputan tepat waktu di Bandara Soekarno-Hatta & Halim." },
  { icon: Briefcase, title: "Dukungan Kantor & Acara", desc: "Tersedia sewa harian untuk agenda bisnis, keluarga, atau pernikahan." },
  { icon: BadgeCheck, title: "Santai & Fleksibel", desc: "Perjalanan bebas stres, rute fleksibel, tanpa syarat berbelit." },
];

const highlights = [
  { title: "24/7", label: "Layanan Siaga", desc: "Siap antar-jemput kapan saja di Jakarta" },
  { title: "Bebas Macet", label: "Paham Rute", desc: "Driver hafal jalur alternatif & ganjil-genap" },
  { title: "100%", label: "Kabin Bersih", desc: "Mobil wangi, AC dingin & terawat prima" },
  { title: "Transparan", label: "Harga Jelas", desc: "Tanpa biaya tersembunyi, sewa lebih tenang" },
];

export function WhyUs() {
  return (
    <section
      id="keunggulan"
      className="bg-[color-mix(in_oklab,var(--navy)_28%,var(--background))] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Keunggulan Kami" title="Perjalanan Nyaman Tanpa Ribet di Jakarta" />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group flex h-full items-start gap-5 rounded-xl border border-gold/15 p-6 transition-all duration-500 hover:border-gold/45 hover:bg-gold/5">
                <r.icon className="mt-1 h-6 w-6 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-0.5" />
                <div>
                  <h3 className="text-xl">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-20 grid gap-6 border-t border-gold/15 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <StaggerItem key={h.label} direction="scale" className="text-center glass rounded-xl p-6 border border-gold/15">
              <p className="font-display text-3xl sm:text-4xl gold-text">{h.title}</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                {h.label}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {h.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
