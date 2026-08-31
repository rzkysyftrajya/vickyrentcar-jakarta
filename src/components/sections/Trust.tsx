import { Building2, Headphones, Plane, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { SectionHeading, Stagger, StaggerItem } from "@/components/Reveal";

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Driver Ramah & Berpengalaman",
    desc: "Santun, rapi, dan menguasai jalanan serta rute ganjil-genap Jakarta.",
  },
  {
    icon: Sparkles,
    title: "Unit Bersih & AC Dingin",
    desc: "Kabin selalu dibersihkan dan dipastikan wangi sebelum menjemput Anda.",
  },
  {
    icon: Plane,
    title: "Antar Jemput Bandara",
    desc: "Siap jemput di Bandara Soetta & Halim tepat waktu sesuai jam mendarat.",
  },
  {
    icon: Building2,
    title: "Kebutuhan Kantor & Keluarga",
    desc: "Pilihan sewa fleksibel untuk urusan dinas, kunjungan kerja, atau liburan keluarga.",
  },
  {
    icon: Headphones,
    title: "Respon WhatsApp Cepat",
    desc: "Pemesanan simpel dan admin ramah siap membantu kebutuhan armada Anda.",
  },
  {
    icon: Clock,
    title: "Siap Melayani 24 Jam",
    desc: "Penjemputan kapan pun termasuk jadwal pagi buta maupun tengah malam.",
  },
];

export function Trust() {
  return (
    <section id="kepercayaan" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Kepercayaan"
          title="Pilihan Rental Mobil Nyaman di Jakarta"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {TRUST.map((t) => (
            <StaggerItem key={t.title} direction="scale">
              <article className="group glass relative h-full overflow-hidden rounded-xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50">
                <span
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <t.icon className="h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-6 text-2xl">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
